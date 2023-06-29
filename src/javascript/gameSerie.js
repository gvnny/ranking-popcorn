// https://moviesdatabase.p.rapidapi.com/titles/random?list=top_rated_series_250&limit=1

// window.onload = function() {

//     // Acoes da interface
    
//     document.querySelector('.controllerButton').onclick = function() {
//         document.dispatchEvent(new CustomEvent('handler.nextMovie', {}));
//     }

//     document.querySelector('#images').addEventListener("mouseover", function() {
//         document.dispatchEvent(new CustomEvent('handler.setImageSubtitleVisible', {}));
//     });

//      document.querySelector('#images').addEventListener("mouseout", function () {
//         document.dispatchEvent(new CustomEvent('handler.setImageSubtitleInvisible', {}));
//     });

//     document.querySelector('#images').addEventListener("dragstart", function () {
//         document.dispatchEvent(new CustomEvent('handler.drag', {}));
//     });

//     document.querySelector('#images').addEventListener("drag", function () {
//         document.dispatchEvent(new CustomEvent('handler.dragging', {}));
//     });

//     document.querySelector('#images').addEventListener("dragenter", function () {
//         document.dispatchEvent(new CustomEvent('handler.enteringDestinationArea', {}));
//     });

//     // Logica

//     document.addEventListener('handler.nextMovie', async function() {
//         const movie = await getMovie();
//         document.dispatchEvent(new CustomEvent('state.setMovie', {'detail': movie}));
//     });

//     document.addEventListener('handler.setImageSubtitleVisible', function() {
//         document.dispatchEvent(new CustomEvent('state.setImageSubtitleVisible', {}));
//     });

//     document.addEventListener('handler.setImageSubtitleInvisible', function() {
//         document.dispatchEvent(new CustomEvent('state.setImageSubtitleInvisible', {}));
//     });

//     document.addEventListener('handler.drag', function () {
//         document.dispatchEvent(new CustomEvent('state.drag', {}));
//     });

//     // State

//     const __state = {};

//     document.addEventListener('state.setMovie', function(event) {
//         __state['movie'] = event.detail;
//         document.dispatchEvent(new CustomEvent('state.onMovieChange', {'detail': __state['movie']}));
//     });

//     document.addEventListener('state.setImageSubtitleVisible', function(event) {
//         __state['imageSubtitleVisibility'] = true;
//         document.dispatchEvent(new CustomEvent('state.onImageSubtitleVisible', {}));
//     });

//     document.addEventListener('state.setImageSubtitleInvisible', function(event) {
//         __state['imageSubtitleVisibility'] = false;
//         document.dispatchEvent(new CustomEvent('state.onImageSubtitleInvisible', {}));
//     });

//     // Atualizacoes da interface

//     document.addEventListener('state.onMovieChange', function(event) {
//         const movie = event.detail;
//         const controllerImageElement = document.querySelector('#images');
//         const img = document.querySelector("img");       
//         img.src = movie.primaryImage.url;
//         img.classList.add("img");
//     });

//     document.addEventListener('state.onMovieChange', function(event) {
//         const movie = event.detail;
//         const title = document.querySelector('#images .controllerImageSubtitle p');
//         title.textContent = movie.originalTitleText.text;
//         title.classList.add("title");
//     });

//     document.addEventListener('state.onImageSubtitleVisible', function(event) {     
//         setTimeout(() => {
//             document.querySelector('#images .controllerImageSubtitle').style.display = "block";
//         }, 1000);
//     });

//     document.addEventListener('state.onImageSubtitleInvisible', function(event) {  
//         document.querySelector('#images .controllerImageSubtitle').style.display = "none";
//     })

//     // Utilitarios

//     async function getMovie() {
//         const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=most_pop_movies&limit=1';
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '4d22f61055msh339bba6dd0edd70p10eb88jsn9d4271618ebc',
//                 'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(url, options);
//             const result = await response.json();
//             return result.results[0];       

//         } catch (error) {
//             console.error(error);
//             throw(error);
//         }
//     }

//     // inicializao
    
//     document.dispatchEvent(new CustomEvent('handler.nextMovie', {}));
// };

//////////////////////////////////////////////////////////////


// [ // lista de saves
//     { // save
//         name: "save 1",
//         date: "2023-06-29T12:34:22",
//         movies: {
//             'S': [
//                 {title: "Dia de Treinamento", img: "sahdashjd.png"}
//             ],
//             'A': [
//                 {title: "Click", img: "sahdashjd.png"},
//                 {title: "asdasd", img: "sahdashjd.png"}
//             ],
//             ...
//         }
//     },
//     {},
//     ...
// ]


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

    const day = String(dateNow.getDate()).padStart(2, '0');
    const month = String(dateNow.getMonth() + 1).padStart(2, '0');
    const year = dateNow.getFullYear();

    inputSaveDate.value = day + '/' + month + '/' + year;
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

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=top_rated_series_250&limit=1';
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

    console.log("DRAGIMAGE"+dragImage);
    console.log("DROPIMAGE"+dropZone);

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

        console.log(movies)
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