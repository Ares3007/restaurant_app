const express = require("express");
const user = require("./routes/userRoutes");
const connection = require("./config/db");
const cors = require("cors");
const menu = require("./routes/menuRoutes");
const app = express();

require("dotenv").config();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  try {
    res.send("Welcome!!!");
  } catch (error) {
    res.send("error in backend");
  }
});

app.use("/api/", user);
app.use("/menu/", menu);

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log(`Running on ${PORT} and connected to database`);
  } catch (error) {
    console.log("error in connection");
  }
});
