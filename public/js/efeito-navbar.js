//Pegando a navbar
var header = document.getElementById("navbar");
var nav = document.getElementById("nav-header");
//Pegando o botão voltar ai top
//var btn = document.getElementById("btn-voltar-ao-topo");

//Quando o usuário rolar 20px do top do documento os efeitos acontecem
window.onscroll = function() {
    scrollFunctionNavbar();
    scrollFunctionBtnVoltarAoTopo();

};

function scrollFunctionNavbar() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {        
        header.style.border = "none";
        nav.style.padding = "10px 15px 10px 15px";

    } else { 
        header.style.border = "";
        nav.style.padding = "";
    }
}

// function scrollFunctionBtnVoltarAoTopo() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         btn.style.display = "block";
//     } else {
//         btn.style.display = "none";
//     }
// }

//Quando o usuário clicar no botão, a página irá rolar para o inicio
// function voltarAoTopo() {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }