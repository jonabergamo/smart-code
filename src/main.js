var dados = JSON.parse(localStorage.getItem("dados") || "[]");
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
var data = new Date();
var horas = data.getHours();

window.addEventListener("load", function () {
  if (6 > horas > 18) {
    html.classList.toggle("white-mode");
    body.classList.toggle("white-mode");
  }
});

main.innerHTML += dados.html;
eval(dados.js)

var btnVoltar = document.querySelector(".voltar");

function voltar() {
  window.location.href = "/index.html";
}