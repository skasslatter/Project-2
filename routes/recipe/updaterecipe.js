const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const Recipe = require("../../models/Recipe.js");
const Ingredient = require("../../models/Recipe.js");

app.get("/:id/update", (req, res) => {
  // const ingredientPromise = Ingredient.find();
  // const recipePromise = Recipe.findById(req.params.id);

  // Promise.all([ingredientPromise, recipePromise])
  //   .then(ingredientAndRecipeArray => {
  //     console.log("BLABLA", ingredientAndRecipeArray)
  //     const ingredients = ingredientAndRecipeArray[0]
  //     const recipe = ingredientAndRecipeArray[1]
  //     res.render("recipes/update.hbs", {ingredients: ingredients, recipe: recipe });
  //   })

  Recipe.findById(req.params.id)
    .then(recipe => {
      console.log("the response is", recipe);
      res.render("recipes/update", {
        recipe: recipe,
        currentUser: req.session.currentUser
      });
    })
    .catch(err => {
      res.render("error", err);
    });
});

app.post("/:id/update", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    cuisine: req.body.cuisine,
    duration: req.body.duration,
    dishType: req.body.dishType,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image
  })
    .then(() => {
      res.redirect(`/recipes/${req.params.id}`);
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

module.exports = app;
