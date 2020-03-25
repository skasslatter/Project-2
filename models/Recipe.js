const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    ingredients: [{
      type : mongoose.Schema.ObjectId,
      ref : 'ingredients'
    }],
    duration: {
      type: Number,
      min: 0
    },
    description: String,
    created: {
      type: Date,
      default: Date.now
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    imgName: String,
    imgPath: String,
});

const Recipe = mongoose.model("recipes", recipeSchema);
module.exports = Recipe;

