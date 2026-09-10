import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    return cart;
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID "${dto.productId}" not found`,
      );
    }

    const cart = await this.getOrCreateCart(userId);

    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
    });

    const targetQuantity =
      (existingItem ? existingItem.quantity : 0) + dto.quantity;

    if (targetQuantity > product.stockQuantity) {
      throw new BadRequestException(
        `Requested quantity (${targetQuantity}) exceeds available stock (${product.stockQuantity})`,
      );
    }

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: targetQuantity },
        include: { product: true },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      include: { product: true },
    });
  }

  async getCart(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    const cartWithItems = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    const items = (cartWithItems?.items || []).map((item) => {
      const price = Number(item.product.price);
      const subtotal = Number((price * item.quantity).toFixed(2));
      return {
        ...item,
        subtotal,
      };
    });

    const total = items.reduce((acc, curr) => acc + curr.subtotal, 0);
    const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

    return {
      id: cart.id,
      userId: cart.userId,
      items,
      total: Number(total.toFixed(2)),
      totalItems,
    };
  }

  async updateCartItem(
    userId: string,
    cartItemId: string,
    dto: UpdateCartItemDto,
  ) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new NotFoundException('Cart item not found in your cart');
    }

    if (dto.quantity > cartItem.product.stockQuantity) {
      throw new BadRequestException(
        `Requested quantity (${dto.quantity}) exceeds available stock (${cartItem.product.stockQuantity})`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: dto.quantity },
      include: { product: true },
    });
  }

  async removeFromCart(userId: string, cartItemId: string) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== userId) {
      throw new NotFoundException('Cart item not found in your cart');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return {
      message: 'Item removed from cart',
    };
  }
}
