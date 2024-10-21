import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './model/order.model';
import { Model } from 'mongoose';
import { OrderItem } from './model/orderItem.model';
import Stripe from 'stripe';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Order.name) private readonly Order: Model<OrderDocument>,
    @InjectModel(OrderItem.name) private readonly OrderItem: Model<OrderItem>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async getAll() {
    return await this.Order.find()
      .populate({ path: 'items', populate: { path: 'product' } })
      .sort({ createdAt: 'desc' });
  }

  async getByUserId(userId: string) {
    return await this.Order.find({
      user: userId,
    })
      .populate({ path: 'items', populate: { path: 'product' } })
      .sort({
        createdAt: 'desc',
      });
  }

  async placeOrder(dto: OrderDto, userId: string) {
    const total = dto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    if (total < 0.5) throw new Error('Amount must be at least $0.50 usd');

    const order = await this.Order.create({
      total,
      user: userId,
    });

    const items = dto.items.map((item) => ({
      product: item.productId,
      order: order._id,
      price: item.price,
      quantity: item.quantity,
    }));

    const ordersItems = await this.OrderItem.insertMany(items);

    const totalInCents = Math.round(total * 100);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: totalInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Order by userId ${order.user}`,
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}
