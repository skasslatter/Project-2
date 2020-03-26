
const $addFavourite = document.querySelector("#favourite");
$addFavourite.addEventListener("click", addToFavourites)

function addToFavourites(){
  let $recipeId = document.getElementById("recipeId");
  axios.post("/recipes/favourites", {favouriteRecipe: $recipeId.innerHTML})
  .then((favouriteRecipe) => {
  
    console.log("recipe is deleted from favourites: ", favouriteRecipe)
  })
  .catch(err => {
    console.log("Error: ", err);
  });
}

