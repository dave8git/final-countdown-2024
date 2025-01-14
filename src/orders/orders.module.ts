import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartModule } from 'src/cart/cart.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService], 
  imports: [PrismaModule, CartModule]
})
export class OrdersModule {}
