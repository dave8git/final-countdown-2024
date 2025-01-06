import { Controller, Get, Delete, Param, Body, Post, Put, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-product.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/') 
    getAll(): any {
        return this.ordersService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.ordersService.getById(id);
    }

    @Delete('/:id')
    public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!this.ordersService.getById(id))
            throw new NotFoundException('Product not found');
        this.ordersService.deleteById(id);
        return { success: true };
    }

    @Post('/')
    public create(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.create(orderData);
    }

    @Put('/:id') 
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() orderData: UpdateOrderDTO,
    ) {
        if(!this.ordersService.getById(id))
            throw new Error('Product not found');
        this.ordersService.updateById(id, orderData);
        return { success: true }
    }
}