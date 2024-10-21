import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import mongoose, { Model } from 'mongoose';
import { returnUserObject } from './return-user.object';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>,
  ) {}

  async getById(id: string, selectString: string = '') {
    const user = await this.User.findById(id)
      .populate({
        path: 'favorites',
        populate: {
          path: 'category',
          select: 'name',
        },
      })
      .select(returnUserObject + selectString);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async toggleFavorites(
    user: UserDocument,
    productId: mongoose.Schema.Types.ObjectId,
  ) {
    const { _id, favorites } = user;

    await this.User.findByIdAndUpdate(_id, {
      favorites: favorites.includes(productId)
        ? favorites.filter((id) => String(id) !== String(productId))
        : [...favorites, productId],
    });

    return { message: 'success' };
  }
}
