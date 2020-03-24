const $list =document.getElementById("ingredient-list")

const $addButton = document.getElementById("fridge-button")
$addButton.addEventListener("click", createIngredient)

function createIngredient (){

  let $input = document.getElementById("ingredient-input");
  let $newIngredient = document.createElement("span");
  
  $newIngredient.className = "ingredient";
  $newIngredient.innerHTML = `
  <li>${$input.value}</li>
  <button id="btn-delete" class="btn btn-danger">Remove</button>`

  $list.appendChild($newIngredient);

  $input.value = "";

  let $deleteButton = $newIngredient.querySelector('#btn-delete');
  $deleteButton.addEventListener("click", deleteIngredient)
}

function deleteIngredient (event){
  const deletepushedButton = event.target;
  const ingredientToRemove = deletepushedButton.closest(".ingredient")
  $list.removeChild(ingredientToRemove);
}
