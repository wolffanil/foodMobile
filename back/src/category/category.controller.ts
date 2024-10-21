import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CategoryDto } from './dto/category.dto';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Auth()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get('by-id/:id')
  @Auth()
  async getById(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return await this.categoryService.byId(id);
  }

  @Get('by-slug/:slug')
  @Auth()
  async getBySlug(@Param('slug') slug: string) {
    return await this.categoryService.bySlug(slug);
  }

  @Post()
  @Auth()
  @HttpCode(201)
  async create() {
    return await this.categoryService.create();
  }

  @Put(':id')
  @Auth()
  @HttpCode(200)
  async update(
    @Param('id', IdValidationPipe) id: Types.ObjectId,
    @Body() dto: CategoryDto,
  ) {
    return await this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @Auth()
  @HttpCode(204)
  async delete(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return await this.categoryService.delete(id);
  }
}
