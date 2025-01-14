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
    
    cpu: string;

    ram: number;

    storage: number;

    screen: number; 

    image: string; 
    
    @IsString()
    @IsNotEmpty()
    description: string;
  };