const userModel = require("../models/userSchema");
const { hashPass, comparePass } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  try {
    const { name, mobile, mail, pass } = req.body;

    if (!name || !mobile || !mail || !pass) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashPassword = await hashPass(pass);
    const newUser = new userModel({ name, mobile, mail, pass: hashPassword });
    await newUser.save();
    res.status(200).json({ msg: "User data inserted successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding user:", error);

    // Send error response
    res.status(500).json({ error: "Error in adding user details" });
  }
};

const logUser = async (req, res) => {
  try {
    const { mail, pass } = req.body;
   // console.log(req.body)
    if (!mail || !pass) {
      res.status(200).json({ message: "email,password required" });
    } else {
      const user = await userModel.findOne({ mail });
      const compare = await comparePass(pass, user.pass);
      //console.log(user)
      if (compare) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: user._id }, jwtSecretKey);
        res.status(200).json({ message: "login success", token, user });
      } else {
        res.status(400).json({ message: "login failed" });
      }
   }
  } catch (error) {
    res.status(200).json({ msg: "error in logging" });
  }
};

module.exports = {
  addUser,
  logUser,
};
