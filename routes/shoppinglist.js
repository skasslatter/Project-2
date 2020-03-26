const express = require("express");
const app = express();
const Recipe = require("../models/Recipe.js");
const User = require("../models/User.js");
const Ingredient = require("../models/Ingredient.js");

// app.get("/:id", (req,res)=> {
//   Recipe
//   .findById(req.params.id)
//   .then(recipe => {
//     res.render("user/shoppinglist", {recipe: recipe, currentUser: req.session.currentUser});
//   })
//   .catch(err => {
//     console.log("this is an error", err);
//     res.send("error", err);
//   });
// });

// module.exports = app;

//
app.get("/:id", (req, res) => {
  const userPromise = User.findById(req.session.currentUser)
  const recipePromise = Recipe.findById(req.params.id)

  Promise
    .all([userPromise, recipePromise])
    .then ((userAndRecipeArray) =>{
      const userIngredients = userAndRecipeArray[0].fridgeIngredients;
      const recipeIngredients = userAndRecipeArray[1].ingredients;
      const allIngredients = findMissingIngredient(userIngredients, recipeIngredients);

      Ingredient
      .find({_id: {$in: allIngredients}})
      .then((ingredients) =>{
          res.render("user/shoppinglist", {ingredients: ingredients, currentUser: req.session.currentUser});
        })
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    })
})

module.exports = app;


function findMissingIngredient(fridgeArray, recipeArray){
  let missingIngredients = []
  for (i = 0; i< recipeArray.length; i++){
    if (fridgeArray.indexOf(recipeArray[i]) === -1){
      missingIngredients.push(recipeArray[i])
    }
  }
  return missingIngredients
}