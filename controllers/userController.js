const { User } = require("../models/user");

exports.getUser = async (req, res, next) => {
    const userID = req.params.userID;
    const page = req.query.page || 0;

    const foundUser = await User.findById(userID)

    if (!foundUser) {
        res.status(404);
        res.json({
            message: "User not found."
        });
        return;
    }

    const userData = await foundUser.populate({
        path: "posts",
        skip: 10 * page,
        limit: 10,
    });

    res.status(200);
    res.json({
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        posts: userData.posts,
    })
}