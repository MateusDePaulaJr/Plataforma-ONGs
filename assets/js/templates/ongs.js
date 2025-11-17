import { loadOngs } from "../storage/ongs.js";

export function Ongs() {
    const container = document.querySelector("#listaOngs");
    if (!container) return;

    const ongs = loadOngs();

    if (ongs.length === 0) {
        container.innerHTML = "<p>Nenhuma ONG cadastrada ainda.</p>";
        return;
    }

    container.innerHTML = ongs.map(o => `
        <div class="item-ong card">
            <h3>${o.nomeOng}</h3>
            <p>${o.area}</p>
            <button onclick="location.href='detalhe.html?id=${o.id}'" class="botao">
                Ver detalhes
            </button>
        </div>
    `).join("");
}
