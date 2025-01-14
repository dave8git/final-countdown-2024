import { Controller, Get, UseGuards, Req, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('/')
    @UseGuards(JwtAuthGuard)
    getAllByUserId(@Req() req) {
    const userId = req.user.id;
    return this.ordersService.getAllByUserId(userId);
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id: string) {
      return this.ordersService.getById(id);
    }

    @Post('/')
    @UseGuards(JwtAuthGuard)
    async createOrder(@Req() req) {
      const userId = req.user.id;
      return this.ordersService.createOrderFromCart(userId);
    }
}