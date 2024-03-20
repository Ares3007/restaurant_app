const express = require('express');
const { getMenu, addMenu, editMenu, deleteMenu, getById } = require('../controller/menu');
const { requireSigning } = require('../middlewares/authMiddleware');

const menu = express.Router();

menu.get('/all-menu',getMenu);
menu.get('/get-by-id/:id',getById); 
menu.post('/add-menu', requireSigning,addMenu);
menu.patch('/edit-menu/:id', requireSigning,editMenu);
menu.delete('/delete-menu/:id', requireSigning,deleteMenu);

module.exports = menu;

