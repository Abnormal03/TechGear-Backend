require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRouter = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const checkouts = require("./routes/checkoutRoutes");
const authenticate = require("./middlewares/authentication");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for login and signup post request...
app.use("/api/user", authRouter);
//no need for authentication to see products...
app.use("/api/products", productRoutes);

//authentication middleware
app.use(authenticate);

//route for product...
app.use("/api", productRoutes);

//routes for checkout routes...
app.use("/api/checkout", checkouts);

//listening at a port
const port = process.env.PORT || 3000;
//connnecting to a database...
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("connected to mongo successfully!");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });

app.listen(port, () => {
  console.log("server is running at port:", port);
});
