const express = require("express");
const { body } = require("express-validator");

const {
  postPost,
  getPost,
  getPostByID,
  editPost,
} = require("../controllers/postController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post(
  "",
  isAuth,
  [body("title").notEmpty().escape(), body("body").escape()],
  postPost
);

router.get("", getPost);

router.put(
  "/edit/:postID",
  isAuth,
  [body("title").notEmpty().escape(), body("body").notEmpty().escape()],
  editPost
);

router.get("/:postID", getPostByID);

module.exports = router;
