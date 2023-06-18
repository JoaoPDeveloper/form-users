const form = document.querySelector("#form");
const tabela = document.querySelector("#tabela tbody");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioSelecionado = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = event.target.nome.value;
  const sobrenome = event.target.sobrenome.value;
  const email = event.target.email.value;
  const dataNascimento = event.target.dataNascimento.value;
  const number = event.target.number.value;
  const state = event.target.state.value;
  const city = event.target.city.value;

  if (usuarioSelecionado) {
    const novosUsuarios = usuarios.map((usuario) => {
      if (usuario.email === usuarioSelecionado.email) {
        return { nome, sobrenome, email, dataNascimento, number, state, city };
      } else {
        return usuario;
      }
    });

    const index = usuarios.findIndex(
      (usuario) => usuario.email === usuarioSelecionado.email
    );

    usuarios[index] = {
      nome,
      sobrenome,
      email,
      dataNascimento,
      number,
      state,
      city,
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    usuarioSelecionado = null;

    // Atualizar a tabela
    atualizarTabela();
  } else {
    usuarios.push({
      nome,
      sobrenome,
      email,
      dataNascimento,
      number,
      state,
      city,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    event.target.reset();

    atualizarTabela();
  }
});

function atualizarTabela() {
  tabela.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-center", "align-items-center");
  
  usuarios.forEach((usuario) => {
    const card = document.createElement("div");
    card.classList.add("card"); 
    card.id = 'cardItem'
    card.innerHTML = `
      <div class="card-body  text-warning" id="cards">
        <h5 class="card-title">${usuario.nome} ${usuario.sobrenome}</h5>
        <p class="card-text text-warning">E-mail: ${usuario.email}</p>
        <p class="card-text">Contato: ${usuario.number}</p>
        <p class="card-text">Cidade: ${usuario.city}</p>
        <p class="card-text cor-customizada">Estado: ${usuario.state}</p>
        <p class="card-text ">Data de Nascimento: ${usuario.dataNascimento}</p>
        <button class="btn btn-outline-info" type="button" onclick="editarUsuario('${usuario.email}')">Editar</button>
        <button class="btn btn-outline-danger" type="button" onclick="excluirUsuario ('${usuario.email}')">Excluir</button>
      </div>
    `;
    card.querySelectorAll('input[type="text"],input[type="number"]').forEach((input) => {
      const label = input.previusElementSibling;
      const labelText = label.innerText;
      label.innerHTML = `${labelText} <span class="text-muted">(opicional)</span>`;
      input.placeholder = `Digite ${labelText.toLowerCase()}`;
    });
  
    const col = document.createElement("div");
    col.classList.add("col-md-5", "bg-custom", "m-2");
    col.id = 'colId'
    col.appendChild(card);
  
    row.appendChild(col);
  });
  
  tabela.appendChild(row);
}

function editarUsuario(email) {
  usuarioSelecionado = usuarios.find((usuario) => usuario.email === email);
  if (usuarioSelecionado) {
    form.nome.value = usuarioSelecionado.nome;
    form.sobrenome.value = usuarioSelecionado.sobrenome;
    form.email.value = usuarioSelecionado.email;
    form.number.value = usuarioSelecionado.number;
    form.state.value = usuarioSelecionado.state;
    form.city.value = usuarioSelecionado.city;
    form.dataNascimento.value = usuarioSelecionado.dataNascimento;
  }
}

function excluirUsuario(email) {
  const index = usuarios.findIndex((usuario) => usuario.email === email);
  if (index !== -1) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    atualizarTabela();
  } else console.log("Usuário não encontrado no sistema!");
}

atualizarTabela();
