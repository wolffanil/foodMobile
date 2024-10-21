import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/model/user.model';
import { AuthDto } from './dto/auth.dto';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly User: Model<UserDocument>,
    private readonly jwtServive: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(dto: AuthDto) {
    const existUser = await this.User.findOne({ email: dto.email }).lean();

    if (existUser) throw new BadRequestException('User already exist');

    const user = await this.User.create({
      email: dto.email,
      name: faker.person.firstName(),
      avatarPath: faker.image.avatar(),
      phone: faker.phone.number(),
      password: dto.password,
    });

    const tokens = await this.issueTokens(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtServive.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.getById(result._id);

    const tokens = await this.issueTokens(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: string) {
    const data = { _id: userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServive.signAsync(data, {
        expiresIn: '1h',
      }),
      this.jwtServive.signAsync(data, {
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.User.findOne({
      email: dto.email,
    }).select('+password');

    if (!user) throw new NotFoundException('User not found');

    const isValid = await user.comparePassword(dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
