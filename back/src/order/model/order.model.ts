import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { UserDocument } from 'src/user/model/user.model';
import { OrderItem } from './orderItem.model';

export interface OrderDocument extends Order {
  items: OrderItem[];
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order extends Document {
  @Prop({ type: Number, required: true })
  total: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.virtual('items', {
  localField: '_id',
  foreignField: 'order',
  ref: 'OrderItem',
});
