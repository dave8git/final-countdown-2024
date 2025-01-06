import { Controller, Get, Param, Body, Post, Delete, Put, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
        this.productsService = productsService;
    }

    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
    }

    @Get('/:id')
    public getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = this.productsService.getById(id);
        if (!prod) throw new NotFoundException('Product not found');
    }

    @Delete('/:id')
    public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found');
        this.productsService.deleteById(id);
        return { success: true };
    }

    @Post('/')
    public create(@Body() productData: CreateProductDTO) { 
        return this.productsService.create(productData); 
    }
    
    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() productData: UpdateProductDTO, 
    ) {
       if (!this.productsService.getById(id))
        throw new Error('Product not found');
       this.productsService.updateById(id, productData); 
       return { success: true };
    }
}