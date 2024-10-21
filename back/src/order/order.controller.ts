import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async getAll() {
    return await this.orderService.getAll();
  }

  @Get('by-user')
  @Auth()
  async getByUserId(@CurrentUser('_id') userId: string) {
    return await this.orderService.getByUserId(userId);
  }

  @Post()
  @HttpCode(200)
  @Auth()
  async placeOrder(@Body() dto: OrderDto, @CurrentUser('_id') userId: string) {
    return await this.orderService.placeOrder(dto, userId);
  }
}
