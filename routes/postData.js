const express = require("express")

const { postPost, getPost, getPostByID, editPost } = require("../controllers/postController");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("", isAuth, postPost);
router.get("", getPost);
router.put("/edit/:postID", isAuth, editPost);
router.get("/:postID", getPostByID);

module.exports = router;