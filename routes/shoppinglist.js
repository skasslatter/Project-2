const express = require("express");
const app = express();
const Recipe = require("../models/Recipe.js");

app.get("/:id", (req,res)=> {
  Recipe
  .findById(req.params.id)
  .then(recipe => {
    res.render("user/shoppinglist", {recipe: recipe, currentUser: req.session.currentUser});
  })
  .catch(err => {
    console.log("this is an error", err);
    res.send("error", err);
  });
});

module.exports = app;