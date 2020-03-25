const $list = document.getElementById("ingredient-list");

// ADD INGREDIENT
const $addButton = document.getElementById("fridge-add");
$addButton.addEventListener("click", createIngredient);

function createIngredient() {
  let $input = document.getElementById("ingredient-input");
  axios
    .post("/fridge/add", { ingredientName: $input.value })
    .then(response => {
      console.log("This is the new ingredient:", response)
      let $newIngredient = document.createElement("span");
      $newIngredient.className = "ingredient";
      $newIngredient.innerHTML = `
      <li class="ingredient-name">${response.data.name}</li>
      <button id="btn-delete" class="btn btn-danger">Remove</button>`;
      $list.appendChild($newIngredient);
      $input.value = "";

      let $deleteButton = $newIngredient.querySelector("#btn-delete");
      $deleteButton.addEventListener("click", deleteIngredient);
    })
    .catch(err => {
      console.log("Error: ", err);
    });
}

// DELETE INGREDIENT
const $deleteButtons = $list.querySelectorAll("#btn-delete");
for (i=0; i < $deleteButtons.length; i++){
  $deleteButtons[i].addEventListener("click", deleteIngredient);
}

function deleteIngredient(event) {
  const $pushedButton = event.target;
  const $ingredientToDelete = $pushedButton.closest('.ingredient').querySelector('.ingredient-name');
  const ingredientName = $ingredientToDelete.innerHTML

  axios
    .post("/fridge/delete", {ingredientName: ingredientName})
    .then((response) => {
      const $spanToRemove = $pushedButton.closest(".ingredient");
      $list.removeChild($spanToRemove);
    })
}
