var dados = JSON.parse(localStorage.getItem("dados") || "[]");
document.querySelector("#html_enter").innerHTML = dados.html || "";
document.querySelector("#js_enter").innerHTML = dados.js || "";
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
var data = new Date();
var horas = data.getHours();

console.log(horas);

window.addEventListener("load", function () {
  if (6 > horas > 18) {
    html.classList.toggle("white-mode");
    body.classList.toggle("white-mode");
  }
});

function criarHTML() {
  document.querySelector("body").style.cursor = "wait";
  let inputJS = document.querySelector("#js_enter").value;
  let inputHTML = document.querySelector("#html_enter").value;

  let dados = {
    html: inputHTML,
    js: inputJS,
  };

  localStorage.setItem("dados", JSON.stringify(dados));
  setTimeout(function () {
    window.location.href = "/index.html";
  }, 500);
}

let abaInfo = document.querySelector(".instrucoes");
let criarInfo = document.querySelector(".criarElemento");
let icone = document.querySelector(".icone");
var textos = document.querySelector(".textos");
let iconeCriar = document.querySelector(".iconeCriar");
var textosCriar = document.querySelector(".textosCriar");
var expandir = document.querySelector(".expandir");

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
    textosCriar.style.display = "none";
    html.classList.remove("expandirCriar");
    body.classList.remove("expandirCriar");
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

  copiarAlert.style.opacity = '1'

  setTimeout(function () {
    copiarAlert.style.opacity = '0';
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

  if (document.querySelector("#html_enter").value == "") {
    document.querySelector("#html_enter").value +=
      `<${Elemento} ${type}="${nomeTipo}">` + `${conteudo}` + `</${Elemento}>`;
  } else {
    document.querySelector("#html_enter").value +=
      `\n<${Elemento} ${type}="${nomeTipo}">` +
      `${conteudo}` +
      `</${Elemento}>`;
  }
});

function resetHTML() {
  document.querySelector("#html_enter").value = "";
}

function resetJS() {
  document.querySelector("#js_enter").value = "";
}
