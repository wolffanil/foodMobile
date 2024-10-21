import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDocument } from './model/user.model';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import mongoose from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('_id') id: string) {
    return await this.userService.getById(id);
  }

  @Patch('profile/favorites/:productId')
  @HttpCode(200)
  @Auth()
  async toggleFavorites(
    @CurrentUser() user: UserDocument,
    @Param('productId', IdValidationPipe)
    productId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.userService.toggleFavorites(user, productId);
  }
}
