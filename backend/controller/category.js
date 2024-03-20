const categoryModel = require("../models/categorySchema");

const getAllCategory = async (req, res) => {
  try {
    const data = await categoryModel.find();
    data ? res.status(200).json(data) : res.status(404).json("Data not found");
  } catch (error) {
    res.status(500).json({ msg: "Error in getting category" });
  }
};

const addCategory = async (req, res) => {
  try {
    const {name,description,user} = req.body;
    if(!name || !description || !user){
        res.status(400).json({msg:"All fields are necessary"});
    }else{
        const newCategory = new categoryModel({name,description,user});
        await newCategory.save();
        res.status(200).json({msg:"New category added."}); 
    }
  } catch (error) {
    res.status(500).json({ msg: "Error in adding category" });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const {name,description} = req.body;
    const findById = await categoryModel.findById(id);
    if(findById){
      await categoryModel.findByIdAndUpdate(id,{name,description});
      res.status(200).json({msg:"Category updated"});
    }else{
      res.status(404).json({msg:'Id not found'});  
    }
  } catch (error) {
    res.status(500).json({ msg: "Error in editing category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const findById = await categoryModel.findById(id);
    if(findById){
      await categoryModel.findByIdAndDelete(id);
      res.status(200).json({msg:"Category deleted"});
    }else{
      res.status(404).json({msg:'Id not found'});  
    }
  } catch (error) {
    res.status(500).json({ msg: "Error in deleting category" });
  }
};

module.exports = {
  getAllCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
