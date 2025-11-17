export function loadVoluntarios() {
    return JSON.parse(localStorage.getItem("voluntarios")) || [];
}

export function saveVoluntario(vol) {
    const lista = loadVoluntarios();
    lista.push(vol);
    localStorage.setItem("voluntarios", JSON.stringify(lista));
}
