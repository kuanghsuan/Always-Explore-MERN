const fs = require('fs');
const path = require('path');

const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

const placesRouters = require("./routes/places-routes");
const usersRouters = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParse.json());

app.use('/uploads/images', express.static(path.join('uploads','images')));

app.use((req, res, next)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE');
  next();
})

app.use("/api/users", usersRouters);

app.use("/api/places", placesRouters);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uxoey.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => {
    s;
    console.log(err);
  });
