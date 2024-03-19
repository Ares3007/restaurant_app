const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    qrCodeValue: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app_wrk_restaurants"
    },
  },
  { timestamps: true }
);


const menuModel = mongoose.model("app_wrk_restaurant_menu",menuSchema);

module.exports = menuModel;
