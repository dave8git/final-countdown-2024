import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) {}
    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
    }

    public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
            where: { id },
        })
    }

    public getManyByIds(ids: Product['id'][]): Promise<Product[]> {
        return this.prismaService.product.findMany({
            where: { 
                id: { in: ids } 
            },
        });
    }

    public deleteById(id: Product['id']): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id }
        })
    } 

    public create(productData: Omit<Product, 'id' | 'createdAt' | 'updateAt'>): Promise<Product> {
        return this.prismaService.product.create({
            data: productData
        });
    }

    public updateById(id: Product['id'], productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
        return this.prismaService.product.update({
            where: { id },
            data: productData,
        })
    }
}
