import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './model/category.model';
import { Model, Types } from 'mongoose';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './dto/category.dto';
import { generateSlug } from 'src/utils/generate-slug';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly Category: Model<Category>,
  ) {}

  async getAll() {
    return await this.Category.find().select(returnCategoryObject).lean();
  }

  async byId(id: Types.ObjectId) {
    const category = await this.Category.findById(id)
      .select(returnCategoryObject)
      .lean();

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async bySlug(slug: string) {
    const category = await this.Category.findOne({ slug })
      .select(returnCategoryObject)
      .lean();

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async create() {
    return await this.Category.create({
      name: '',
      slug: '',
      image: '',
    });
  }

  async update(id: Types.ObjectId, dto: CategoryDto) {
    return await this.Category.findByIdAndUpdate(
      id,
      {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image,
      },
      { new: true },
    );
  }

  async delete(id: Types.ObjectId) {
    return await this.Category.findByIdAndDelete(id);
  }
}
