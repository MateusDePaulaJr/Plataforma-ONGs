import { loadOngs } from "../storage/ongs.js";

export function Detalhe() {
    const c = document.querySelector("#detalheContainer");
    if (!c) return;

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id"));

    const ongs = loadOngs();
    const ong = ongs.find(o => o.id === id);

    if (!ong) {
        c.innerHTML = "<p>ONG não encontrada.</p>";
        return;
    }

    c.innerHTML = `
        <div class="card">
            <h3>${ong.nomeOng}</h3>
            <p><strong>Área:</strong> ${ong.area}</p>
            <p><strong>Descrição:</strong> ${ong.descricao}</p>
            <p><strong>Cidade:</strong> ${ong.cidade} - ${ong.estado}</p>
            <p><strong>Contato:</strong> ${ong.email}</p>
            <p><strong>Meta:</strong> R$ ${ong.meta}</p>
        </div>
    `;
}
