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

const clickBottunPlay = () => {
    window.location.href = "game.html";
}
