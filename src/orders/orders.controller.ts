import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Checkout current cart into a placed order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 400, description: 'Empty cart or insufficient stock' })
  async checkout(@CurrentUser('id') userId: string) {
    return this.ordersService.checkout(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders placed by the current user' })
  @ApiResponse({ status: 200, description: 'List of user orders' })
  async findAll(@CurrentUser('id') userId: string) {
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({ status: 200, description: 'Order details retrieved' })
  @ApiResponse({ status: 403, description: 'Forbidden from accessing order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.ordersService.findOne(userId, id);
  }
}
