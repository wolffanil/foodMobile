import { ICategory } from "./category";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  category: ICategory;
}
