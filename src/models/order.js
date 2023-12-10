import { mongoose, Schema } from 'mongoose';

const Order = mongoose.model(
  'Order',
  new Schema({
    confirmation_number: { type: String, required: true },
    customer_id: { type: Number, required: true },
    items: { type: Array, required: true },
    status: { type: Number, required: true },
    create_date: { type: Date, required: true },
  }),
);

export default Order;
