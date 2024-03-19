const menuModel = require('../models/menuSchema'); 

const getMenu = async (req, res) => {
    try {
        const data = await menuModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting menu' });
    }
}

const addMenu = async (req, res) => {
    try {
         const { category, name, price, qrCodeValue } = req.body;
      
        if (!category || !name || !price || !qrCodeValue) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }
        const newMenu = new menuModel({ category, name, price, qrCodeValue });
        await newMenu.save();
        res.status(200).json({ msg: "Menu data inserted successfully" });
    } catch (error) {
        res.status(500).json({ msg: 'Error in adding menu' });
    }
}

module.exports = {
    getMenu,
    addMenu
}
