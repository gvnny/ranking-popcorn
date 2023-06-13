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

let position = 0;
const requestApi = async (position) => {

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

        const controllerImageElement = document.querySelector('#images');
        const img = document.createElement("img");
        const subtitle = document.createElement("div");
        img.src = result.results[position].primaryImage.url;
        
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

    const subtitle = document.querySelector("#subtitle");
    subtitle.addEventListener("mouseover", function() {
        this.style.display = "inline-block";
    });
        
    subtitle.addEventListener("mouseout", function () {
        this.style.display = "none";
    });
}

// // const handleImageMouseEnter = (event) => {
// //     const image = event.target;
// //     const subtitle = image.querySelector(".controllerImageSubtitle");
// //     subtitle.style.display = "inline-block";
// // }

// // Método para adicionar eventos

// const addImageEvents = () => {
//     const images = document.querySelectorAll("#images");
//     images.forEach((image) => {
//         image.addEventListener("mouseenter", handleImageMouseEnter);
//         image.addEventListener("mouseleave", handleImageMouseLeave);
//     })
// }

// // desaparecer a legenda com o nome do filme ao retirar o mouse de cima da imagem

// const handleImageMouseLeave = (event) => {
//     const image = event.target;
//     const subtitle = image.querySelector(".controllerImageSubtitle");
//     subtitle.style.display = "none";
// }


// Troca de imagens usando o botão Next

const clickBottunNext = () => {

    if(position > 10) {
        return console.log("Salvar");
    } else {
        position =+ 1;
    return requestApi(position);
    }
}


// Drag and Drop 

// Reference: https://www.youtube.com/watch?v=6wn8hpUcEcM

const dragAndDrop = () => {

    const dragImage = document.querySelectorAll(".controllerImage");
    const dropImage = document.querySelectorAll(".images");

    console.log("DRAGIMAGE"+dragImage);
    console.log("DROPIMAGE"+dropImage);

    dragImage.forEach (drag => {
        drag.addEventListener("dragstart", dragstart);
        drag.addEventListener("drag", dragging);
        drag.addEventListener("dragend", dragend);
    })

    dropImage.forEach(drop => {
        drop.addEventListener("dragenter", dragenter);
        drop.addEventListener("dragover", dragover);
        drop.addEventListener("dragleave", dragleave);
        drop.addEventListener("dragdrop", dragdrop);
    })
    
    
    // const controller = document.querySelector(".containerController");

    // document.addEventListener("dragstart", (e) => {
    //     e.target.classList.add("dragging");
    // });

    // document.addEventListener("dragend", (e) => {
    //     e.target.classList.remove("dragging");
    // });

    // controller.forEach(("")

    // )

    const dragstart = () => {
        dragImage.classList.add("dragging");
        dropImage.forEach(drop => drop.classList.add("highlight"));
    }
    
    const dragging = () => {
    
    }
    
    const dragend = () => {
        dragImage.classList.remove("dragging");
        dropImage.forEach(drop => drop.classList.remove("highlight"));
    }
    
    
    const dragenter = () => {
    
    }
    
    const dragover = () => {
    
    }
    
    const dragleave = () => {
        
    }
    
    const dragdrop = () => {
    
    }

} 




// Chamada de métodos

requestApi(0);
mouseOverMouseOut();
dragAndDrop();
// addImageEvents();