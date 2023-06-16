const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('txtName');
  const lastName = document.getElementById('txtLastName');
  const email = document.getElementById('txtEmail'); 
  const birthdayDate = document.getElementById('txtDate');
  const number = document.getElementById('txtNumber');
  const zip = document.getElementById('txtZip');
  const city = document.getElementById('txtCity');
  const state = document.getElementById('txtState');

  const person = {
    firstName,
    lastName,
    email,
    birthdayDate,
    number,
    zip,
    city,
    state,
  };
  const savedPeople = JSON.parse(localStorage.getItem('people')) || [];

  localStorage.setItem('people',JSON.stringify(savedPeople));

  savedPeople.push(person);

  alert(`Cadastro realizado com sucesso !`);
  console.log(savedPeople);
  window.location.reload();
})


