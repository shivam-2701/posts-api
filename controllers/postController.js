const { Post } = require("../models/post");

exports.postPost = async (req, res, next) => {
    const user = req.user;
    const title = req.body.title;
    const body = req.body.body;

    const postDoc = await Post.create({
        title,
        body,
        userID: user._id,
    });
    const post = await postDoc.save();

    user.posts.push(post);
    user.save();

    res.status(201);
    res.json({
        message: "Post created successfully.",
        post
    })
}

exports.getPost = async (req, res, next) => {
    const page = req.query.page || 0;
    const posts = await Post.find().skip(10 * page).limit(10);

    res.status(200);
    res.json(posts);
}

exports.getPostByID = async (req, res, next) => {
    const id = req.params.postID;
    const foundPost = await Post.findById(id).populate("userID");

    if (!foundPost) {
        res.status(404);
        res.json({
            message: "Post not found."
        })
        return;
    }

    res.status(200);
    res.json({
        _id: foundPost._id,
        title: foundPost.title,
        body: foundPost.body,
        user: {
            username: foundPost.userID.username,
            email: foundPost.userID.email,
            _id: foundPost.userID._id,
        }
    });
}

exports.editPost = async (req, res, next) => {
    const user = req.user;
    const postID = req.params.postID;

    const title = req.body.title;
    const body = req.body.body;

    const foundPost = await Post.findById(postID);
    if (!foundPost) {
        res.status(404);
        res.json({
            message: "Post not found."
        });
        return;
    }

    if (foundPost.userID.toString() != user._id.toString()) {
        res.status(403);
        res.json({
            message: "Forbidden. You cannot edit this post."
        });
        return;
    }

    foundPost.title = title;
    foundPost.body = body;
    const result = await foundPost.save();

    res.status(201);
    res.json({
        message: "Post updated successfully.",
        post: result,
    })
}