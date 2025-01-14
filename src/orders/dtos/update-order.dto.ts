import { Transform } from "class-transformer";
import { Length, IsString, IsNotEmpty, IsNumber, IsOptional, IsEmail, Min } from "class-validator";

export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    totalPrice: number;

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

    @IsNotEmpty()
    @IsString()
    userId: string;
}