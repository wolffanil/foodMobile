import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/model/product.model';

export interface CategoryDocument extends Category {
  products?: Product[];
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category extends Document {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  image: string;
}

export const CategorySchame = SchemaFactory.createForClass(Category);

CategorySchame.virtual('products', {
  localField: '_id',
  foreignField: 'category',
  ref: 'Product',
});
