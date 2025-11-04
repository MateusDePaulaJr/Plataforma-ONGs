
// script principal - salva e carrega dados no localStorage
document.addEventListener("DOMContentLoaded", function () {

  // máscaras simples
  function aplicarMascaraCPF(campo){
    if(!campo) return;
    campo.addEventListener("input", function(){
      let v = campo.value.replace(/\D/g,"");
      v = v.replace(/(\d{3})(\d)/,"$1.$2");
      v = v.replace(/(\d{3})(\d)/,"$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
      campo.value = v;
    });
  }
  function aplicarMascaraCEP(campo){
    if(!campo) return;
    campo.addEventListener("input", function(){
      let v = campo.value.replace(/\D/g,"");
      v = v.replace(/(\d{5})(\d)/,"$1-$2");
      campo.value = v;
    });
  }
  aplicarMascaraCPF(document.getElementById("cpf"));
  aplicarMascaraCEP(document.getElementById("cep"));

  // helpers de armazenamento
  const getOngs = () => JSON.parse(localStorage.getItem("ongs")) || [];
  const setOngs = (ongs) => localStorage.setItem("ongs", JSON.stringify(ongs));
  const getDoacoes = () => JSON.parse(localStorage.getItem("doacoes")) || [];
  const setDoacoes = (ds) => localStorage.setItem("doacoes", JSON.stringify(ds));
  const getVoluntarios = () => JSON.parse(localStorage.getItem("voluntarios")) || [];
  const setVoluntarios = (vs) => localStorage.setItem("voluntarios", JSON.stringify(vs));

  function calcularTotais(){
    const ongs = getOngs();
    const totalOngs = ongs.length;
    const totalDoacoes = ongs.reduce((s,o)=> s + (Number(o.arrecadado)||0), 0);
    return { totalOngs, totalDoacoes };
  }

  // cadastro de ONG - pega dados e salva
  const formCadastro = document.getElementById("formCadastro");
  const mensagem = document.getElementById("mensagem");
  if(formCadastro){
    function validar(campos){
      for(const c of campos){ if(!c.valor || c.valor.trim()==="") return "Preencha o campo: " + c.nome; }
      return null;
    }
    formCadastro.addEventListener("submit", function(e){
      e.preventDefault();
      const nome = document.getElementById("nomeOng").value.trim();
      const area = document.getElementById("area").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const instagram = document.getElementById("instagram").value.trim();
      const banco = document.getElementById("banco").value.trim();
      const agencia = document.getElementById("agencia").value.trim();
      const conta = document.getElementById("conta").value.trim();
      const meta = (document.getElementById("meta")||{}).value?.trim();
      const fotos = document.getElementById("foto").files;

      const erro = validar([
        {nome:"Nome da ONG", valor:nome},
        {nome:"Área de atuação", valor:area},
        {nome:"Descrição", valor:descricao},
        {nome:"Meta de arrecadação", valor:meta}
      ]);
      if(erro){ mensagem.textContent = erro; mensagem.style.color="red"; return; }

      const reader = new FileReader();
      reader.onload = function(){
        const nova = {
          nome, area, descricao, instagram, banco, agencia, conta,
          meta: Number(meta), arrecadado: 0, foto: reader.result || null
        };
        const ongs = getOngs(); ongs.push(nova); setOngs(ongs);
        mensagem.textContent = "ONG cadastrada com sucesso.";
        mensagem.style.color = "#057a6e";
        formCadastro.reset();
        atualizarResumoHome();
        atualizarPainelAdmin();
      };
      if(fotos && fotos.length>0) reader.readAsDataURL(fotos[0]); else reader.onload();
    });
  }

  // listagem de ONGs - cria cards
  const listaContainer = document.getElementById("listaOngs");
  function exibirOngs(){
    if(!listaContainer) return;
    const ongs = getOngs();
    listaContainer.innerHTML = "";
    if(ongs.length===0){ listaContainer.innerHTML = "<p>Nenhuma ONG cadastrada ainda.</p>"; return; }
    ongs.forEach((ong,i)=>{
      const perc = ong.meta>0 ? ((ong.arrecadado/ong.meta)*100).toFixed(1) : "0";
      const card = document.createElement("div");
      card.className = "card-ong";
      card.innerHTML = `
        ${ong.foto ? `<img src="${ong.foto}" class="foto-ong" alt="Logo da ONG">` : ""}
        <h3>${ong.nome}</h3>
        <p><strong>Área:</strong> ${ong.area}</p>
        <p>${ong.descricao}</p>
        <p><strong>Meta:</strong> R$ ${ong.meta.toFixed(2)}</p>
        <p><strong>Arrecadado:</strong> R$ ${ong.arrecadado.toFixed(2)} (${perc}%)</p>
        <progress value="${ong.arrecadado}" max="${ong.meta}"></progress>
        <div class="acoes">
          ${ong.instagram ? `<a href="https://instagram.com/${ong.instagram.replace('@','')}" target="_blank" class="botao">Instagram</a>` : ""}
          <a href="doacao.html?ong=${encodeURIComponent(ong.nome)}" class="botao secundario">Doar</a>
        </div>
      `;
      listaContainer.appendChild(card);
    });
  }
  if(listaContainer) exibirOngs();

  // doações - registra e atualiza
  const formDoacao = document.getElementById("formDoacao");
  if(formDoacao){
    const selectOng = document.getElementById("ongSelect");
    const ongs = getOngs();
    ongs.forEach((o,i)=>{
      const op = document.createElement("option");
      op.value = i; op.textContent = o.nome; selectOng.appendChild(op);
    });
    const params = new URLSearchParams(window.location.search);
    const ongNome = params.get("ong");
    if(ongNome){
      const idx = ongs.findIndex(o => o.nome === ongNome);
      if(idx>=0) selectOng.value = String(idx);
    }
    formDoacao.addEventListener("submit", function(e){
      e.preventDefault();
      const idx = Number(selectOng.value);
      const valor = Number(document.getElementById("valor").value);
      const nome = document.getElementById("nomeDoador").value.trim();
      const msg = document.getElementById("msgDoacao");
      if(!valor || valor<=0){ msg.textContent="Informe um valor válido."; msg.style.color="red"; return; }
      const todas = getOngs();
      todas[idx].arrecadado += valor; setOngs(todas);
      const ds = getDoacoes();
      ds.push({data:new Date().toISOString(), ong:todas[idx].nome, valor, doador:nome||"Anônimo"});
      setDoacoes(ds);
      msg.textContent = "Doação registrada com sucesso.";
      msg.style.color = "#057a6e";
      formDoacao.reset();
      atualizarResumoHome();
      atualizarPainelAdmin();
      if(listaContainer) exibirOngs();
    });
  }

  // voluntários - salva cadastro simples
  const formVol = document.getElementById("formVoluntario");
  if(formVol){
    formVol.addEventListener("submit", function(e){
      e.preventDefault();
      const v = {
        nome: (document.getElementById("nomeVoluntario")||{}).value || "",
        email: (document.getElementById("emailVoluntario")||{}).value || "",
        telefone: (document.getElementById("telefoneVoluntario")||{}).value || "",
        interesse: (document.getElementById("interesse")||{}).value || "",
        mensagem: (document.getElementById("mensagemVoluntario")||{}).value || "",
        data: new Date().toISOString()
      };
      const vs = getVoluntarios(); vs.push(v); setVoluntarios(vs);
      const msg = document.getElementById("msgVoluntario");
      if(msg){ msg.textContent = "Inscrição enviada."; msg.style.color="#057a6e"; }
      formVol.reset();
      atualizarPainelAdmin();
    });
  }

  // atualiza contadores na home
  function atualizarResumoHome(){
    const elO = document.getElementById("totalOngsHome");
    const elD = document.getElementById("totalDoacoesHome");
    if(!elO && !elD) return;
    const { totalOngs, totalDoacoes } = calcularTotais();
    if(elO) elO.textContent = totalOngs;
    if(elD) elD.textContent = totalDoacoes.toFixed(2);
  }
  atualizarResumoHome();

  // painel admin - mostra totais e listas
  function atualizarPainelAdmin(){
    const elO = document.getElementById("totalOngs");
    const elD = document.getElementById("totalDoacoes");
    const listaDoacoes = document.getElementById("listaDoacoes");
    const listaVol = document.getElementById("listaVoluntarios");
    if(!elO && !elD && !listaDoacoes && !listaVol) return;
    const { totalOngs, totalDoacoes } = calcularTotais();
    if(elO) elO.textContent = totalOngs;
    if(elD) elD.textContent = totalDoacoes.toFixed(2);
    if(listaDoacoes){
      const ds = getDoacoes().slice().reverse();
      listaDoacoes.innerHTML = ds.length ? ds.map(d => 
        `<p>${new Date(d.data).toLocaleString()} — <strong>${d.ong}</strong> — R$ ${Number(d.valor).toFixed(2)} — ${d.doador}</p>`
      ).join("") : "<p>Nenhuma doação registrada.</p>";
    }
    if(listaVol){
      const vs = getVoluntarios().slice().reverse();
      listaVol.innerHTML = vs.length ? vs.map(v => 
        `<p><strong>${v.nome}</strong> — ${v.email} — ${v.telefone} — ${v.interesse}</p>`
      ).join("") : "<p>Nenhum voluntário cadastrado.</p>";
    }
  }
  atualizarPainelAdmin();
});
