var express = require("express");
var router = express.Router();
const path = require("path");
var productModel = require("../models/product");
const { default: mongoose } = require("mongoose");

const multer = require("multer");
const detoken = require("../middlewares/detoken");

//create
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/add",detoken,upload.fields([{ name: "mainimg", maxCount: 1 },{ name: "files", maxCount: 5 },]),async (req, res) => {
    try {
      let { productname, price, amount, category, color, size, brand, ships, description } = req.body;
      let files = req.files.files;

      if (!files || files.length === 0) {
        return res.status(400).send({ message: "No files were uploaded." });
      }

      let mainimgPath = req.files["mainimg"]
        ? req.files["mainimg"][0].path.replace(/\\/g, "/")
        : null;

      let imgPaths = req.files["files"]
        ? req.files["files"].map((file) => file.path.replace(/\\/g, "/"))
        : [];

      if (typeof color === "string"){
        color = color.split(',');
      }

      if (typeof size === "string"){
        size = size.split(',');
      }

      let newProduct = new productModel({
        mainimg: mainimgPath,
        img: imgPaths,
        productname,
        price,
        amount,
        category,
        color,
        size,
        brand,
        ships,
        description,
        userid: req.userId,
      });

      let product = await newProduct.save();

      return res.send({
        data: product,
        message: "Upload success",
      });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  }
);
//create

//getAll
router.get("/", async (req, res) => {
  try {
    let product = await productModel.find();
    return res.send({
      data: product,
      message: "get success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//getAll

//getByID
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await productModel.findById(id);
    return res.send({
      data: product,
      message: "get success",
    });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//getByID

//delete
router.delete("/:id", detoken, async (req, res) => {
  try {
    let id = req.params.id;
    await productModel.deleteOne({ _id: id });
    return res.send({ message: "delete success" });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//delete

//deleteIMG
const fs = require("fs");

router.delete("/:id/:imgPaths", detoken, async (req, res) => {
  try {
    let id = req.params.id;
    let imgPaths = req.params.imgPaths.split(",");

    imgPaths.forEach((imgPath) => {
      let fullPath = path.join(__dirname, "../", imgPath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imgPath}`, err);
        }
      });
    });

    await productModel.deleteOne({ _id: id });
    
    return res.send({ message: "Delete success" });
  } catch (err) {
    return res.status(err.status || 500).send(err.message);
  }
});
//deleteIMG

//updateIMG
router.put("/:id",upload.fields([{ name: "mainimg", maxCount: 1 },{ name: "files", maxCount: 5 },]),async (req, res) => {
    try {
      let id = req.params.id;
      let mainimgPath = req.files["mainimg"]? req.files["mainimg"][0].path.replace(/\\/g, "/"): null;
      let imgPaths = req.files["files"]? req.files["files"].map((file) => file.path.replace(/\\/g, "/")): [];

      await productModel.updateOne(
        { _id: id },
        {
          $set: {
            mainimg: mainimgPath,
            img: imgPaths,
          },
        }
      );

      return res.send({ message: "Update success" });
    } catch (err) {
      return res.status(err.status || 500).send(err.message);
    }
  }
);
//updateIMG

module.exports = router;