/* ================================================================
   SCRIPT PRINCIPAL DA PLATAFORMA DE ONGs
   Autor: João Mateus
   ================================================================= */


/* ================================================================
   1. FUNÇÕES DE SUPORTE AO LOCALSTORAGE
   ================================================================ */

// Carrega dados ou inicia um array vazio
function carregarLS(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

// Salva dados
function salvarLS(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}



/* ================================================================
   2. CADASTRO DE ONG  (cadastro.html)
   ================================================================ */

function iniciarCadastroONG() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ongs = carregarLS("ongs");

    const novaONG = {
      id: Date.now(),
      nome: form.nomeOng.value,
      area: form.area.value,
      descricao: form.descricao.value,
      dataFundacao: form.dataFundacao.value,
      cep: form.cep.value,
      endereco: form.endereco.value,
      cidade: form.cidade.value,
      estado: form.estado.value,
      telefone: form.telefone.value,
      email: form.email.value,
      instagram: form.instagram.value,
      meta: Number(form.meta.value),
      banco: form.banco.value,
      agencia: form.agencia.value,
      conta: form.conta.value,
      cpf: form.cpf.value,
      foto: form.foto.value || "",
      arrecadado: 0
    };

    ongs.push(novaONG);
    salvarLS("ongs", ongs);

    document.getElementById("mensagem").textContent =
      "ONG cadastrada com sucesso!";
    form.reset();
  });
}



/* ================================================================
   3. LISTAGEM DE ONGS  (ongs.html)
   ================================================================ */

function listarONGs() {
  const lista = document.getElementById("listaOngs");
  if (!lista) return;

  const ongs = carregarLS("ongs");

  if (ongs.length === 0) {
    lista.innerHTML = "<p>Nenhuma ONG cadastrada ainda.</p>";
    return;
  }

  lista.innerHTML = "";

  ongs.forEach((ong) => {
    const card = document.createElement("div");
    card.className = "card-ong";

    card.innerHTML = `
      <img src="${ong.foto || "https://i.pravatar.cc/150"}" class="foto-ong" />
      <h3>${ong.nome}</h3>
      <p><strong>Área:</strong> ${ong.area}</p>
      <p><strong>Cidade:</strong> ${ong.cidade} - ${ong.estado}</p>
      <p><strong>Arrecadado:</strong> R$ ${ong.arrecadado}</p>
      <a class="botao" href="detalhe.html?id=${ong.id}">Mais detalhes</a>
    `;

    lista.appendChild(card);
  });
}



/* ================================================================
   4. DETALHES DA ONG  (detalhe.html)
   ================================================================ */

function carregarDetalhesONG() {
  const container = document.getElementById("detalheContainer");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const ongs = carregarLS("ongs");
  const ong = ongs.find((o) => o.id === id);

  if (!ong) {
    container.innerHTML = "<p>ONG não encontrada.</p>";
    return;
  }

  container.innerHTML = `
    <div class="card detalhe-card">
      <img src="${ong.foto || "https://i.pravatar.cc/150"}" class="foto-ong" />
      <h3>${ong.nome}</h3>

      <p><strong>Área de atuação:</strong> ${ong.area}</p>
      <p><strong>Descrição:</strong> ${ong.descricao}</p>
      <p><strong>Fundada em:</strong> ${ong.dataFundacao}</p>
      <p><strong>Localização:</strong> ${ong.cidade} - ${ong.estado}</p>
      <p><strong>Meta:</strong> R$ ${ong.meta}</p>
      <p><strong>Arrecadado:</strong> R$ ${ong.arrecadado}</p>

      <a href="doacao.html" class="botao secundario">Fazer doação</a>
    </div>
  `;
}



/* ================================================================
   5. DOAÇÃO (doacao.html)
   ================================================================ */

function iniciarDoacao() {
  const select = document.getElementById("ongSelect");
  const msg = document.getElementById("msgDoacao");
  const form = document.getElementById("formDoacao");

  if (!select || !form) return;

  const ongs = carregarLS("ongs");

  // Preenche o select
  ongs.forEach((ong) => {
    const opt = document.createElement("option");
    opt.value = ong.id;
    opt.textContent = ong.nome;
    select.appendChild(opt);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = Number(select.value);
    const valor = Number(document.getElementById("valor").value);

    const ong = ongs.find((o) => o.id === id);
    if (!ong) return;

    ong.arrecadado += valor;

    // Salva
    salvarLS("ongs", ongs);

    msg.textContent = "Doação registrada com sucesso!";
    form.reset();
  });
}



/* ================================================================
   6. VOLUNTÁRIOS (voluntarios.html)
   ================================================================ */

function iniciarVoluntarios() {
  const form = document.getElementById("formVoluntario");
  const msg = document.getElementById("msgVoluntario");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const voluntarios = carregarLS("voluntarios");

    voluntarios.push({
      id: Date.now(),
      nome: document.getElementById("nomeVoluntario").value,
      email: document.getElementById("emailVoluntario").value,
      telefone: document.getElementById("telefoneVoluntario").value,
      interesse: document.getElementById("interesse").value,
      mensagem: document.getElementById("mensagemVoluntario").value
    });

    salvarLS("voluntarios", voluntarios);

    msg.textContent = "Inscrição enviada com sucesso!";
    form.reset();
  });
}



/* ================================================================
   7. PAINEL ADMINISTRATIVO (admin.html)
   ================================================================ */

function carregarPainelAdmin() {
  const totalOngs = document.getElementById("totalOngs");
  const totalDoacoes = document.getElementById("totalDoacoes");
  const listaDoacoes = document.getElementById("listaDoacoes");
  const listaVoluntarios = document.getElementById("listaVoluntarios");

  if (!totalOngs) return;

  const ongs = carregarLS("ongs");
  const voluntarios = carregarLS("voluntarios");

  totalOngs.textContent = ongs.length;

  const somaDoacoes = ongs.reduce((acc, ong) => acc + ong.arrecadado, 0);
  totalDoacoes.textContent = somaDoacoes;

  // Lista de doações
  listaDoacoes.innerHTML = "";
  ongs.forEach((ong) => {
    if (ong.arrecadado > 0) {
      const p = document.createElement("p");
      p.textContent = `${ong.nome}: R$ ${ong.arrecadado}`;
      listaDoacoes.appendChild(p);
    }
  });

  // Voluntários
  listaVoluntarios.innerHTML = "";
  voluntarios.forEach((v) => {
    const p = document.createElement("p");
    p.textContent = `${v.nome} — ${v.interesse}`;
    listaVoluntarios.appendChild(p);
  });
}



/* ================================================================
   8. FUNÇÕES DA PÁGINA INICIAL (index.html)
   ================================================================ */

function carregarResumoHome() {
  const totalOngs = document.getElementById("totalOngsHome");
  const totalDoacoes = document.getElementById("totalDoacoesHome");

  if (!totalOngs) return;

  const ongs = carregarLS("ongs");

  totalOngs.textContent = ongs.length;
  totalDoacoes.textContent = ongs.reduce((acc, ong) => acc + ong.arrecadado, 0);
}



/* ================================================================
   9. MENU MOBILE (opcional - funciona com nav-toggle)
   ================================================================ */

function iniciarMenuMobile() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("aberto");
  });
}



/* ================================================================
   10. INICIALIZAÇÃO GLOBAL
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  iniciarCadastroONG();
  listarONGs();
  carregarDetalhesONG();
  iniciarDoacao();
  iniciarVoluntarios();
  carregarPainelAdmin();
  carregarResumoHome();
  iniciarMenuMobile();
});
