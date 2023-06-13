var form = document.getElementById("form");
var submitButton = document.getElementById("submit");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var firstName = document
    .getElementById("validationDefault01")
    .value.toString();
  var lastName = document
    .getElementById("validationDefault02")
    .value.toString();
  var city = document.getElementById("validationDefault03").value.toString();
  var cep = document.getElementById("validationDefault05").value.toString();
  var number = document.getElementById("validationDefault06").value.toString();
  var state = document.getElementById("validationDefault07").value.toString();
  var country = document.getElementById("validationDefault08").value.toString();
  var userName = document
    .getElementById("validationDefaultUsername")
    .value.toString();
  var invalidCheck2 = document.getElementById("invalidCheck2").value.toString();

  console.log(firstName);
  console.log(lastName);
  console.log(userName);
  console.log(city);
  console.log(state);
  console.log(cep);
  console.log(country);
  console.log(number);
  console.log(invalidCheck2);
  window.alert("cadastro feito com sucesso!");
  location.reload();
});
