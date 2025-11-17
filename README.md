PLATAFORMA DE ONGs – ENTREGA 3
=======================================

Aluno: Mateus Júnior  
Projeto: Plataforma de Cadastro e Apoio a ONGs  
Entrega: Etapa 3 – SPA, Modularização e Templates JavaScript


📌 RESUMO DA ENTREGA 3
---------------------------------------
Nesta entrega, o sistema foi evoluído de um site tradicional multi-página para uma
**SPA – Single Page Application**, utilizando JavaScript modular, templates dinâmicos,
roteamento no front-end e manipulação de dados via localStorage.

Todo o layout, estilos e identidade visual foram mantidos exatamente como na entrega 2.
A evolução ocorreu exclusivamente na arquitetura JavaScript e no comportamento dinâmico.


🎯 OBJETIVOS ATENDIDOS NA ENTREGA 3
---------------------------------------
✔ Transformar o sistema em uma SPA  
✔ Criar sistema de navegação sem recarregar página (Router JS)  
✔ Criar templates JavaScript para cada página  
✔ Modularizar completamente o projeto  
✔ Implementar manipulação de DOM via JS  
✔ Validar dados de formulários  
✔ Armazenar informações no localStorage de forma isolada  
✔ Manter todos os HTMLs e CSS originais  
✔ Criar código organizado, escalável e de fácil manutenção  


🏗 ARQUITETURA DA APLICAÇÃO (FINAL)
---------------------------------------

PLATAFORMA-ONGS/
│
├── index.html
├── cadastro.html
├── ongs.html
├── detalhe.html
├── doacao.html
├── voluntarios.html
├── institucional.html
├── admin.html
│
├── assets/
│   ├── css/
│   │   ├── components/
│   │   ├── core/
│   │   ├── layout/
│   │   ├── pages/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── router.js
│   │   │
│   │   ├── templates/
│   │   │      home.js
│   │   │      cadastro.js
│   │   │      ongs.js
│   │   │      detalhe.js
│   │   │      doacao.js
│   │   │      voluntarios.js
│   │   │      admin.js
│   │   │
│   │   ├── storage/
│   │   │      ongs.js
│   │   │      doacoes.js
│   │   │      voluntarios.js
│   │   │
│   │   └── validations/ (opcional)
│   │
│   └── img/ (opcional)
│
└── README.txt


🧠 CONCEITOS IMPLEMENTADOS
---------------------------------------

1. SPA – SINGLE PAGE APPLICATION  
O sistema agora funciona sem recarregar páginas.  
O router intercepta os cliques nos links e carrega a lógica JS da página correspondente.

2. ROUTER.JS  
Gerencia a navegação interna:
- Captura navegação nos menus
- Atualiza a URL usando History API
- Chama o template correspondente

3. TEMPLATES JAVASCRIPT  
Cada página HTML tem um arquivo JS com seu comportamento:
- Carregar dados do localStorage
- Atualizar o DOM
- Validar formulários
- Criar listagens dinâmicas

4. MODULARIZAÇÃO  
Todo o código foi separado em módulos:
- app.js → inicialização da SPA
- router.js → roteamento
- templates/ → comportamento de cada página
- storage/ → CRUD de localStorage
- validations/ → validações futuras

5. LOCALSTORAGE COMO BANCO DE DADOS  
O sistema salva:
- ONGs cadastradas
- Doações realizadas
- Voluntários registrados

Cada entidade possui módulo próprio, garantindo organização.

6. COMPATIBILIDADE TOTAL COM O CSS  
Nenhum arquivo de estilo foi modificado.
A estrutura HTML permanece idêntica à entrega anterior.


📊 FUNCIONALIDADES DISPONÍVEIS
---------------------------------------

✔ Cadastrar ONGs  
✔ Listar ONGs cadastradas  
✔ Página de detalhes da ONG  
✔ Registrar doações  
✔ Exibir total de doações na Home e Admin  
✔ Cadastrar voluntários  
✔ Dashboard administrativo  
✔ SPA completa sem reload  
✔ Interface responsiva e organizada


🧪 COMO TESTAR A APLICAÇÃO
---------------------------------------

1. Abra o index.html no navegador  
2. Use o menu superior para navegar entre as páginas  
3. Cadastre ONGs e veja elas aparecerem em:
   - ONGs
   - Detalhes
   - Admin
4. Faça uma doação e veja o total atualizar
5. Cadastre voluntários pelo formulário
6. Navegue sem recarregar a página (SPA ativa)


📦 DEPENDÊNCIAS
---------------------------------------
Este projeto não usa frameworks externos.
Tudo foi feito em:
- HTML5
- CSS3
- JavaScript ES Modules (import/export)
- localStorage


📘 CONCLUSÃO DA ENTREGA 3
---------------------------------------
A aplicação foi totalmente evoluída para um sistema mais profissional,
estável e escalável, mantendo todo o estilo visual original.

A arquitetura modular garante:
- melhor manutenção
- melhor organização
- reutilização de código
- separação de responsabilidades



