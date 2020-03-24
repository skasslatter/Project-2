const $list = document.getElementById("ingredient-list");
const $addButton = document.getElementById("fridge-button");

$addButton.addEventListener("click", createIngredient);

function createIngredient() {
  let $input = document.getElementById("ingredient-input");
  axios
    .post("/fridge/add", { ingredientName: $input.value })
    .then(response => {
      console.log("THis is the new ingredient:", response)
      let $newIngredient = document.createElement("span");
      $newIngredient.className = "ingredient";
      $newIngredient.innerHTML = `
      <li>${response.data.name}</li>
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

function deleteIngredient(event) {
  const deletepushedButton = event.target;
  const ingredientToRemove = deletepushedButton.closest(".ingredient");
  $list.removeChild(ingredientToRemove);
}
