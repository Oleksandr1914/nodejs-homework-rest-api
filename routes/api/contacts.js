const express = require("express");

const router = express.Router();
const contacts = require("../../controllers/contacts");

router.get("/", contacts.get);

router.get("/:id", contacts.getById);

router.post("/", contacts.post);

router.put("/:id", contacts.updateById);

router.patch("/:id/favorite", contacts.updateFavorite);

router.delete("/:id", contacts.removeById);

module.exports = router;
