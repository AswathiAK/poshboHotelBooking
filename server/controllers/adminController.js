require('dotenv').config();
const jwt = require("jsonwebtoken");

const adminEmail = process.env.ADMINEMAIL;
const adminPassword = process.env.ADMINPASSWORD;

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      if (email === adminEmail && password === adminPassword) {
        const adminToken = jwt.sign({ userName: adminEmail }, "adminPanel", { expiresIn: "2d" });
        res.status(200).json({ message: "Login Successfully", adminToken });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ message: "All Fields are Required" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  adminLogin
};
