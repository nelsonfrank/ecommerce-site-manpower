import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Cannot checkout with an empty cart');
      }

      let totalAmount = 0;

      // 1. Re-check stock for every cart item inside transaction
      for (const item of cart.items) {
        const freshProduct = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!freshProduct) {
          throw new NotFoundException(
            `Product with ID "${item.productId}" no longer exists`,
          );
        }

        if (item.quantity > freshProduct.stockQuantity) {
          throw new BadRequestException(
            `Insufficient stock for "${freshProduct.name}". Requested: ${item.quantity}, Available: ${freshProduct.stockQuantity}`,
          );
        }

        const price = Number(freshProduct.price);
        totalAmount += price * item.quantity;
      }

      // 2. Create the Order and OrderItems (snapshotting priceAtPurchase)
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount: new Prisma.Decimal(Number(totalAmount.toFixed(2))),
          status: OrderStatus.PENDING,
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // 3. Decrement Product.stockQuantity for each item
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 4. Clear the cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return order;
    });
  }

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID "${orderId}" not found`);
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }
}
