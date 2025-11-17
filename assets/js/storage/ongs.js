export function loadOngs() {
    return JSON.parse(localStorage.getItem("ongs")) || [];
}

export function saveOng(ong) {
    const lista = loadOngs();
    lista.push(ong);
    localStorage.setItem("ongs", JSON.stringify(lista));
}
