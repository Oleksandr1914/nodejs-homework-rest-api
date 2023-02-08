const express = require("express");

const router = express.Router();
const contacts = require("../../controllers/contacts");
const { authenticate } = require("../../middleware/authenticate");

router.get("/", authenticate, contacts.get);

router.get("/:id", authenticate, contacts.getById);

router.post("/", authenticate, contacts.post);

router.put("/:id", authenticate, contacts.updateById);

router.patch("/:id/favorite", authenticate, contacts.updateFavorite);

router.delete("/:id", authenticate, contacts.removeById);

module.exports = router;
