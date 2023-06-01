const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");

const { connect } = require("./util/dbHelper");
const admin = require("./routes/admin");
const post = require("./routes/postData");
const user = require("./routes/userData");

config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).send(
    `Welcome to posts_api!
        The following routes exist-
        /admin/signup - [POST] Send email, password and username in json body
        /admin/login - [POST] Send registered email and password in json body, returns a JSON Web Token, which is used in Authentication header to access post routes.
        
        /posts - [GET] Send a get request to get all posts, from all users.
        /posts/:postID - [GET] Get a specific post by its id.
        /posts - [POST] Send a POST request with JSON data including title and body, along with the JSON Web Token recieved from login route, to POST a post as a user.
        `
  );
});
app.use("/admin", admin);
app.use("/posts", post);
app.use("/users", user);

app.use((req, res, next) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

connect((_connection, error) => {
  if (error) {
    console.log(error);
    return;
  }

  app.listen(3000, () => {
    console.log("Server started on - http://localhost:3000/");
  });
});
