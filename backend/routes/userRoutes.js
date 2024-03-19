const express = require('express');
const { addUser, logUser } = require('../controller/user');

const user = express.Router();

user.post('/login',logUser);
user.post('/signup',addUser);

module.exports = user;

