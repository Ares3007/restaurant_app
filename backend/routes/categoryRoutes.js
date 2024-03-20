const express = require("express");

const {
  getAllCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controller/category");

const { requireSigning } = require("../middlewares/authMiddleware");

const category = express.Router();

category.get("/all-category", getAllCategory);
category.post("/add-category", requireSigning, addCategory);
category.patch("/edit-category/:id", requireSigning, editCategory);
category.delete("/delete-category/:id", requireSigning, deleteCategory);

module.exports = category;
