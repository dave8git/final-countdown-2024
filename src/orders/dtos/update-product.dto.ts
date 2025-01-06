import { Transform } from "class-transformer";
import { Length, IsString, IsNotEmpty } from "class-validator";

export class UpdateOrderDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 35)
    client: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    address: string;
}