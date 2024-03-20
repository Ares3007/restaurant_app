const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "app_wrk_restaurants"
    },
  },
  { timestamps: true }
);


const categoryModel = mongoose.model("app_wrk_restaurant_category",categorySchema);

module.exports = categoryModel;
