const { Product } = require("../models/productModel");
const jwt = require("jsonwebtoken");

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
  const { id } = req.params;

  try {
    await Product.removeProduct(req.user, id);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update a product with id...
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(400).json({ error: "error while updating a product." });
    }
    return res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all products...
const getProducts = async (req, res) => {
  const authorization = req.headers.authorization;
  let userId = null;
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        userId = decoded._id || null;
      }
    } catch (err) {
      console.error("JWT Verification failed:", err.message);
    }
  }
  try {
    const products = await Product.find({});
    if (!products) throw Error("no products found");

    if (userId) {
      const filteredProducts = products.filter((p) => {
        return p.userId.toString() !== userId.toString();
      });
      return res.status(200).json({ products: filteredProducts });
    }
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

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  getMyProducts,
  updateProduct,
};
