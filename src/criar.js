var dados = JSON.parse(localStorage.getItem("dados") || "[]");
document.querySelector("#html_enter").innerHTML = dados.html || "";
document.querySelector("#js_enter").innerHTML = dados.js || "";
const html = document.querySelector("html");
const body = document.querySelector("body");
var data = new Date();
var horas = data.getHours();

console.log(horas);

window.addEventListener("load", function () {
  if (horas < 18) {
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

let aba = document.querySelector(".instrucoes");
let icone = document.querySelector(".icone");
var textos = document.querySelector(".textos");

aba.addEventListener("click", function () {
  if (textos.style.display == 'flex') {
    textos.style.display = 'none';
  } else {
    setTimeout(function () {
      textos.style.display = 'flex';
    }, 150);
  }

  html.classList.toggle("expandir");
  body.classList.toggle("expandir");
});

