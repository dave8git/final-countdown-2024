import { Controller, Get, UseGuards, Request, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dtos/cart-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get('/')
    @UseGuards(JwtAuthGuard)
    getCartByUser(@Request() req) {
    const userId = req.user.id;
        return this.cartService.getCartByUser(userId);
    }

    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async createCartItem(
      @Request() req,
      @Body() createCartItemDTO: CreateCartItemDTO,
    ) {
      const userId = req.user.id;
      return this.cartService.createCartItem(userId, createCartItemDTO);
    }

    @Put('/:cartItemId')
    @UseGuards(JwtAuthGuard)
    async updateCartItem(
      @Param('cartItemId') cartItemId: string,
      @Body() updateData: CreateCartItemDTO,
    ) {
      return this.cartService.updateCartItem(cartItemId, updateData);
    }

    @Delete('/:cartItemId')
    @UseGuards(JwtAuthGuard)
    async deleteCartItem(@Param('cartItemId') cartItemId: string) {
      return this.cartService.deleteCartItem(cartItemId);
    }
}