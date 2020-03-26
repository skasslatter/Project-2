const express = require("express");
const app = express();
const Recipe = require("../../models/Recipe.js");
const User = require("../../models/User.js");
const Ingredient = require("../../models/Ingredient.js");

app.get("/:id", (req, res) => {
  const userPromise = User.findById(req.session.currentUser)
  const recipePromise = Recipe.findById(req.params.id)

  Promise
    .all([userPromise, recipePromise])
    .then (userAndRecipeArray =>{
      const userIngredients = userAndRecipeArray[0].fridgeIngredients
      const recipeIngredients = userAndRecipeArray[1].ingredients
      // console.log("THIS", findIngredient(userIngredients, recipeIngredients))
      const allIngredients = findIngredient(userIngredients, recipeIngredients)

      const availablePromise = Ingredient.find({_id: {$in: allIngredients.availableIngredients} })
      const missingPromise = Ingredient.find({_id: {$in: allIngredients.missingIngredients} })
      Promise
      .all([availablePromise, missingPromise])
      .then(ingredientsArray =>{
        Recipe
        .findById(req.params.id)
        .then((recipe) =>{
          res.render("recipes/detail", {recipe: recipe, availableIngredients: ingredientsArray[0], missingIngredients: ingredientsArray[1], currentUser: req.session.currentUser});
        })
      })
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});

app.post('/favourites', (req, res)=> {
  const favouriteRecipe = req.body.favouriteRecipe
  console.log(favouriteRecipe)
    User
  .findOneAndUpdate(  
    { _id: req.session.currentUser._id },
    { $push: { favouriteRecipes: favouriteRecipe} }
    )
    .then((favouriteRecipe) =>{
      res.send({favouriteRecipes: favouriteRecipe})
    })
   .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
})

app.post('/delete', (req, res)=> {
  const recipeId = req.body.recipeId
  User
  .findOneAndUpdate(
    { _id: req.session.currentUser._id },
    { $pull: { favouriteRecipes: recipeId} }
  )
  .then(() => {
    res.sendStatus(204);
  })
  .catch(err => {
    console.log("this is an error", err);
    res.send("error", err);
  });
})

module.exports = app;


function findIngredient(fridgeArray, recipeArray){
  let availableIngredients =[]
  let missingIngredients = []
  for (i = 0; i< recipeArray.length; i++){
    if (fridgeArray.indexOf(recipeArray[i]) === -1){
      missingIngredients.push(recipeArray[i])
    }
    else {
      availableIngredients.push(recipeArray[i])
    }
  }
  return {
    availableIngredients: availableIngredients, 
    missingIngredients: missingIngredients
  }
}