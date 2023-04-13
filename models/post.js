const { Schema, default: mongoose } = require("mongoose")

exports.postSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
})

exports.Post = mongoose.model("Post", this.postSchema);