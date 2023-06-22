// Abrir o modal How To Play

const clickBottunHowToPlay = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline";
}

// Fechar o modal How To Play

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none";
}

// Mudança de tela 

const clickBottunPlay = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline-grid";
}

// Abrir tela de filmes

const clickBottunHowOpenMovie = () => {
    window.location.href = "gameMovie.html";
}

// Abrir tela de séries

const clickBottunHowOpenSerie = () => {
    window.location.href = "gameSerie.html";
}