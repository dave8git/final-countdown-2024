import { Transform } from "class-transformer";
import { Length, IsInt, IsString, IsNotEmpty, Min } from "class-validator";

export class CartProductDTO {
    id: string;

    quantity: number;

    price: number;

    comment?: string;
}