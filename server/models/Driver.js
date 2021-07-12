const mongoose = require("mongoose");
const OrderSchema = require("./Order");

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
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
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  rate: {
    type: [Number],
    default: [0, 0, 0, 0, 0],
  },
  socketID: {
    type: String,
    default: "",
  },
  orders: [OrderSchema],
});

DriverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", DriverSchema);
