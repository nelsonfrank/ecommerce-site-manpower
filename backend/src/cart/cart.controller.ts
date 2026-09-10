import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product to current user cart' })
  @ApiResponse({ status: 201, description: 'Product added to cart' })
  @ApiResponse({ status: 400, description: 'Quantity exceeds available stock' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async addToCart(
    @CurrentUser('id') userId: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get current user cart with products and computed totals',
  })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  async getCart(@CurrentUser('id') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ status: 200, description: 'Cart item quantity updated' })
  @ApiResponse({ status: 400, description: 'Quantity exceeds available stock' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async updateCartItem(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(userId, id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from current user cart' })
  @ApiResponse({ status: 200, description: 'Cart item removed' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async removeFromCart(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.cartService.removeFromCart(userId, id);
  }
}
