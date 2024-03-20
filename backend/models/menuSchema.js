const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app_wrk_restaurants_category"
    },
  },
  { timestamps: true }
);


const menuModel = mongoose.model("app_wrk_restaurant_menu",menuSchema);

module.exports = menuModel;
