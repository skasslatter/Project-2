const express = require("express");
const app = express();
const Recipe = require("../../models/Recipe.js");
const User = require("../../models/User");

app.get("/", (req, res) => {
  Recipe
    .find()
    .then(recipes => {
      res.render("recipes/list.hbs", { recipes: recipes, currentUser: req.session.currentUser });
    })
    .catch(err => {
      res.render("error", err);
    });
});

app.get('/results', (req, res) => {
  User
    .findById(req.session.currentUser._id)
    .then((user) => {
      ingredients = user.fridgeIngredients
      console.log(ingredients)

      const stringIngredients = ingredients.map(i=> i.toString())
      Recipe
        .aggregate(
          [
            {
              $addFields: {
                newField: {
                  shared_ingredients: {
                    $setIntersection: [
                      "$ingredients", 
                      stringIngredients
                    ]
                  }
                } 
              }
            }
            , {
              $addFields: {
                newField: {
                  filteredresults: {
                    $size: '$newField.shared_ingredients'
                  }
                }
              }
            }, {
              $match: {
                "newField.filteredresults": {
                  $gt: 0
                }
              }
            }
          
          ]
        )
        .then((recipes)=> {
          console.log(recipes)
          res.render("recipes/list.hbs", { recipes: recipes, currentUser: req.session.currentUser });
        })
        .catch(err => {
          console.log(err)
          res.render("error", err);
        });
    })
    .catch(err => {
      console.log(err)
      res.render("error", err);
    });
})

module.exports = app;
