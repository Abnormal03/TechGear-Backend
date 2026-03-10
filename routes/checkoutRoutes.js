const express = require("express");

const {
  addCheckout,
  getCheckouts,
} = require("../controllers/checkoutController");

const router = express.Router();

//  add checkout...
router.post("/addcheckout", addCheckout);

//get my checkouts...
router.get("/mycheckouts", getCheckouts);

module.exports = router;
