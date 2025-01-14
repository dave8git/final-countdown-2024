import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDTO } from './dtos/cart-product.dto';

@Injectable()
export class CartService {
    constructor(private prismaService: PrismaService) {}

    public async getCartByUser(userId: string) {
        return this.prismaService.cart.findUnique({
          where: { userId },
          include: { cartItems: true }
        });
      }
    
      public async createCartItem(userId: string, createCartItemDTO: CreateCartItemDTO) {
        const userCart = await this.prismaService.cart.findUnique({
          where: { userId }
        });
    
        if (!userCart) {
          throw new Error("No user cart");
        }
    
        return this.prismaService.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: createCartItemDTO.productId,
            quantity: createCartItemDTO.quantity,
          }
        });
      }
    
      public async deleteCartItem(cartItemId: string) {
        return this.prismaService.cartItem.delete({
          where: { id: cartItemId },
        });
      }
    
      public async updateCartItem(cartItemId: string, updateData: CreateCartItemDTO) {
        return this.prismaService.cartItem.update({
          where: {
            id: cartItemId
          },
          data: updateData
        });
      }

      public async clearCart(userId: string) {
        await this.prismaService.cartItem.deleteMany({
          where: { cart: { userId } },
        });
    }
}