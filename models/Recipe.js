const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("./User.js");

const recipeSchema = new Schema({
    title: String,
    ingredients: Array,
    dishType: String,
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
    },
    imgName: String,
    imgPath: String,
});

const Recipe = mongoose.model("recipes", recipeSchema);
module.exports = Recipe;