const jwt = require("jsonwebtoken");

const { SECRET } = require("../util/constants");
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.status(401);
        res.json({
            message: "No auth header found. Try - Authorization : Bearer <access_token>"
        })
        return;
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        const result = jwt.verify(accessToken, SECRET);
        const foundUser = await User.findById(result._id);
        if (!foundUser) {
            res.status(401);
            res.json({
                message: `Authentication failed. User not found.`
            })
            return;
        }

        req.user = foundUser;
    } catch (err) {
        res.status(401);
        res.json({
            message: `Authentication failed. Invalid access token.`
        })
        return;
    }
    next();
}