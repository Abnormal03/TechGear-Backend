const Checkout = require("../models/checkoutModel");

const addCheckout = async (req, res) => {
  const { date, items, prices, quantity, total } = req.body;
  try {
    const checkout = await Checkout.addCheckout(
      req.user,
      date,
      items,
      prices,
      quantity,
      total,
    );

    if (!checkout) {
      return res.status(400).json({ error: "unable to register checkout." });
    }
    return res.status(200).json({ checkout: checkout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.getCheckouts(req.user);

    if (!checkouts) {
      return res.status(400).json({ error: "unable to get checkouts." });
    }
    return res.status(200).json({ checkouts: checkouts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addCheckout, getCheckouts };
