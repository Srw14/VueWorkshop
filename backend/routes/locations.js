var express = require("express");
var router = express.Router();
const path = require("path");
var provinceModel = require("../models/province");
var geographyModel = require("../models/geography");
var amphureModel = require("../models/amphure");
var tambonModel = require("../models/tambon");

//getProvince
router.get("/province/", async (req, res) => {
    try {
        let province = await provinceModel.find();
        return res.send({
            data: province,
            message: "get success",
        })
    } catch (err) {
        return res.status(err.status || 500).send(err.message);
    }
});
//getProvince

//getGeography
router.get("/geography/", async (req, res) => {
    try {
        let geography = await geographyModel.find();
        return res.send({
            data: geography,
            message: "get success",
        })
    } catch (err) {
        return res.status(err.status || 500).send(err.message);
    }
});
//getGeography

//getAmphure
router.get("/amphure/", async (req, res) => {
    try {
        let amphure = await amphureModel.find();
        return res.send({
            data: amphure,
            message: "get success",
        })
    } catch (err) {
        return res.status(err.status || 500).send(err.message);
    }
});
//getAmphure

//getTambon
router.get("/tambon/", async (req, res) => {
    try {
        let tambon = await tambonModel.find();
        return res.send({
            data: tambon,
            message: "get success",
        })
    } catch (err) {
        return res.status(err.status || 500).send(err.message);
    }
});
//getTambon

module.exports = router;