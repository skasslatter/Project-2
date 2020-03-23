const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.js");

const recipeSchema = new Schema({
    title: String,
    ingredients: Array,
    dishType: String,
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1635&q=80"
    },
    duration: {
      type: Number,
      min: 0
    },
    created: {
      type: Date,
      default: Date.now
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
});

const Recipe = mongoose.model("recipes", recipeSchema);
module.exports = Recipe;