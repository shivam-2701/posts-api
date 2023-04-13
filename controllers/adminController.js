const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { User } = require("../models/user")
const { SALT_ROUNDS, SECRET } = require("../util/constants")

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const foundUser = await User.findOne({ email })
    if (foundUser) {
        res.status(403);
        res.json({
            message: "User with the given email exists already."
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    const user = await userDoc.save();

    const accessToken = jwt.sign(user.toJSON(), SECRET, {
        expiresIn: "30min",
    })

    res.status(201);
    res.json({
        userID: user._id,
        email: user.email,
        username: user.username,
        accessToken
    })
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
        res.status(401);
        res.json({
            message: "User with the given email does not exists."
        })
        return;
    }

    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
        res.status(401);
        res.json({
            message: "Invalid password."
        });
        return;
    }

    const accessToken = jwt.sign(foundUser.toJSON(), SECRET, {
        expiresIn: "30min",
    })

    res.status(200);
    res.json({
        userID: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        accessToken
    })
}