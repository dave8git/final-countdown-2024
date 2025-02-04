import { IsNotEmpty, IsOptional, IsString, IsNumberString, Length, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { Decimal } from 'decimal.js';
import { CartProductDTO } from './cart-product.dto';

export class CreateOrderDTO {
    // @IsNotEmpty()
    // @IsNumberString() // Ensures input is numeric
    // @Transform(({ value }) => new Decimal(value)) // Convert input to Decimal
    // totalPrice: Decimal;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 35)
    customer: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : value))
    address: string;

    // @IsNotEmpty()
    // @IsString()
    // userId?: string;

    products?: CartProductDTO[];

    @IsOptional()
    @Transform(({ value }) => new Date(value))
    date?: Date;

    @IsOptional()
    updatedAt?: Date;
}
