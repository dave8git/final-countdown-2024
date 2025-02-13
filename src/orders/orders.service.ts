import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CartService } from 'src/cart/cart.service';
import {  Order, } from '@prisma/client';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private prismaService: PrismaService,
        // private cartService: CartService,
        ) {}

    // async getAllByUserId(userId: string): Promise<Order[]> {
    //     return this.prismaService.order.findMany({
    //       where: {
    //         userId: userId,
    //       },
    //       include: {
    //         orderItems: true,
    //       },
    //     });
    // }

    async getById(id: string): Promise<Order | null> {
        return this.prismaService.order.findUnique({
          where: { id },
          include: {
            orderItems: true
          }
        });
    }

    async createOrderFromCart(createOrderDto: CreateOrderDTO) {
      //const { customer, email, address, products, comment, date } = createOrderDto;
      const { customer, email, address, products } = createOrderDto;
  
      if (!products || products.length === 0) {
          throw new NotFoundException('Order must contain at least one product');
      }
  
      // Calculate total price
      const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  
      // Create the order in the database
      const order = await this.prismaService.order.create({
          data: {
              customer,
              email,
              address,
              totalPrice,
              // comment,
              orderItems: {
                  create: products.map(product => ({
                      productId: product.id,
                      quantity: product.quantity,
                      price: product.price,
                      comment: product.comment,
                  })),
              },
              createdAt: new Date(),
              updatedAt: new Date(),
          },
          include: {
              orderItems: true,
          },
      });
  
      return order;
  }
}