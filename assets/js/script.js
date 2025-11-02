document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  const mensagem = document.getElementById("mensagem");
  const listaContainer = document.getElementById("listaOngs");

  // ========== CADASTRO ==========
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nome = document.getElementById("nomeOng").value.trim();
      const area = document.getElementById("area").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const instagram = document.getElementById("instagram").value.trim();
      const banco = document.getElementById("banco").value.trim();
      const agencia = document.getElementById("agencia").value.trim();
      const conta = document.getElementById("conta").value.trim();

      if (!nome || !area || !descricao) {
        mensagem.textContent = "⚠️ Preencha todos os campos obrigatórios!";
        mensagem.style.color = "red";
        return;
      }

      const novaOng = { nome, area, descricao, instagram, banco, agencia, conta };

      let ongs = JSON.parse(localStorage.getItem("ongs")) || [];
      ongs.push(novaOng);
      localStorage.setItem("ongs", JSON.stringify(ongs));

      mensagem.textContent = "✅ ONG cadastrada com sucesso!";
      mensagem.style.color = "#00c9a7";
      mensagem.style.fontWeight = "bold";
      mensagem.style.opacity = "1";

      setTimeout(() => (mensagem.style.opacity = "0"), 4000);

      form.reset();
    });
  }

  // ========== LISTAGEM ==========
  if (listaContainer) {
    const ongs = JSON.parse(localStorage.getItem("ongs")) || [];

    if (ongs.length === 0) {
      listaContainer.innerHTML = "<p>Nenhuma ONG cadastrada ainda.</p>";
      return;
    }

    listaContainer.innerHTML = ""; // limpa antes de inserir

    ongs.forEach((ong) => {
      const card = document.createElement("div");
      card.classList.add("card-ong");

      card.innerHTML = `
        <h3>${ong.nome}</h3>
        <p><strong>Área:</strong> ${ong.area}</p>
        <p>${ong.descricao}</p>
        ${
          ong.instagram
            ? `<a href="https://www.instagram.com/${ong.instagram.replace(
                "@",
                ""
              )}" target="_blank" class="botao-atalho">Instagram</a>`
            : ""
        }
      `;

      listaContainer.appendChild(card);
    });
  }
});
