var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var userModel = require("../models/user");
const { default: mongoose } = require("mongoose");

const detoken = require("../middlewares/detoken");

//create
router.post("/register", async (req, res) => {
  try {
    let { email, firstname, lastname, phonenumber ,password } = req.body;
    if (!email || !firstname || !lastname || !phonenumber || !password) {
      return res.status(400).send("error");
    }
    let hash_password = await bcrypt.hash(password, 10);
    let newUser = new userModel({
      email,
      firstname,
      lastname,
      phonenumber,
      password: hash_password,
      role: "users",
    });
    let user = await newUser.save();
    return res.status(201).send({
      data: user,
      message: "register Success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//create

//addNewLocation
router.put("/location/:id", async (req, res) => {
  try { 
    let id = req.params.id;
    let { address, province, amphure, tambon } = req.body;
    await userModel.updateOne(
      { _id: id },
      {
        $set: {
          address,
          province,
          amphure,
          tambon,
        }
      }
    );
    let user = await userModel.findById(id);
    return res.status(201).send({
      data: user,
      message: "success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//addNewLocation

//login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    let passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      return res.status(401).send("Invalid email or password");
    }
    let token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.TOKEN_KEY
    );
    console.log(token);
    console.log(user.role);
    return res.status(200).send({
      token,
      id: user._id,
      role: user.role,
      message: "Login Success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//login

//getAll
router.get("/", detoken, async (req, res) => {
  try {
    let user = await userModel.find();
    return res.send({
      data: user,
      message: "get success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//getAll

//getByID
router.get("/:id", detoken, async (req, res) => {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    return res.send({
      data: user,
      message: "get success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//getByID

//delete
router.delete("/:id",  async (req, res) => {
  try {
    let id = req.params.id;
    await userModel.deleteOne({ _id: id });
    return res.send({ message: "delete success" });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//delete

//setRole
router.put("/setrole/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { role } = req.body;
    await userModel.updateOne(
      { _id: id },
      {
        $set: {
          role,
        },
      }
    );
    let user = await userModel.findById(id);
    return res.status(201).send({
      data: user,
      message: "update success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//setRole

//update
router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { email, firstname, lastname } = req.body
    await userModel.updateOne(
      { _id:id },
      {
        $set: {
          email,
          firstname,
          lastname,
        },
      }
    );
    let user = await userModel.findById(id);
    return res.status(201).send({
      data: user,
      message: "update success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//update

module.exports = router;