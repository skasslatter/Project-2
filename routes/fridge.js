const express = require("express");
const app = express();
const Ingredient = require("../models/Ingredient");
const User = require("../models/User");

app.get("/", (req, res) => {
  console.log("session:", req.session);
  User.findById(req.session.currentUser._id)
    .populate("fridgeIngredients")
    .then(user => {
      res.render("user/fridge", {
        ingredients: user.fridgeIngredients,
        currentUser: req.session.currentUser
      });
    });
});

//ADD INGREDIENT
app.post("/add", (req, res) => {
  const newIngredientName = req.body.ingredientName;
  const sanitizedName = newIngredientName.toLowerCase().trim();
  console.log("sanitizedName is:", sanitizedName);
  Ingredient.findOne({ name: sanitizedName }).then(ingredient => {
    if (!ingredient) {
      console.log("couldn't find ingredient, creating new one");
      Ingredient.create({ name: sanitizedName }).then(newIngredient => {
        console.log("Created ingredient:", newIngredient);
        User.findOneAndUpdate(
          { _id: req.session.currentUser._id },
          { $push: { fridgeIngredients: newIngredient.id } }
        ).then(() => {
          res.json(newIngredient);
        });
      });
    } else {
      console.log("ingredient found:", ingredient);
      User.findOneAndUpdate(
        { _id: req.session.currentUser._id },
        { $push: { fridgeIngredients: ingredient.id } }
      ).then(() => {
        res.json(ingredient);
      });
    }
  });
});

//REMOVE INGREDIENT
app.post("/delete", (req, res) => {
  console.log( req.body)
  const ingredientName = req.body.ingredientName;
  Ingredient.findOne({ name: ingredientName })
  .then(ingredient => {
    User.findOneAndUpdate(
      { _id: req.session.currentUser._id },
      { $pull: { fridgeIngredients: ingredient._id } }
    ).then(() => {
      res.sendStatus(204);
    });
  });
});

module.exports = app;
