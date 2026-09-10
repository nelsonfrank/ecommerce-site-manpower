import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Headphones', description: 'Product title' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'Active noise cancelling wireless headphones',
    description: 'Detailed product description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 99.99,
    description: 'Price in standard decimal format (>= 0)',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @ApiProperty({ example: 50, description: 'Stock quantity available (>= 0)' })
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'Stock quantity must be greater than or equal to 0' })
  stockQuantity: number;

  @ApiPropertyOptional({
    example: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Product image URL',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
