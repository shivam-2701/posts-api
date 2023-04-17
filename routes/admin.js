const { Router } = require("express");
const { body } = require("express-validator");

const { signup, login } = require("../controllers/adminController");

const router = Router();

router.post(
  "/signup",
  [
    body("email").isEmail().escape().normalizeEmail().notEmpty(),
    body("password").notEmpty().escape().isLength({
      min: 6,
    }),
    body("username").notEmpty().escape(),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().escape().normalizeEmail().notEmpty(),
    body("password").notEmpty().escape().isLength({
      min: 6,
    }),
  ],
  login
);

module.exports = router;
