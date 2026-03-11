const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getMyProducts,
} = require("../controllers/productController");

const router = express.Router();

//get all the products...
router.get("/", getProducts);

//add a product...
router.post("/product/add", addProduct);

router.delete("/product/delete/:id", deleteProduct);

//get users products...
router.get("/products/myproducts", getMyProducts);

//update a user product...
router.put("/products/myproducts/:id", updateProduct);

//delete a specific product...
router.delete("/product/:id", () => {});
module.exports = router;
