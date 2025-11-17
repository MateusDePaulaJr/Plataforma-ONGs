import { saveOng } from "../storage/ongs.js";

export function Cadastro() {
    const form = document.querySelector("#formCadastro");
    const msg = document.querySelector("#mensagem");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const dados = Object.fromEntries(new FormData(form));

        // Validação simples
        for (let key in dados) {
            if (dados[key].trim() === "") {
                msg.textContent = "Preencha todos os campos obrigatórios.";
                msg.style.color = "red";
                return;
            }
        }

        dados.id = Date.now();

        saveOng(dados);

        msg.textContent = "ONG cadastrada com sucesso!";
        msg.style.color = "green";

        form.reset();
    });
}
