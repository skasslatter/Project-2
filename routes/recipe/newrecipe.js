const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const Recipe = require("../../models/Recipe.js");

const multer = require("multer");
const uploadCloud = require("../../config/cloudinary.js");

app.get("/", (req, res) => {
  res.render("recipes/create", {currentUser: req.session.currentUser});
});

app.post("/", uploadCloud.single('photo'), (req, res) => {
  console.log("here", req.body, req.file, req.session);
  Recipe
  .create({
    title: req.body.title,
    dishType: req.body.dishType,
    duration: req.body.duration,
    ingredients: req.body.ingredients,
    imgPath: req.file.url,
    imgName: req.file.originalname,
  })
    .then(recipe => {
      res.redirect(`/recipes/${recipe.id}`);
    })
    .catch(error => {
      res.send("error", error);
    });
});

module.exports = app;