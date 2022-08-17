//Capturando os elementos do html para menu bolile 
const btnMobile = document.getElementById('btn-nav-mobile');
//Capturando os elementos do html para sub-menu bolile 
const subBtnMobile = document.getElementById('sub-btn-mobile-departamentos');

function mostraMenuMobile (event) {

    //Previne o comprtamento padrão (No mobile após o touch cancela o click)
    if(event.type === 'touchstart') {
        event.preventDefault();    
    }

    const navHeader = document.getElementById('nav-header'); 
    navHeader.classList.toggle('active');

    //Deixa mais acessivel informando que o botão vai expandir um conteúdo
    const active = navHeader.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);

    if(active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar menu.');

        //Muda o icon de hamburguer para X(close)
        document.getElementsByClassName("span-btn-open")[0].style.display = "none";
        document.getElementsByClassName("span-btn-close")[0].style.display = "block";
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir menu.');        

        //Muda o icon X(close) para hamburguer 
        document.getElementsByClassName("span-btn-open")[0].style.display = "block";
        document.getElementsByClassName("span-btn-close")[0].style.display = "none";
    }
}

function mostraSubMenuMobile (event) {

    //Previne o comprtamento padrão (No mobile após o touch cancela o click)
    if(event.type === 'touchstart') {
        event.preventDefault();    
    }

    const liSubMenuMobile = document.getElementById('li-sub-menu-mobile'); 
    liSubMenuMobile.classList.toggle('active');

    //Deixa mais acessivel informando que o botão vai expandir um conteúdo
    const active = liSubMenuMobile.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);

    if(active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar menu.');

        //Muda o icon seta so sib-menu
        document.getElementsByClassName("span-departamentos-seta-cima")[0].style.display = "block";
        document.getElementsByClassName("span-departamentos-seta-baixo")[0].style.display = "none";
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir menu.');        

        //Muda o icon seta so sib-menu
        document.getElementsByClassName("span-departamentos-seta-cima")[0].style.display = "none";
        document.getElementsByClassName("span-departamentos-seta-baixo")[0].style.display = "block";
    }
}

//Colocando ação de abrir e fechar o menu mobile no btn hamburguer
btnMobile.addEventListener('click', mostraMenuMobile);

//Melhora a fluidez no mobobile
btnMobile.addEventListener('touchstart', mostraMenuMobile);

//Colocando ação de abrir e fechar o sub-menu mobile no link departamentos
subBtnMobile.addEventListener('click', mostraSubMenuMobile);

//Melhora a fluidez no mobobile
subBtnMobile.addEventListener('touchstart', mostraSubMenuMobile);

