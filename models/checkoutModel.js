const mongoose = require("mongoose");

const checkoutSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    quantity: {
      type: [Number],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

checkoutSchema.statics.addCheckout = async function (
  userId,
  date,
  items,
  prices,
  quantity,
  total,
) {
  if (!userId || !date || !items || !prices || !quantity || !total) {
    throw Error("all fields are not provided!");
  }
  const checkout = await this.create({
    userId,
    date,
    items,
    prices,
    quantity,
    total,
  });

  return checkout;
};

checkoutSchema.statics.getCheckouts = async function (userId) {
  if (!userId) throw Error("Id not provided!");
  const checkouts = await this.find({
    userId: new mongoose.Types.ObjectId(userId),
  });

  return checkouts;
};

const Checkout = mongoose.model("checkout", checkoutSchema);

module.exports = Checkout;
