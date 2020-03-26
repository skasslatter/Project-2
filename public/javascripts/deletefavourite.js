const $recipeList = document.querySelector("#favorites-list");
const $deleteButtonsRecipes = $recipeList.querySelectorAll("#recipe-delete");
for (i=0; i < $deleteButtonsRecipes.length; i++){
  $deleteButtonsRecipes[i].addEventListener("click", deleteRecipe);
}

function deleteRecipe(event) {
  const $pushedButton = event.target;
  const $recipeId = $pushedButton.closest('#favourite-recipe').querySelector("#recipeId")

  axios
    .post("/recipes/detail/delete", {recipeId: $recipeId.innerHTML})
    .then((response) => {
      $recipeToDelete = $pushedButton.closest("#favourite-recipe")
      $recipeList.removeChild($recipeToDelete);
    })
}


