const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//adding
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//get all
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//updating with id
router.put('/products/:productID', async (req, res) => {
  try {
    const updatedProduct = await Product.updateOne(
      { productID: req.params.productID },
      { $set: req.body },
      { new: true } 
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//deleting with id
router.delete('/products/:productID', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ productID: req.params.productID });
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

//featured
router.get('/products/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.status(200).json({ success: true, data: featuredProducts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//price 
router.get('/products/price/:value', async (req, res) => {
  try {
    const products = await Product.find({ price: { $lt: req.params.value } });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//rating
router.get('/products/rating/:value', async (req, res) => {
  try {
    const products = await Product.find({ rating: { $gt: req.params.value } });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
