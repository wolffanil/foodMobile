import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { Types } from 'mongoose';
import { ProductDto } from './dto/product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Auth()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }

  @Get('by-slug/:slug')
  @Auth()
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug);
  }

  @Get('by-category/:categorySlug')
  @Auth()
  async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }

  @Post()
  @Auth()
  @HttpCode(201)
  async createProduct() {
    return this.productService.create();
  }

  @Put(':id')
  @Auth()
  @HttpCode(200)
  async updateProduct(
    @Param('id', IdValidationPipe) id: Types.ObjectId,
    @Body() dto: ProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(204)
  async deleteProduct(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.productService.delete(id);
  }
}
