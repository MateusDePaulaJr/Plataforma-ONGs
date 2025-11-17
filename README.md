PLATAFORMA DE ONGs – ENTREGA 3
=======================================

Aluno: Mateus Júnior  
Projeto: Plataforma de Cadastro e Apoio a ONGs  

🏗 ARQUITETURA DA APLICAÇÃO 
---------------------------------------
PLATAFORMA-ONGS

Arquivos HTML:
- index.html
- cadastro.html
- ongs.html
- detalhe.html
- doacao.html
- voluntarios.html
- institucional.html
- admin.html

Pasta assets/css/components:
- badges.css
- buttons.css
- cards.css
- feedback.css
- forms.css

Pasta assets/css/core:
- base.css
- variables.css

Pasta assets/css/layout:
- grid.css
- layout.css
- navbar.css

Pasta assets/css/pages:
- admin.css
- cadastro.css
- detalhe.css
- doacao.css
- home.css
- institucional.css
- ongs.css
- voluntarios.css

Arquivo de estilo geral:
- style.css

Pasta assets/js:
- app.js
- router.js

Pasta assets/js/templates:
- home.js
- cadastro.js
- ongs.js
- detalhe.js
- doacao.js
- voluntarios.js
- admin.js

Pasta assets/js/storage:
- ongs.js
- doacoes.js
- voluntarios.js

Pasta assets/js/validations (opcional):
- cadastroValidation.js
- doacaoValidation.js
- voluntarioValidation.js

Outros:

- README.md



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


📘 CONCLUSÃO DA ENTREGA 
---------------------------------------
A aplicação foi totalmente evoluída para um sistema mais profissional,
estável e escalável, mantendo todo o estilo visual original.

A arquitetura modular garante:
- melhor manutenção
- melhor organização
- reutilização de código
- separação de responsabilidades



