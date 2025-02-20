import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors';
import configuration from './config/configuration';
// import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
   imports: [ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', '..', 'client', 'build'),
  }), 
  ProductsModule, OrdersModule,  ConfigModule.forRoot({ load: [configuration], isGlobal: true })], //imports: [ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}