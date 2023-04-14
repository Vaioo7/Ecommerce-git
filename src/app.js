require('dotenv').config()
require('./db/conn');
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUplod = require('express-fileupload');
const cloudinary = require("cloudinary");
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();


const errorMiddleware = require("../src/middleware/error");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(fileUplod({useTempFiles : true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('assets'));


cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

// Route Imports
const pro = require("../routes/product");
const ord = require("../routes/order");
const admin = require("../routes/adminRoute");
const user = require("../routes/user");

app.use("/", pro);
app.use("/", ord);
app.use("/", admin);
app.use("/", user);

// Middleware for Errors
app.use(errorMiddleware);

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.listen(port, () => {
  console.log(`server is running at port on ${port}`);
});