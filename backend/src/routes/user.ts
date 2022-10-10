import express from "express";
let mongoose = require("mongoose");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.region) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const user = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        region: req.body.region,
        matches: [],
        albums: []
    };
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
})

module.exports = router
