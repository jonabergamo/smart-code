var dados = JSON.parse(localStorage.getItem("dados") || "[]");
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
document.title = "Smart Code - " + dados.name;
var data = new Date();
var horas = data.getHours();

document.body.style.setProperty(
  "--botao",
  dados.color || "linear-gradient(257.91deg,#9e38e1 17.54%,#e0386b 72.93%)"
);
document.body.style.setProperty("--fundo", "black");

main.innerHTML += dados.html;
eval(dados.js);

var btnVoltar = document.querySelector(".voltar");

function voltar() {
  window.location.href = "/index.html";
}
