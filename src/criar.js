var dados = JSON.parse(localStorage.getItem("dados") || "[]");
var saves = JSON.parse(localStorage.getItem("saves") || "[]");
document.querySelector("#projectTitle").value =
  dados.name || "Project Undefined";
document.title =
  "Smart Code - " + document.querySelector("#projectTitle").value;

var editorHTML = CodeMirror.fromTextArea(
  document.getElementById("html_enter"),
  {
    mode: "xml",
    lineWrapping: true,
    theme: "dracula",
    scrollbarStyle: "null",
    autoCloseTags: true,
    lineNumbers: true,
  }
);

var editorJS = CodeMirror.fromTextArea(document.getElementById("js_enter"), {
  mode: "javascript",
  theme: "dracula",
  lineWrapping: true,
  scrollbarStyle: "null",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
});


window.addEventListener("load", function () {
  setTimeout(loadCode, 100);
});

function loadCode() {
editorHTML.getDoc().setValue(dados.html || "");
editorJS.getDoc().setValue(dados.js || "");
}

if (isEmpty(dados)) {
  document.body.style.setProperty(
    "--botao",
    "linear-gradient(257.91deg, #9e38e1 17.54%, #e0386b 72.93%)"
  );
  document.body.style.setProperty("--fundo", "black");
  var corFundo = "black";
} else {
  document.body.style.setProperty("--botao", dados.color[0]);
  document.body.style.setProperty("--fundo", dados.color[1]);
  var corFundo = dados.color[1];
}
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
var data = new Date();
var horas = data.getHours();

for (let i = 0; i != saves.length; i++) {
  let ulContainer = document.querySelector("#ulContainer");
  ulContainer.innerHTML +=
    `<div id="${i}" title="Última alteração: ${saves[i].createdAt}">` +
    saves[i].name +
    "</div>";
}

function criarHTML() {
  document.querySelector("body").style.cursor = "wait";
  let inputJS = editorJS.getValue();
  let inputHTML = editorHTML.getValue();
  let saveName = document.querySelector("#projectTitle").value;
  let corAtual = document.body.style.getPropertyValue("--botao");
  let corAtualFundo = document.body.style.getPropertyValue("--fundo");

  let dados = {
    html: inputHTML,
    js: inputJS,
    name: saveName,
    color: [
      corAtual || "linear-gradient(257.91deg, #9e38e1 17.54%, #e0386b 72.93%)",
      corAtualFundo || "black",
    ],
  };

  localStorage.setItem("dados", JSON.stringify(dados));

  window.location.href = "/page02.html";
}

var abaInfo = document.querySelector(".instrucoes");
var criarInfo = document.querySelector(".criarElemento");
var icone = document.querySelector(".icone");
var textos = document.querySelector(".textos");
var iconeCriar = document.querySelector(".iconeCriar");
var textosCriar = document.querySelector(".textosCriar");
var expandir = document.querySelector(".expandir");
var cardTela = document.querySelector(".cardTela");
var smartCodeLogo = document.querySelector("#smartCodeLogo");

abaInfo.addEventListener("click", function (e) {
  e.stopPropagation();
  setTimeout(function () {
    textos.style.display = "flex";
  }, 150);

  html.classList.add("expandir");
  body.classList.add("expandir");
});

body.addEventListener("click", function (e) {
  if (textos.style.display == "flex") {
    textos.style.display = "none";
    html.classList.remove("expandir");
    body.classList.remove("expandir");
  }
  if (textosCriar.style.display == "flex") {
    let copiarAlert = document.querySelector("#copiadoAlert");

    copiarAlert.style.opacity = "0";
    textosCriar.style.display = "none";
    html.classList.remove("expandirCriar");
    body.classList.remove("expandirCriar");
  }
  if (cardTela.style.display == "flex") {
    cardTela.style.display = "none";
  }
  if (cardEditar.style.display == "flex") {
    cardEditar.style.display = "none";
  }

});

criarInfo.addEventListener("click", function (e) {
  e.stopPropagation();
  setTimeout(function () {
    textosCriar.style.display = "flex";
  }, 150);

  html.classList.add("expandirCriar");
  body.classList.add("expandirCriar");
});

var btnCriar = document.querySelector("#btnCriar");
var btnCopiar = document.querySelector("#btnCopiar");

btnCopiar.addEventListener("click", function () {
  let selectElement = document.getElementById("selectElement");
  let Elemento = selectElement.options[selectElement.selectedIndex].value;
  let selectType = document.getElementById("selectAtribute");
  let type = selectType.options[selectType.selectedIndex].value;
  let nomeTipo = document.querySelector("#nomeTipo").value;
  let conteudo = document.querySelector("#content").value;
  let copiarAlert = document.querySelector("#copiadoAlert");

  copiarAlert.style.opacity = "1";

  setTimeout(function () {
    copiarAlert.style.opacity = "0";
  }, 2000);
  navigator.clipboard.writeText(
    `<${Elemento} ${type}="${nomeTipo}">` + `${conteudo}` + `</${Elemento}>`
  );
});

btnCriar.addEventListener("click", function () {
  let selectElement = document.getElementById("selectElement");
  let Elemento = selectElement.options[selectElement.selectedIndex].value;
  let selectType = document.getElementById("selectAtribute");
  let type = selectType.options[selectType.selectedIndex].value;
  let nomeTipo = document.querySelector("#nomeTipo").value;
  let conteudo = document.querySelector("#content").value;

  if (editorHTML.getValue() == "") {
    editorHTML
      .getDoc()
      .setValue(
        `<${Elemento} ${type}="${nomeTipo}">` + `${conteudo}` + `</${Elemento}>`
      );
  } else {
    let valorAtual = editorHTML.getValue();
    let novoValor =
      valorAtual +
      `\n<${Elemento} ${type}="${nomeTipo}">` +
      `${conteudo}` +
      `</${Elemento}>`;
    editorHTML.getDoc().setValue(novoValor);
  }
});

var btnSalvar = document.querySelector("#btnSalvar");

btnSalvar.addEventListener("click", function () {
  let projectTitle = document.querySelector("#projectTitle");
  setTimeout(function () {
    cardTela.style.display = "flex";
  }, 150);
});


setInterval(autoSave, 2000);



function autoSave() {
    let projectTitle = document.querySelector("#projectTitle");
    let texto_html = editorHTML.getValue();
    let texto_js = editorJS.getValue();
    let ulContainer = document.querySelector("#ulContainer");
  let saveName = document.querySelector("#saveName").value;
    let dia = data.toLocaleDateString();
    let horario = data.toLocaleTimeString();
    let createdAt = dia + " " + horario;
    let corAtual = document.body.style.getPropertyValue("--botao");
    let corAtualFundo = document.body.style.getPropertyValue("--fundo");
  
    if (saves.find((c) => c.name == projectTitle)) {
      let id = saves.find((c) => c.name == projectTitle).id;
      saves[id].html = editorHTML.getValue();
      saves[id].js = editorJS.getValue();
      saves[id].createdAt = createdAt;
  
      let dados = {
        html: texto_html,
        js: texto_js,
        name: saveName,
        color: [corAtual, corAtualFundo],
      };
  
      localStorage.setItem("dados", JSON.stringify(dados));
      localStorage.setItem("saves", JSON.stringify(saves));
  }
}

cardTela.addEventListener("click", function (e) {
  e.stopPropagation();
});

var numID = 0;
for (let i = 0; i < saves.length; i++) {
  if (saves[i].id + 1 > numID) {
    numID = saves[i].id + 1;
  }
}

function confirmaSave() {
  cardTela.style.display = "none";
  let texto_html = editorHTML.getValue();
  let texto_js = editorJS.getValue();
  let ulContainer = document.querySelector("#ulContainer");
  let saveName = document.querySelector("#saveName").value;
  let dia = data.toLocaleDateString();
  let horario = data.toLocaleTimeString();
  let createdAt = dia + " " + horario;
  let corAtual = document.body.style.getPropertyValue("--botao");
  let corAtualFundo = document.body.style.getPropertyValue("--fundo");

  if (saves.find((c) => c.name == saveName)) {
    let id = saves.find((c) => c.name == saveName).id;
    saves[id].html = editorHTML.getValue();
    saves[id].js = editorJS.getValue();
    saves[id].createdAt = createdAt;

    let dados = {
      html: texto_html,
      js: texto_js,
      name: saveName,
      color: [corAtual, corAtualFundo],
    };

    localStorage.setItem("dados", JSON.stringify(dados));
    localStorage.setItem("saves", JSON.stringify(saves));
  } else {
    let save = {
      id: numID++,
      name: saveName,
      html: texto_html,
      js: texto_js,
      createdAt: createdAt,
      color: [corAtual, corAtualFundo],
    };

    let dados = {
      html: texto_html,
      js: texto_js,
      name: saveName,
      color: [corAtual, corAtualFundo],
    };
    localStorage.setItem("dados", JSON.stringify(dados));

    saves.push(save);
    ulContainer.innerHTML +=
      `<ul id="${numID}" title="Última alteração: ${createdAt}">` +
      saveName +
      "</ul>";
    localStorage.setItem("saves", JSON.stringify(saves));
    location.reload();
  }
}

ulContainer.addEventListener("click", function (e) {
  let id = e.target.id;
  editorHTML.getDoc().setValue(saves[id].html);
  editorJS.getDoc().setValue(saves[id].js);
  document.querySelector("#projectTitle").value = saves[id].name;
  document.title = "Smart Code - " + saves[id].name;
  //document.body.style.setProperty("--botao", `${saves[id].color}`);
});

var btnDownload = document.querySelector("#btnDownload");
btnDownload.addEventListener("click", function () {
  let dia = data.toLocaleDateString();
  let blob = new Blob([JSON.stringify(saves)], {
    type: "application/env;charset=utf-8",
  });
  saveAs(blob, `smartCodeSave ${dia}`);
});

const inputFile = document.querySelector("#inputFile");

inputFile.addEventListener("change", function () {
  let leitor = new FileReader();

  leitor.readAsText(inputFile.files[0]);

  leitor.onload = function () {
    saves = JSON.parse(leitor.result);
    for (let i = 0; i != saves.length; i++) {
      let ulContainer = document.querySelector("#ulContainer");

      ulContainer.innerHTML +=
        `<div id="${i}" title="Última alteração: ${saves[i].createdAt}">` +
        saves[i].name +
        "</div>";
      editorHTML.getDoc().setValue(saves[i].html);
      editorJS.getDoc().setValue(saves[i].js);
      document.querySelector("#projectTitle").value = saves[i].name;
    }
    localStorage.setItem("saves", JSON.stringify(saves));
    console.log(saves);
  };
});

const btnEditar = document.querySelector("#btnEditar");
var cardEditar = document.querySelector(".cardEditar");

btnEditar.addEventListener("click", () => {
  let projectTitle = document.querySelector("#projectTitle").value;
  document.querySelector("#newSaveName").value = projectTitle;
  setTimeout(function () {
    cardEditar.style.display = "flex";
  }, 150);
});

cardEditar.addEventListener("click", function (e) {
  e.stopPropagation();
});

function confirmaEdit() {
  let oldName = document.querySelector("#projectTitle").value;
  let dia = data.toLocaleDateString();
  let horario = data.toLocaleTimeString();
  let createdAt = dia + " " + horario;
  let corAtual = document.body.style.getPropertyValue("--botao");
  let corAtualFundo = document.body.style.getPropertyValue("--fundo");

  console.log(oldName);
  let saveSelected = saves.find((c) => c.name === oldName).id;
  console.log(saveSelected);
  var newSaveName = document.querySelector("#newSaveName").value;
  console.log(newSaveName);
  saves[saveSelected].name = newSaveName;
  saves[saveSelected].createdAt = createdAt;
  saves[saveSelected].color = [corAtual, corAtualFundo];
  console.log(saves[saveSelected]);
  localStorage.setItem("saves", JSON.stringify(saves));
  cardEditar.style.display = "none";
  dados.html = saves[saveSelected].html;
  dados.js = saves[saveSelected].js;
  dados.name = newSaveName;
  dados.color = [corAtual, corAtualFundo];
  localStorage.setItem("dados", JSON.stringify(dados));
  location.reload();
}

var newSaves = [];
var newId = 0;

function delSave() {
  let titulo = document.querySelector("#projectTitle").value;

  console.log(saves.find((c) => c.name == titulo).name === titulo);
  if (saves.find((c) => c.name == titulo).name === titulo) {
    let idDel = saves.find((c) => c.name === titulo).id;
    console.log(idDel);
    for (i = 0; i < saves.length; i++) {
      if (i != idDel) {
        var newSave = {
          id: newId,
          name: saves[i].name,
          html: saves[i].html,
          js: saves[i].js,
          createdAt: saves[i].createdAt,
          color: [
            "linear-gradient(257.91deg,#9e38e1 17.54%,#e0386b 72.93%)",
            "black",
          ],
        };
        newId++;
        newSaves.push(newSave);
      }
    }
    saves = newSaves;
    console.log(saves);
  }

  cardEditar.style.display = "none";
  localStorage.setItem("saves", JSON.stringify(saves));
  location.reload();
}

function alterarCor() {
  let randomColor1 = ((Math.random() * 0xffffff) << 0)
    .toString(16)
    .padStart(6, "0");
  let randomColor2 = ((Math.random() * 0xffffff) << 0)
    .toString(16)
    .padStart(6, "0");
  console.log(`#${randomColor1} 0% , #${randomColor2} 100%`);
  document.body.style.setProperty(
    "--botao",
    `linear-gradient(to right, #${randomColor1}, #${randomColor2})`
  );
}
function setarCor(cor) {
  document.body.style.setProperty(
    "--botao",
    `linear-gradient(to right, ${cor})`
  );
}


function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

var items = document.querySelectorAll('.menuItem');

for(var i = 0, l = items.length; i < l; i++) {
  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  
  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
}

let center = document.querySelector('.center')
center.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.circle').classList.toggle('open');
})