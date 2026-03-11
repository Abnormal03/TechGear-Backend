const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.addProduct = async function (
  userId,
  name,
  description,
  price,
  category,
  image,
) {
  if (!name || !category || !image || !price)
    throw Error("required fields are not properly filled.");

  if (price <= 0) {
    throw Error("invalid price!");
  }
  if (!description) description = "";
  const product = await this.create({
    userId,
    name,
    description,
    price,
    category,
    image,
  });

  return product;
};

productSchema.statics.removeProduct = async function (userId, _id) {
  if (!_id) throw Error("Id is not passed properly.");

  const product = await this.findOne({ _id });
  if (!product) throw Error("product does not exist in the database.");

  //check if the user is the owner of this product
  if (!product.userId.equals(userId)) {
    throw Error("Not authorized to delete this product!");
  }

  const deleted = await this.findByIdAndDelete(_id);
  return deleted;
};

const Product = mongoose.model("product", productSchema);
module.exports = { Product, productSchema };
