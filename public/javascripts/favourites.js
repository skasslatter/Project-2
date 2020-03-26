const $recipeList = document.querySelector("#favorites-list");
const $deleteButtonsRecipes = $recipeList.querySelectorAll("#recipe-delete");
for (i=0; i < $deleteButtonsRecipes.length; i++){
  $deleteButtonsRecipes[i].addEventListener("click", deleteRecipe);
}

let $addFavourite = document.getElementById("favourite");

$addFavourite.addEventListener("click", addToFavourites)

function addToFavourites(){
  let $recipeId = document.getElementById("recipeId");
  axios.post("/recipes/favourites", {favouriteRecipe: $recipeId.innerHTML})
  .then((favouriteRecipe) => {
    let $deleteButton = document.querySelector("#recipe-delete");
    $deleteButton.addEventListener("click", deleteRecipe);
    console.log("recipe is deleted from favourites: ", favouriteRecipe)
  })
  .catch(err => {
    console.log("Error: ", err);
  });
}


function deleteRecipe(event) {
  const $pushedButton = event.target;
  const $recipeId = $pushedButton.closest('#favourite-recipe').querySelector("#recipeId")

  axios
    .post("/recipes/delete", {recipeId: $recipeId.innerHTML})
    .then((response) => {
      $recipeToDelete = $pushedButton.closest("#favourite-recipe")
      $recipeList.removeChild($recipeToDelete);
    })
}


