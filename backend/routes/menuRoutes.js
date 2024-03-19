const express = require('express');
const { getMenu, addMenu } = require('../controller/menu');
const { requireSigning } = require('../middlewares/authMiddleware');

const menu = express.Router();

menu.get('/all-menu', getMenu);
menu.post('/add-menu', requireSigning , addMenu);

module.exports = menu;

