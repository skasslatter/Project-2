const express = require("express");
const app = express();
const Recipe = require("../../models/Recipe.js");


app.get("/", (req, res) => {
  Recipe
  .find()
  .then(recipes => {
    res.render("recipes/list.hbs", { recipes: recipes , currentUser: req.session.currentUser});
    })
    .catch(err => {
      res.render("error", err);
    });
});

module.exports = app;
