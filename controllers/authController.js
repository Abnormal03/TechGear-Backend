const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_TOKEN, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email: email, token: token });
  } catch (error) {
    return res.status(400).json({ data: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signupUser(email, password);

    const token = createToken(user._id);
    return res.status(201).json({ email: email, token: token });
  } catch (error) {
    return res.status(400).json({ success: false, data: error.message });
  }
};

module.exports = { loginUser, signupUser };
