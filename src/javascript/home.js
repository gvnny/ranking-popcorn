const showPreview = function(e) {
    e.parentElement.querySelector('.preview').classList.toggle('show');
}

const deleteSave = function(e) {
    const parent = e.parentElement;
    const name = parent.querySelector('#name').value;

    const listSaves = JSON.parse(window.localStorage.getItem('saves'));
    delete listSaves[name];
    window.localStorage.setItem('saves', JSON.stringify(listSaves));
    clickButtonSaves('.cointainerModalSaves');
}

const changeInfo = function(e) {

    const container = e.parentNode;

    const name = container.querySelector('#name');
    const date = container.querySelector('#date');

    const oldName = container.querySelector('#name').value;
    const oldDate = container.querySelector('#date').value;

    name.disabled = !name.disabled;
    date.disabled = !date.disabled;


    if(name.disabled == false && date.disabled == false) {
        const button = document.createElement('button');
        button.classList.add('buttonEdit');
        button.textContent = 'Save';
        container.appendChild(button);

        // Atualizar mudanças 

        button.addEventListener('click', function(e) {

            const parent = e.target.parentNode;

            const newName = parent.querySelector('#name').value;
            const newDate = parent.querySelector('#date').value;

            const listSaves = JSON.parse(window.localStorage.getItem('saves'));

            listSaves[oldName].date = newDate;

            listSaves[newName] = listSaves[oldName];
            delete listSaves[oldName];

            window.localStorage.setItem('saves', JSON.stringify(listSaves));
            clickButtonSaves('.cointainerModalSaves');

        });

    } else {
        const button = document.querySelector('.buttonEdit');

        if(button) {
            container.removeChild(button);
        }
    }
}

const clickButtonSaves = (idModal) => {

    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline";

    const divSaves = document.querySelector(".iconList");
    divSaves.replaceChildren();

    const listSaves = JSON.parse(window.localStorage.getItem('saves')) || {};
    for (const [key, val] of Object.entries(listSaves)) {
        const template = document.getElementById('saveTemplate');
        const clone = template.content.cloneNode(true);

        clone.getElementById('name').value = key;
        clone.getElementById('date').value = val['date'];
        
        const lis = clone.querySelectorAll('li');
        lis[0].textContent = val['movies']['S'][0]['name'];
        lis[1].textContent = val['movies']['A'][0]['name'];
        lis[2].textContent = val['movies']['A'][1]['name'];
        lis[3].textContent = val['movies']['B'][0]['name'];
        lis[4].textContent = val['movies']['B'][1]['name'];
        lis[5].textContent = val['movies']['B'][2]['name'];
        lis[6].textContent = val['movies']['C'][0]['name'];
        lis[7].textContent = val['movies']['C'][1]['name'];
        lis[8].textContent = val['movies']['C'][2]['name'];
        lis[9].textContent = val['movies']['C'][3]['name'];

        divSaves.appendChild(clone);
    }
}

// Abrir o modal How To Play

const clickButtonHowToPlay = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline";
}

// Fechar o modal How To Play

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none";
}

// Mudança de tela 

const clickButtonPlay = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline-grid";
}

// Abrir tela de filmes

const clickButtonHowOpenMovie = () => {
    window.location.href = "game.html?type=movies";
}

// Abrir tela de séries

const clickButtonHowOpenSerie = () => {
    window.location.href = "game.html?type=series";
}
