import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsObjectId({ message: 'category Id is invalid' })
  category: Types.ObjectId;
}
