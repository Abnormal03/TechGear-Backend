const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
  getMyProducts,
} = require("../controllers/productController");

const router = express.Router();

//get all the products...
router.get("/", getProducts);

//add a product...
router.post("/product/add", addProduct);

router.delete("/product/delete", deleteProduct);

//get users products...
router.get("/products/myproducts", getMyProducts);

//delete a specific product...
router.delete("/product/:id", () => {});
module.exports = router;
