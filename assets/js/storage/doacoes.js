export function loadDoacoes() {
    return JSON.parse(localStorage.getItem("doacoes")) || [];
}

export function saveDoacao(doacao) {
    const lista = loadDoacoes();
    lista.push(doacao);
    localStorage.setItem("doacoes", JSON.stringify(lista));
}
