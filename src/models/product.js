import { mongoose, Schema } from 'mongoose';

const Product = mongoose.model(
  'Product',
  new Schema({
    name: { type: String, required: true },
    sku: { type: Number, required: true },
    category_id: { type: Number, required: true },
    description: { type: String },
    keywords: { type: Array },
    image: { type: URL },
  }),
);

export default Product;