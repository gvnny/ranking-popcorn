let movieTitle;
let movieUrl;
let save = {}; 

let movies = {'S': [], 'A': [], 'B': [], 'C': []}

// abrir formulário

const clickBottunSave = (idModal) => {
    const modalSave = document.querySelector(idModal);
    modalSave.style.display = "block";

    const inputSaveDate = document.getElementById("inputSaveDate");
    const dateNow = new Date();

    inputSaveDate.valueAsDate = new Date();
}


const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none";
}

// salvar

const clickBottunModalSave = () => {
    const name = document.getElementById("inputSaveName").value;
    const date = document.getElementById("inputSaveDate").value;
    const saves = JSON.parse(window.localStorage.getItem('saves')) || {};

    if (saves[name]) {
        // FIXME: tratar erro
        console.error('save com nome', name, 'ja existe');
    
    } else {
        saves[name] = {
            date: date,
            movies: movies
        }

        window.localStorage.setItem('saves', JSON.stringify(saves));
        window.location.href = "home.html";
    }
}

window.onload = async function() {

// API

// https://rapidapi.com/SAdrian/api/moviesdatabase

const requestApi = async () => {
    const img = document.querySelector('.containerController img');
    img.draggable = false;
    img.src ="images/loading.gif";

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4d22f61055msh339bba6dd0edd70p10eb88jsn9d4271618ebc',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    let url;
    if (document.location.search == '?type=movies') {
        url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=most_pop_movies&limit=1';
    } else if (document.location.search == '?type=series') {
        url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=top_rated_series_250&limit=1';
    } else {
        console.error('unknow game type');
        return;
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if(result.results[0].primaryImage == null) {
            await requestApi();
            return;
        }

        endGame();

        img.src = result.results[0].primaryImage.url;
        movieUrl = result.results[0].primaryImage.url;
        movieTitle = result.results[0].originalTitleText.text;
        img.classList.add("img");

        const subtitle = document.querySelector(".title");
        subtitle.innerHTML = result.results[0].titleText.text;

        img.draggable = true;

    } catch (error) {
        console.error(error);
    }
}

// mostrar e desaparecer uma legenda com o nome do filme ao repousar o mouse em cima da imagem

const mouseOverMouseOut = () => {
    const images = document.querySelector("#images");
    images.addEventListener("mouseover", function() {
       setTimeout(() => {
            this.querySelector('.controllerImageSubtitle').style.display = "inline-block";
       }, 1000);
    });
    images.addEventListener("mouseout", function () {
        this.querySelector('.controllerImageSubtitle').style.display = "none";
    });
}

// Drag and Drop 

// Reference: https://www.youtube.com/watch?v=6wn8hpUcEcM

const dragAndDrop = () => {

    let dragImage = document.querySelector(".controllerImage img");
    const dropZone = document.querySelectorAll(".tierPosition");
    let dragged;

    const dragstart = function(e) {
        this.classList.add("dragging");
        dropZone.forEach(drop => drop.classList.add("highlight"));
        dragged = this;
    }
    
    const dragend = function() {
        this.classList.remove("dragging");
        dropZone.forEach(drop => drop.classList.remove("highlight"));
        dragged = null;
    }
    
    const dragenter = function(e) {
        if (!dragged) return;
        this.classList.add("over");
    }
    
    const dragover = function (e) {
        if (!dragged) return;
        e.preventDefault();
    }
    
    const dragleave = function () {
        if (!dragged) return;
        this.classList.remove("over");
    }
    
    const dropped = function(e) {
        if (!dragged) return;
        if (this.querySelectorAll('img').length > 0) return;
        this.classList.remove("over");
        const newCard = document.createElement("img");
        newCard.src = dragged.src;
        this.appendChild(newCard);
        dragged = null;
        dropZone.forEach(drop => drop.classList.remove("highlight"));
        requestApi();

        let tier = this.parentElement.parentElement.querySelector('h4').innerText

        obj = {
            name: movieTitle,
            url: movieUrl
        }

        movies[tier].push(obj)
    }

    dragImage.addEventListener("dragstart", dragstart);
    dragImage.addEventListener("dragend", dragend);

    dropZone.forEach(drop => {
        drop.addEventListener("dragenter", dragenter);
        drop.addEventListener("dragover", dragover);
        drop.addEventListener("dragleave", dragleave);
        drop.addEventListener("drop", dropped);
    })
}

document.querySelector(".buttonNext").onclick = requestApi;


const endGame = () => {
    let position = document.getElementById("firstPosition");
    let elements = position.getElementsByTagName("img");
    let cont = 0;

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("secondPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("thirdPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("fourthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("fifthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("sixthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("seventhPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("eighthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("ninthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    position = document.getElementById("tenthPosition");
    elements = position.getElementsByTagName("img");

    if(elements.length == 1) {
        cont++;
    }

    if (cont == 10) {
        const controller = document.querySelector(".controller");
        controller.style.display = "none";

        const buttonSave = document.querySelector(".buttonSave");
        buttonSave.style.display = "grid";
    }
}

// Chamada de métodos


await requestApi();
mouseOverMouseOut();
dragAndDrop();
endGame();

};
