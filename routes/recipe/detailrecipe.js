const express = require("express");
const app = express();
const Recipe = require("../../models/Recipe.js");

app.get("/:id", (req, res) => {
  Recipe
  .findById(req.params.id)
  .populate("ingredients")
    .then(recipe => {
      console.log("the response is", recipe);
      res.render("recipes/detail", {recipe: recipe, currentUser: req.session.currentUser});
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

module.exports = app;
