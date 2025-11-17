import { saveVoluntario } from "../storage/voluntarios.js";

export function Voluntarios() {
    const form = document.querySelector("#formVoluntario");
    const msg = document.querySelector("#msgVoluntario");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const dados = {
            nome: document.querySelector("#nomeVoluntario").value.trim(),
            email: document.querySelector("#emailVoluntario").value.trim(),
            telefone: document.querySelector("#telefoneVoluntario").value.trim(),
            interesse: document.querySelector("#interesse").value,
            mensagem: document.querySelector("#mensagemVoluntario").value.trim()
        };

        if (!dados.nome || !dados.email || !dados.interesse || !dados.mensagem) {
            msg.textContent = "Preencha todos os campos obrigatórios.";
            msg.style.color = "red";
            return;
        }

        dados.id = Date.now();
        saveVoluntario(dados);

        msg.textContent = "Inscrição enviada!";
        msg.style.color = "green";

        form.reset();
    });
}
