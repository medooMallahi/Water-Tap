const mongoose = require("mongoose");
const OrderSchema = require("./Order");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  phone: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  token: {
    type: String,
  },
  socketID: {
    type: String,
    default: "",
  },
  orders: [OrderSchema],
});

module.exports = mongoose.model("User", UserSchema);
