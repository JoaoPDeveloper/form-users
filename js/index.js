const form = document.querySelector('#form');
const tabela = document.querySelector('#tabela tbody');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioSelecionado = null;

form.addEventListener('submit', (event) => {
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
        return { nome, sobrenome, email, dataNascimento, number, state,city };
      } else {
        return usuario;
      }
    });

    const index = usuarios.findIndex((usuario) => usuario.email === usuarioSelecionado.email);

    usuarios[index] = { nome, sobrenome, email, dataNascimento, number, state,city };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    usuarioSelecionado = null;

    // Atualizar a tabela
    atualizarTabela();
  } else {
    usuarios.push({ nome, sobrenome, email, dataNascimento, number, state,city });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    event.target.reset();

    atualizarTabela();
  }

});

function atualizarTabela() {
  tabela.innerHTML = '';

  usuarios.forEach((usuario) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.sobrenome}</td>
      <td>${usuario.email}</td>
      <td>${usuario.number}</td>
      <td>${usuario.city}</td>
      <td>${usuario.state}</td>
      <td>${usuario.dataNascimento}</td>
      <td><button class="btn btn-outline-info" type="button" onclick="editarUsuario('${usuario.email}')">Editar</button></td>
      <td><button class="btn btn-outline-danger" type="button" onclick="excluirUsuario ('${usuario.email}')">Excluir</button></td>
    `;
    tabela.appendChild(linha);
  });
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
  if ( index !== -1 ){
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    atualizarTabela();
  }else(
    console.log('Usuário não encontrado no sistema!')
  )
}

atualizarTabela();
