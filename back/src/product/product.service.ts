import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './model/product.model';
import { generateSlug } from 'src/utils/generate-slug';
import { ProductDto } from './dto/product.dto';
import { returnCategoryObject } from 'src/category/return-category.object';
import { Category, CategoryDocument } from 'src/category/model/category.model';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly Product: Model<Product>,
    @InjectModel(Category.name)
    private readonly Category: Model<CategoryDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) {
      return this.search(searchTerm);
    }
    return await this.Product.find()
      .sort({ createdAt: 'desc' })
      .populate('category', returnCategoryObject)
      .lean();
  }

  async bySlug(slug: string) {
    const product = await this.Product.findOne({ slug })
      .populate('category', returnCategoryObject)
      .lean();

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async byCategory(categorySlug: string) {
    // const products = await this.Product.aggregate([
    //   {
    //     $lookup: {
    //       from: 'categories',
    //       localField: 'category',
    //       foreignField: '_id',
    //       as: 'categoryInfo',
    //     },
    //   },
    //   {
    //     $unwind: '$categoryInfo',
    //   },
    //   {
    //     $match: {
    //       'categoryInfo.slug': categorySlug,
    //     },
    //   },
    // ]);

    const category = await this.Category.findOne({ slug: categorySlug })
      .populate('products')
      .lean();

    if (!category?.products) throw new NotFoundException('Products not found!');

    return category.products;
  }

  async search(searchTerm: string) {
    return await this.Product.find({
      $or: [
        {
          name: new RegExp(searchTerm, 'i'),
        },
        {
          description: new RegExp(searchTerm, 'i'),
        },
      ],
    })
      .populate('category', returnCategoryObject)
      .lean();
  }

  async create() {
    const product = await this.Product.create({
      name: '',
      slug: '',
      image: '',
      description: '',
      price: 0,
    });

    return product._id;
  }

  async update(id: Types.ObjectId, dto: ProductDto) {
    await this.categoryService.byId(dto.category);

    return await this.Product.findByIdAndUpdate(
      id,
      {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image,
        price: dto.price,
        description: dto.description,
        category: dto.category,
      },
      { new: true },
    );
  }

  async delete(id: Types.ObjectId) {
    return await this.Product.findByIdAndDelete(id);
  }
}
