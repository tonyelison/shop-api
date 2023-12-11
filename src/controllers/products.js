import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import { Status } from '../util/http.js';

const getAll = asyncHandler(async (req, res) => {
  const products = await Product.find().exec();
  return res.json({ products });
});

const getById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).exec();

  return product
    ? res.json({ 'product-id': product._id })
    : res.sendStatus(Status.NOT_FOUND);
});

const create = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Test',
    sku: 123,
    category_id: 456,
    description: 'Product Description goes here',
    keywords: ['product', 'test'],
  });
  await product.save();
  return res.sendStatus(Status.CREATED);
});

export default {
  getAll,
  getById,
  create,
};
