const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    mail : String,
    mobile : Number,
    pass : String
},{timestamps: true})

const userModel = mongoose.model("app_wrk_restaurant", userSchema);

module.exports = userModel;