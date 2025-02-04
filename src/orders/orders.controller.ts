import { Controller, Get, UseGuards, Req, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // @Get('/')
    // @UseGuards(JwtAuthGuard)
    // getAllByUserId(@Req() req) {
    // const userId = req.user.id;
    // return this.ordersService.getAllByUserId(userId);
    // }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getById(@Param('id') id: string) {
      return this.ordersService.getById(id);
    }

    @Post('/')
    // @UseGuards(JwtAuthGuard)
    async createOrder(@Req() req, @Body() createOrderDto: CreateOrderDTO) {
      //const userId = req.user.id;
      return this.ordersService.createOrderFromCart(createOrderDto); //return this.ordersService.createOrderFromCart(userId);
    }
}