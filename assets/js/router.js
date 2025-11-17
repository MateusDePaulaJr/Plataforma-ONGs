import { Home } from "./templates/home.js";
import { Cadastro } from "./templates/cadastro.js";
import { Ongs } from "./templates/ongs.js";
import { Detalhe } from "./templates/detalhe.js";
import { Doacao } from "./templates/doacao.js";
import { Voluntarios } from "./templates/voluntarios.js";
import { Admin } from "./templates/admin.js";

export const router = {
    routes: {
        "": Home,
        "index.html": Home,
        "cadastro.html": Cadastro,
        "ongs.html": Ongs,
        "detalhe.html": Detalhe,
        "doacao.html": Doacao,
        "voluntarios.html": Voluntarios,
        "institucional.html": () => {}, // sem JS
        "admin.html": Admin
    },

    start() {
        this.loadPage();

        document.body.addEventListener("click", (e) => {
            if (e.target.tagName === "A" && e.target.getAttribute("href").endsWith(".html")) {
                e.preventDefault();
                const page = e.target.getAttribute("href");
                history.pushState({}, "", page);
                this.loadPage();
            }
        });

        window.onpopstate = () => this.loadPage();
    },

    loadPage() {
        const page = location.pathname.split("/").pop();
        const template = this.routes[page] || Home;
        template();
    }
};
