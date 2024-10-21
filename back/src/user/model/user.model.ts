import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends User {
  comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User extends Document {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, default: '/uploads/default-avatar.png' })
  avatarPath: string;

  @Prop({ type: String, default: '' })
  phone: String;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  favorites?: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.virtual('orders', {
  localField: '_id',
  foreignField: 'user',
  ref: 'Order',
});
