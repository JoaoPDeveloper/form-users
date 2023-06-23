const form = document.querySelector("#form");
const tabela = document.querySelector("#tabela tbody");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioSelecionado = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const projectName = event.target.projectName.value;
  const email = event.target.email.value;
  const emailAdicional = event.target.emailAdicional.value;
  const tasks = event.target.tasks.value;
  const dateStart = moment(event.target.dateStart.value).format("DD/MM/YYYY");
  const dateEnd = moment(event.target.dateEnd.value).format("DD/MM/YYYY");

  // Verificar se o data de inicio e de fim sao validos
  const dateEndTasks = new Date(form.dateEnd.value);

  if (!isNaN(dateEndTasks.getDate())) {
    dateEndTasks.setHours(23, 59, 59);
    const notificationUser = () => {
      alert(
        `A data de término do seu projeto ${projectName} é hoje. Por favor, conclua-o.`
      );
    };
    const temporizador = setInterval(() => {
      const now = new Date();
      if (now >= dateEndTasks) {
        notificationUser();

        clearInterval(temporizador);
      }
    }, 1000);
  }

  //criação do objeto e salva ele no localStorage

  if (usuarioSelecionado) {
    const novosUsuarios = usuarios.map((usuario) => {
      if (usuario.email === usuarioSelecionado.email) {
        return {
          projectName,
          email,
          emailAdicional,
          tasks,
          dateStart,
          dateEnd,
        };
      } else {
        return usuario;
      }
    });

    const index = usuarios.findIndex(
      (usuario) => usuario.email === usuarioSelecionado.email
    );

    usuarios[index] = {
      projectName,
      email,
      emailAdicional,
      tasks,
      dateStart,
      dateEnd,
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    usuarioSelecionado = null;

    // Atualizar o usuario
    atualizarTabela();
  } else {
    usuarios.push({
      projectName,
      email,
      emailAdicional,
      tasks,
      dateStart,
      dateEnd,
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    event.target.reset();

    atualizarTabela();
  }
});

// criação do card

function atualizarTabela() {
  tabela.innerHTML = "";

  const row = document.createElement("div");
  row.classList.add("row", "justify-content-center", "align-items-center");

  usuarios.forEach((usuario) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = "cardItem";
    card.innerHTML = `
      <div class="card-body text-warning" id="cards">
      <h5 class="card-title">${usuario.projectName}</h5>
      <p class="card-text text-warning">E-mail Principal: <a href="#" id="emailForm" data-email="${
        usuario.email
      }" data-project="${usuario.projectName}" data-tasks="${usuario.tasks}">${
      usuario.email
    }</a></p>
      ${
        usuario.emailAdicional
          ? `<p class="card-text text-warning">E-mail Adicional: <a href="#" id="emailForm" data-email="${usuario.emailAdicional}" data-project="${usuario.projectName}" data-tasks="${usuario.tasks}">${usuario.emailAdicional}</a></p>`
          : ""
      }
      <p class="card-text form-control text-center " id="activites">${
        usuario.tasks
      }</p>      
        <p class="card-text ">Data de Inicio: ${usuario.dateStart}</p>
        <p class="card-text ">Data de Fim: ${usuario.dateEnd}</p>
        <button class="btn btn-outline-info" type="button" onclick="editarUsuario('${
          usuario.email
        }')">Editar</button>
        <button class="btn btn-outline-danger" type="button" onclick="excluirUsuario ('${
          usuario.email
        }')">Excluir</button>
      </div>
    `;
    // copiar projeto para a área de transferência
    document.addEventListener("click", (event) => {
      const link = event.target.closest("#emailForm");
      if (link) {
        event.preventDefault();
        const projectName = link.dataset.project;
        const textToCopy = `Projeto: ${projectName}\nAtividades: ${usuario.tasks}\nE-mail: ${usuario.email}\nE-mail Adicional: ${usuario.emailAdicional}\nData de Inicio: ${usuario.dateStart}\nData de Fim: ${usuario.dateEnd}`;
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            alert("O texto foi copiado para a área de transferência!");
          })
          .catch((error) => {
            console.error(`Ocorreu um erro ao copiar o texto: ${error}`);
          });
      }
    });
    card
      .querySelectorAll('input[type="text"],input[type="number"]')
      .forEach((input) => {
        const label = input.previusElementSibling;
        const labelText = label.innerText;
        label.innerHTML = `${labelText} <span class="text-muted">(opicional)</span>`;
        input.placeholder = `Digite ${labelText.toLowerCase()}`;
      });

    const col = document.createElement("div");
    col.classList.add("col-md-5", "bg-custom", "m-2");
    col.id = "colId";
    col.appendChild(card);

    row.appendChild(col);
  });

  tabela.appendChild(row);
}

// faz todo o CRUD da aplicação

function editarUsuario(email) {
  const usuario = usuarios.find((u) => u.email === email);
  usuarioSelecionado = usuario;

  usuarioSelecionado = usuarios.find((usuario) => usuario.email === email);
  if (usuarioSelecionado) {
    form.projectName.value = usuarioSelecionado.projectName;
    form.email.value = usuarioSelecionado.email;

    form.tasks.value = usuarioSelecionado.tasks;
    form.dateStart.value = moment(
      usuarioSelecionado.dateStart,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    form.dateEnd.value = moment(
      usuarioSelecionado.dateEnd,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
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
