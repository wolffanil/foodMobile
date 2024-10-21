import { IProduct } from "./product.interface";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatarPath: string;
  favorites: IProduct[];
}
