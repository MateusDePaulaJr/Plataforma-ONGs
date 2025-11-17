import { loadOngs } from "../storage/ongs.js";
import { loadDoacoes } from "../storage/doacoes.js";

export function Home() {
    const ongs = loadOngs();
    const doacoes = loadDoacoes();

    const total = doacoes.reduce((s, d) => s + Number(d.valor), 0);

    document.querySelector("#totalOngsHome").textContent = ongs.length;
    document.querySelector("#totalDoacoesHome").textContent = total.toFixed(2);
}
