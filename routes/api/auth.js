const express = require("express");
const { authenticate } = require("../../middleware/authenticate");

const router = express.Router();
const user = require("../../controllers/auth");
const { route } = require("./contacts");

router.post("/register", user.register);

router.post("/login", user.login);

router.post("/logout", authenticate, user.logout);

router.get("/users/curent", authenticate, user.curent);

module.exports = router;
