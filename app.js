const express = require("express")
const bodyParser = require("body-parser")

const { connect } = require("./util/dbHelper");
const admin = require("./routes/admin");
const post = require("./routes/postData");
const user = require("./routes/userData");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/admin", admin);
app.use("/posts", post);
app.use("/users", user);

connect((connection, error) => {
    if (error) {
        console.log(error);
        return;
    }

    app.listen(3000, () => {
        console.log("Server started on - http://localhost:3000/");
    })
});