const menuModel = require('../models/menuSchema'); 

const getMenu = async (req, res) => {
    try {
        const data = await menuModel.find().populate('category');
        res.send(data);
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting menu details' });
    }
}

const getById = async (req,res) => {
    try {
        const id = req.params.id;
        const data = await menuModel.find({category:id});
        res.send(data);
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting menu by id' });
    }
}

const addMenu = async (req, res) => {
    try {
         const { category, name, price } = req.body;
      
        if (!category || !name || !price) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        const newMenu = new menuModel({ category, name, price });
        await newMenu.save();
        res.status(200).json({ msg: "Menu data inserted successfully" });
    } catch (error) {
        res.status(500).json({ msg: 'Error in adding menu' });
    }
}

const editMenu = async (req, res) => {
    try {
         const id = req.params.id;
         const { name, price } = req.body;
      
        if ( !name || !price) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        const newMenu = await menuModel.findByIdAndUpdate(id,{name, price });
        res.status(200).json({ msg: "Menu data edited successfully" });
    } catch (error) {
        res.status(500).json({ msg: 'Error in editing menu' });
    }
}

const deleteMenu = async (req, res) => {
    try {
         const id = req.params.id;
      
        const newMenu = await menuModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Menu data deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: 'Error in deleting menu' });
    }
}

module.exports = {
    getMenu,
    addMenu,
    editMenu,
    deleteMenu,
    getById
}
