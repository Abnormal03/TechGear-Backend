const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamp: true,
  },
);

userSchema.statics.signupUser = async function (email, password) {
  if (!email || !password) throw Error("all fields must be filled");

  //chech if they are all valid...
  if (!validator.isEmail(email)) throw Error("invalid email");
  if (!validator.isStrongPassword(password)) throw Error("not strong password");

  //check if the email exists
  const exists = await this.findOne({ email: email });

  if (exists) throw Error("email already in use");

  //hash the passwod using bcrypt

  const salt = await bcrypt.genSalt(10);

  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    email: email,
    password: hashPass,
  });

  return user;
};

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) throw Error("both fields must be filled");

  //check if the email is valid...
  if (!validator.isEmail(email)) throw Error("invalid email");

  //check if the user exist in our databse...
  const user = await this.findOne({
    email: email,
  });
  if (!user) throw Error("invalid Email");

  //check the password if the user exist with that email...
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("invalid password"); //error if oassword don't match

  //retrun the user if match...
  return user;
};

module.exports = mongoose.model("User", userSchema);
