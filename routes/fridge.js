const express = require("express");
const app = express();
const Ingredient = require("../models/Ingredient");
const User = require("../models/User");

app.get("/", (req, res) => {
  console.log("session:", req.session);
  // Ingredient.find()
  console.log("BLABLA", req.session.currentUser)
  User
  .findById(req.session.currentUser._id)
  .populate("fridgeIngredients")
  .then((user) => {
    console.log("XTXT", user)
    res.render("user/fridge", {
      ingredients: user.fridgeIngredients,
      currentUser: req.session.currentUser
    });
  });
});

app.post("/add", (req, res) => {
 const newIngredientName = req.body.ingredientName;
 const sanitizedName = newIngredientName.toLowerCase().trim();
 console.log("sanitizedName is:", sanitizedName)
 Ingredient
    .findOne({name: sanitizedName})
    .then((ingredient) => {
      if (!ingredient) {
        console.log("couldn't find ingredient, going to create new one")
        Ingredient
        .create({name: sanitizedName})
        .then((newIngredient)=> {
          console.log("Created ingredient:", newIngredient)
          User
          .findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {fridgeIngredients: newIngredient.id}})
          .then(() => {
            res.json(newIngredient)
         })
        })
      }
      else {
        console.log("could find ingredient:", ingredient)
        User
          .findOneAndUpdate({_id: req.session.currentUser._id}, {$push: {fridgeIngredients: ingredient.id}})
          .then(() => {
            res.json(ingredient)
          })
      }
    })
});

module.exports = app;
