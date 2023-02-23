var dados = JSON.parse(localStorage.getItem("dados") || "[]");
const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector("main");
var data = new Date();
var horas = data.getHours();

console.log(horas);

window.addEventListener("load", function () {
  if (horas < 18) {
    html.classList.toggle("white-mode");
    body.classList.toggle("white-mode");
  }
});

main.innerHTML += dados.html;
body.innerHTML += "<script>" + dados.js + "</script>";
