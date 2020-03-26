const mongoose = require('mongoose')
const Ingredient = require("./Ingredient.js");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your name is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Username is required']
  },
  fridgeIngredients: [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'ingredients'
    }
  ],
  favouriteRecipes: [
    {
      type : mongoose.Schema.ObjectId,
      ref : 'recipes'
    }
  ]
})

const User = mongoose.model("users", userSchema); 
module.exports = User;
