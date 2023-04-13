const { Schema, default: mongoose } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: {
        type: [Schema.Types.ObjectId],
        ref: "Post",
    }
})

exports.User = mongoose.model("User", userSchema);