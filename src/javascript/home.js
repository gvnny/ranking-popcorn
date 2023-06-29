// 


const showPreview = function(e) {
    e.parentElement.querySelector('.preview').classList.toggle('show');
}

const deleteSave = function(e) {
    const father = e.parentElement;
    const name = father.querySelector('#name').value;

    const listSaves = JSON.parse(window.localStorage.getItem('saves'));
    delete listSaves[name];
    window.localStorage.setItem('saves', JSON.stringify(listSaves));
    clickBottunSaves('.cointainerModalSaves');
}

const changeInfo = function(e) {

    const name = document.getElementById('name');
    const date = document.getElementById('date');
    const father = e.parentElement;
    const oldName = father.querySelector('#name').value;
    const oldDate = father.querySelector('#date').value;

    name.disabled = !name.disabled;
    date.disabled = !date.disabled;

    if (!name.disabled) {
        name.classList.add('disabledActive');
    } else {
        name.classList.remove('disabledActive');
    }

    if (!date.disabled) {
        date.classList.add('disabledActive');
    } else {
        date.classList.remove('disabledActive');
    }

    const container = document.querySelector('.save');

    if(name.disabled == false && date.disabled == false) {
        const button = document.createElement('button');
        button.classList.add('buttonEdit');
        button.textContent = 'Save';
        container.appendChild(button);

        button.addEventListener('onclick', function() {
            const newName = document.getElementById('name').value;
            const newDate = document.getElementById('date').value;

            const listSaves = JSON.parse(window.localStorage.getItem('saves'));

            listSaves.newName = listSaves.oldName;
            delete listSaves.oldName;

            listSaves.oldName.date = newDate

            window.localStorage.setItem('saves', JSON.stringify(listSaves));
            clickBottunSaves('.cointainerModalSaves');
        })

    } else {
        const button = document.querySelector('.buttonEdit');

        if(button) {
            container.removeChild(button);
        }
    }
    
}

const clickBottunSaves = (idModal) => {

    const divModal = document.querySelector(idModal)
    divModal.style.display = "inline";

    const divSaves = document.querySelector(".iconList");
    divSaves.replaceChildren();

    const listSaves = JSON.parse(window.localStorage.getItem('saves'));
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

  



    return;


    
    


    if(divSaves.childElementCount > 0) {
        // possui filho
        // ver quais lista já estão salvas na tela e comparar com o que está vindo do local storage e adicionar a tela a diferença
    } else {

        // não possui filho

        for(let i = 0; i < JSON.parse(listSaves.length); i++) {

            const iconList = document.querySelector(".iconList");

            const div = document.createElement('div');
            div.classList.add('div');
            const title = document.createElement('h4');
            const date = document.createElement('h1');

            title.textContent = listSaves[i]['name'];
            date.textContent = listSaves[i]['date'];

            iconList.appendChild(div);
            div.appendChild(title);
            div.append(date);

            div.addEventListener('click', function() {

                // const divs = document.querySelector('.iconList li');
                // if(divs.childElementCount > 0) {
                //     // mostrar apenas 
                // } else {

                    const divElement = document.createElement('div');

                    const bottunClose = document.createElement('button');
                    bottunClose.textContent = 'x';

                    const ulElement = document.createElement('ul');

                    const titleS = document.createElement('h4');
                    titleS.textContent = 'S:';
                    const itemS = document.createElement('li');
                    itemS.textContent = listSaves[i]['movies']['S'][0]['name'];

                    const titleA = document.createElement('h4');
                    titleA.textContent = 'A:';
                    const itemA1 = document.createElement('li');
                    itemA1.textContent = listSaves[i]['movies']['A'][0]['name'];
                    const itemA2 = document.createElement('li');
                    itemA2.textContent = listSaves[i]['movies']['A'][1]['name'];

                    const titleB = document.createElement('h4');
                    titleB.textContent = 'B:';
                    const itemB1 = document.createElement('li');
                    itemB1.textContent = listSaves[i]['movies']['B'][0]['name'];
                    const itemB2 = document.createElement('li');
                    itemB2.textContent = listSaves[i]['movies']['B'][1]['name'];
                    const itemB3 = document.createElement('li');
                    itemB3.textContent = listSaves[i]['movies']['B'][2]['name'];

                    const titleC = document.createElement('h4');
                    titleC.textContent = 'C:';
                    const itemC1 = document.createElement('li');
                    itemC1.textContent = listSaves[i]['movies']['C'][0]['name'];
                    const itemC2 = document.createElement('li');
                    itemC2.textContent = listSaves[i]['movies']['C'][1]['name'];
                    const itemC3 = document.createElement('li');
                    itemC3.textContent = listSaves[i]['movies']['C'][2]['name'];
                    const itemC4 = document.createElement('li');
                    itemC4.textContent = listSaves[i]['movies']['C'][3]['name'];

                    div.appendChild(divElement);
                    divElement.appendChild(bottunClose);
                    divElement.appendChild(ulElement);
                    ulElement.appendChild(titleS);
                    ulElement.appendChild(itemS);
                    ulElement.appendChild(titleA);
                    ulElement.appendChild(itemA1);
                    ulElement.appendChild(itemA2);
                    ulElement.appendChild(titleB);
                    ulElement.appendChild(itemB1);
                    ulElement.appendChild(itemB2);
                    ulElement.appendChild(itemB3);
                    ulElement.appendChild(titleC);
                    ulElement.appendChild(itemC1);
                    ulElement.appendChild(itemC2);
                    ulElement.appendChild(itemC3);
                    ulElement.appendChild(itemC4);

                    divElement.classList.add('divElement');
                    bottunClose.classList.add('bottunClose');

                    bottunClose.addEventListener('click', function() {
                        const element = document.querySelector(".divElement");
                        const parentElement = divElement.parentNode;
                        parentElement.removeChild(element);
                    });

                //}

            });

            div.addEventListener('mouseover', function() {

                const bottun = document.querySelector(".bottunClose");
                if (bottun) {
                    bottun.style.display = 'inline';
                } else {
                    const bottunClose = document.createElement('button');
                    bottunClose.textContent = 'x';
                    div.appendChild(bottunClose);
                    bottunClose.classList.add('bottunClose');
                }
            })

            div.addEventListener('mouseleave', function() {
                const bottun = document.querySelector(".bottunClose");
                bottun.style.display = 'none';
            })
        }
    }
}

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