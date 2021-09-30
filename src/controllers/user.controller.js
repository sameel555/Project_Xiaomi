const express = require("express")

const router = express.Router();

const User = require("../models/user.model");
router.get("/create", (req, res) => {
    return res.render("users/addUsers")
})

router.post("", async (req, res) => {
    const user = await User.create(req.body);

    return res.send(user);
});

router.get("", async (req, res) => {
    const users = await User.find().lean().exec();
    const pageTitle = "Welcome to Users Page"
    return res.render("users/allUsers", {users,pageTitle});
})

module.exports = router;