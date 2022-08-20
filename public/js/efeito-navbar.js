//Pegando a navbar
var header = document.getElementById("navbar");
var nav = document.getElementById("nav-header");
var imgCarrinho = document.getElementById("img-carrinho");
var imgBtnMenuNav = document.getElementsByClassName("imgBtnMenuNav");
//Pegando o botão voltar ai top
var btnVoltarTopo = document.getElementById("btn-voltar-ao-topo");

//Quando o usuário rolar 20px do top do documento os efeitos acontecem
window.onscroll = function() {
    scrollFunctionNavbar();
    scrollFunctionBtnVoltarAoTopo();
};

function scrollFunctionNavbar() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {        
        imgCarrinho.style.fontSize = "2.5rem";
        header.style.borderBottom = "5px solid #FF914D";
        for(let i = 0; i < imgBtnMenuNav.length; i ++) {
            imgBtnMenuNav[i].style.fontSize = "2rem";
        }
    } else {   
        imgCarrinho.style.fontSize = "3.75rem";
        header.style.borderBottom = "5px solid #fff";
        for(let i = 0; i < imgBtnMenuNav.length; i ++) {
            imgBtnMenuNav[i].style.fontSize = "3.125rem";
        }        
    }
}

function scrollFunctionBtnVoltarAoTopo() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        btnVoltarTopo.style.display = "block";
    } else {
        btnVoltarTopo.style.display = "none";
    }
}