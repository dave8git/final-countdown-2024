import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [PrismaModule],
  exports: [CartService]
})
export class CartModule {}