//Capturando os elementos do html
const btnMobile = document.getElementById('btn-nav-mobile'); 

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

//Colocando ação de abrir e fechar o menu mobile no btn hamburguer
btnMobile.addEventListener('click', mostraMenuMobile);

//Melhora a fluidez no mobobile
btnMobile.addEventListener('touchstart', mostraMenuMobile);