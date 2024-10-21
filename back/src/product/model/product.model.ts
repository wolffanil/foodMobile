import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  image: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
