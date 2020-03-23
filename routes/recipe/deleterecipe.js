const express = require("express");
const app = express();
const Recipe = require("../../models/Recipe.js");

app.get("/:id/delete", (req, res) => {
  Recipe
  .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

module.exports = app;