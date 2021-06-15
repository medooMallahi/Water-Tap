const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    driverName: String,
    clientName: String,
  },
  { timestamps: true }
);
