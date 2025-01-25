import { Transform } from "class-transformer";
import { Length, IsInt, IsString, IsNotEmpty, Min } from "class-validator";

export class CreateProductDTO  {
    @IsNotEmpty()
    @IsString()
    @Length(10, 20)
    name: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price: number;
    
    @IsString()
    @IsNotEmpty()
    cpu: string;

    @IsInt()
    ram: number;

    @IsInt()
    storage: number;

    @IsInt()
    screen: number; 

    @IsString()  // Single string for images, not an array
    images: string;  // Changed back to a single string
    
    @IsString()
    @IsNotEmpty()
    description: string;
}
