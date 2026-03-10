const { Product } = require("../models/productModel");

const addProduct = async (req, res) => {
  const _id = req.user;
  const { name, description, price, category, image } = req.body;

  try {
    const product = await Product.addProduct(
      _id,
      name,
      description,
      price,
      category,
      image,
    );

    res.status(200).json({ product: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a product with specific id...
const deleteProduct = async (req, res) => {
  const { _id } = req.body;
  console.log(_id, req.user);

  try {
    await Product.removeProduct(req.user, _id);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all products...
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) throw Error("no products found");

    res.status(200).json({ products: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a specific users products...
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user });

    res.status(200).json({ products: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addProduct, getProducts, deleteProduct, getMyProducts };
