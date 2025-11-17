import { loadOngs } from "../storage/ongs.js";
import { saveDoacao } from "../storage/doacoes.js";

export function Doacao() {
    const select = document.querySelector("#ongSelect");
    const form = document.querySelector("#formDoacao");
    const msg = document.querySelector("#msgDoacao");
    if (!select) return;

    const ongs = loadOngs();
    select.innerHTML = ongs.map(o => `<option value="${o.id}">${o.nomeOng}</option>`).join("");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const valor = Number(document.querySelector("#valor").value);

        if (valor < 1) {
            msg.textContent = "Informe um valor válido.";
            msg.style.color = "red";
            return;
        }

        saveDoacao({
            id: Date.now(),
            ongId: select.value,
            valor
        });

        msg.textContent = "Doação registrada com sucesso!";
        msg.style.color = "green";

        form.reset();
    });
}
