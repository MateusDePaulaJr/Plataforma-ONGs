import { loadOngs } from "../storage/ongs.js";
import { loadDoacoes } from "../storage/doacoes.js";
import { loadVoluntarios } from "../storage/voluntarios.js";

export function Admin() {
    const totalOngs = document.querySelector("#totalOngs");
    const totalDoacoes = document.querySelector("#totalDoacoes");
    const listaDoacoes = document.querySelector("#listaDoacoes");
    const listaVol = document.querySelector("#listaVoluntarios");

    if (!totalOngs) return;

    const ongs = loadOngs();
    const doacoes = loadDoacoes();
    const voluntarios = loadVoluntarios();

    totalOngs.textContent = ongs.length;

    const soma = doacoes.reduce((t, d) => t + Number(d.valor), 0);
    totalDoacoes.textContent = soma.toFixed(2);

    listaDoacoes.innerHTML = doacoes.length
        ? doacoes.map(d => `<p>R$ ${d.valor} → ONG ID: ${d.ongId}</p>`).join("")
        : "<p>Nenhuma doação registrada.</p>";

    listaVol.innerHTML = voluntarios.length
        ? voluntarios.map(v => `<p>${v.nome} — ${v.interesse}</p>`).join("")
        : "<p>Nenhum voluntário cadastrado.</p>";
}
