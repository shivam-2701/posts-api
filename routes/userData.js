const express = require("express");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.get("/:userID", getUser)

module.exports = router;