const jwt = require("jsonwebtoken");

let user_id;

const requireSigning = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY,{expiresIn:'500s'});
    if (decoded) {
       user_id = decoded.id;
       next();
   }

  } catch (error) {
    res.status(400).json({ message: "error in auth-middleware" });
    console.log("error in auth-middleware");
  }
};


module.exports = {
    requireSigning
};