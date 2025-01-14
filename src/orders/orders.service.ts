import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartService } from 'src/cart/cart.service';
import {  Order, } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(
        private prismaService: PrismaService,
        private cartService: CartService,
        ) {}

    async getAllByUserId(userId: string): Promise<Order[]> {
        return this.prismaService.order.findMany({
          where: {
            userId: userId,
          },
          include: {
            orderItems: true,
          },
        });
    }

    async getById(id: string): Promise<Order | null> {
        return this.prismaService.order.findUnique({
          where: { id },
          include: {
            orderItems: true
          }
        });
    }

    async createOrderFromCart(userId: string) {
       
        const userCart = await this.cartService.getCartByUser(userId);
    
        
        if (!userCart) {
          throw new Error('User cart not found');
        }
    
        
        const newOrder = await this.prismaService.order.create({
          data: {
            userId: userId,
            orderItems: {
              createMany: {
                data: await Promise.all(
                  userCart.cartItems.map(async (cartItem) => {
                    
                    const product = await this.prismaService.product.findUnique({
                      where: { id: cartItem.productId },
                    });
    
                    if (!product) {
                      throw new Error(`Product with ID ${cartItem.productId} not found`);
                    }
    
                    return {
                      quantity: cartItem.quantity,
                      price: product.price,
                      productId: cartItem.productId,
                    };
                  })
                ),
              },
            },
          } as any,
        });
    
        
        await this.cartService.clearCart(userId);
    
        return newOrder;
    }
}