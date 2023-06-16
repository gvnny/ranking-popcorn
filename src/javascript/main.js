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



window.onload = async function() {
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

// API

// https://rapidapi.com/SAdrian/api/moviesdatabase

let movieTitle;

const requestApi = async () => {

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/random?list=most_pop_movies&limit=1';
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

        const controllerImageElement = document.querySelector('#images');
        const img = document.createElement("img");
        const subtitle = document.createElement("div");
        img.src = result.results[0].primaryImage.url;
        
        movieTitle = result.results[0].originalTitleText.text;

        img.classList.add("img");
        controllerImageElement.appendChild(img);
        
        // const img = document.createElement("img");
        // img.src = result.results[0].primaryImage.url;
        // document.body.appendChild(img);

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

    const title = document.createElement("p");
    title.textContent = `"${movieTitle}"`;
    title.classList.add("title");
    const createLocal = document.querySelector(".controllerImageSubtitle");
    createLocal.appendChild(title);
        
    images.addEventListener("mouseout", function () {
        this.querySelector('.controllerImageSubtitle').style.display = "none";
    });
}

// Troca de imagens usando o botão Next

const clickBottunNext = () => {

    // if(position > 10) {
    //     return console.log("Salvar");
    // } else {
    //     position =+ 1;
    // return requestApi(position);
    // }
}


// Drag and Drop 

// Reference: https://www.youtube.com/watch?v=6wn8hpUcEcM

const dragAndDrop = () => {

    const dragImage = document.querySelector(".controllerImage");
    const dropZone = document.querySelectorAll(".tierPosition");

    console.log("DRAGIMAGE"+dragImage);
    console.log("DROPIMAGE"+dropZone);

    const dragstart = function() {
        dragImage.classList.add("dragging");
        this.classList.add("dragging");
        dropZone.forEach(drop => drop.classList.add("highlight"));
    }
    
    const dragging = () => {
        
    }
    
    const dragend = function() {
        dragImage.remove("dragging");
        this.classList.remove("dragging");
        dropZone.forEach(drop => drop.classList.remove("highlight"));
    }
    
    
    const dragenter = () => {
        
    
    }
    
    const dragover = function () {
        this.classList.add("over");
        const cardBeingDragged = document.querySelector(".dragging");
        this.appendChild(cardBeingDragged);
    }
    
    const dragleave = function () {
        this.classList.remove("over");
    }
    
    const dropped = function() {
        //this.classList.remove("over");
        console.log("Largou");
    }


    dragImage.addEventListener("dragstart", dragstart);
    dragImage.addEventListener("drag", dragging);
    dragImage.addEventListener("dragend", dragend);


    dropZone.forEach(drop => {
        drop.addEventListener("dragenter", dragenter);
        drop.addEventListener("dragover", dragover);
        drop.addEventListener("dragleave", dragleave);
        drop.addEventListener("drop", dropped);
    })

}


// Chamada de métodos

await requestApi();
mouseOverMouseOut();
dragAndDrop();
// addImageEvents();



// setTimeout(function() { }, 2000);

};