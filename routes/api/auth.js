const express = require("express");
const { authenticate } = require("../../middleware/authenticate");
const upload = require("../../middleware/upload");

const router = express.Router();
const user = require("../../controllers/auth");

router.post("/register", user.register);

router.post("/login", user.login);

router.post("/logout", authenticate, user.logout);

router.get("/users/curent", authenticate, user.curent);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  user.updateAvatar
);

module.exports = router;
