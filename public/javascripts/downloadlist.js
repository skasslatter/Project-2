
var link = document.getElementById("download_link")
link.addEventListener("click",()=> {
  var text = document.getElementById("shoppinglist");
  var data = new Blob([text.innerText], {type: 'text/plain'});

var url = window.URL.createObjectURL(data);

link.setAttribute("href", url);
})

