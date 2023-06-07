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
    requestApi();
}

// API

// https://rapidapi.com/SAdrian/api/moviesdatabase

const requestApi = async () => {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=most_pop_movies';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d22f61055msh339bba6dd0edd70p10eb88jsn9d4271618ebc',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        // const img = document.createElement("img");
        // img.src = result.results[0].primaryImage.url;
        // document.body.appendChild(img);

    } catch (error) {
        console.error(error);
    }
}