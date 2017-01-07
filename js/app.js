const formElt = document.querySelector('.formElt');
const resultElt = document.getElementById('result');
const resultMsg = document.getElementById('result-msg');
const resultSimiElt = document.getElementById('result-similaire');
const sectionElem = document.querySelector('section');
const displayResult = document.getElementById('etat-result');

function createElement(elem) {
    let domElement = "";
    let firstDomElement = "";
    elem.forEach(function (element, key) {
        Object.keys(element).map(function (elemKey, index) {
            let value = element[elemKey];

            switch (elemKey) {
            case 'type':
                domElement = document.createElement(value);
                break;
            case 'name':
                domElement.setAttribute('id', value);
                break;
            case 'class':
                domElement.classList.add(value);
                break;
            case 'href':
                domElement.href = value;
                break;
            case 'textContent':
                domElement.textContent = value;
                break;
            case 'innerHTML':
                domElement.innerHTML = value;
                break;
            case 'append':
                if (value !== 'auto') {
                    firstDomElement = domElement;
                    value.appendChild(domElement);
                } else {
                    firstDomElement.appendChild(domElement);
                }
                break;
            }
        });
    });
};

function generateBlock(searchs = []) {
   
    searchs.map((search, index) => {
 
        let replaceText = search.title;
        replaceText = replaceText.replace(/ /g, '_');

        let elements = [{
            'type': 'div',
            'name': 'divContainer',
            'class': 'show-content',
            'append': resultElt
    }, {
            'type': 'a',
            'name': 'titleA',
            'href': `https://fr.wikipedia.org/?curid=${search.pageid}`,
            'textContent': `${search.title}`,
            'append': 'auto'
    }, {
            'type': 'li',
            'name': 'pageidLi',
            'textContent': `https://fr.wikipedia.org/wiki/${replaceText}`,
            'append': 'auto'
    }, {
            'type': 'span',
            'name': 'extractSpan',
            'innerHTML': `${search.extract}`,
            'append': 'auto'
    }];
        createElement(elements);
    });
};

function generateBlockSimilaire(searchs = []) {
    searchs.map((search, index) => {
        let elements = [{
            'type': 'div',
            'name': 'divSimilaire',
            'class': 'show-similaire',
            'append': resultSimiElt
    }, {
            'type': 'a',
            'name': 'titleA',
            'href': `https://fr.wikipedia.org/?curid=${search.pageid}`,
            'textContent': `${search.title}`,
            'append': 'auto'
    }];
        createElement(elements);
    });
};

function addSearch(e) {
    e.preventDefault();
    const searchElt = this.querySelector('[name=search]').value;
    if (searchElt) {
        ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&explaintext=false&gsrlimit=15&exlimit=15&gsrsearch=' + searchElt, searchResult);
    } else {
        searchNOk();
    }
    this.reset();
};

let searches = [];

function searchResult(response) {
    const result = JSON.parse(response).query.pages;

    /*if (typeof (result) !== 'undefined') {
        console.log("Hello here");
    } else {
        searchNOk();
    }*/

    let searchContent = {};

    for (var x in result) {
        let attr = result[x];
        searchContent = {
            title: attr.title,
            extract: attr.extract,
            pageid: attr.pageid,
            index: attr.index
        };
        searches.push(searchContent);
    };

    searches.sort((firstIndex, secondIndex) => firstIndex.index > secondIndex.index ? 1 : -1);
    //console.table(searches);

    resultElt.innerHTML = "";
    resultSimiElt.innerHTML = "";

    const nbIndex = searches.filter(search => (search.index <= 7));
    console.table(nbIndex);
    const nbIndexMax = searches.filter(search => (search.index > 7));
    console.table(nbIndexMax);

    if (nbIndexMax == false) {
        resultMsg.innerHTML = "";
    } else {
        resultMsg.innerHTML = "<span>Résultats similaires à votre recherche : </span>";
    }

    const searchEvery = searches.every(search => search >= 1 ? searchNOk() : searchOk());

    generateBlock(nbIndex, resultElt);
    generateBlockSimilaire(nbIndexMax, resultSimiElt);

    // Nouvelle recherche
    searches.splice(0, 15);
};

function searchOk() {
    displayResult.classList.add("show-msg-ok");
    displayResult.textContent = "Votre recherche a été effectuée.";
    sectionElem.insertBefore(displayResult, resultElt);
    setTimeout(function () {
        displayResult.classList.remove('show-msg-ok');
        displayResult.textContent = "";
    }, 2000);
};

function searchNOk() {
    displayResult.classList.add("show-msg-nok");
    displayResult.textContent = "Votre recherche n'a donné aucun résultat.";
    sectionElem.insertBefore(displayResult, resultElt);
    setTimeout(function () {
        displayResult.classList.remove('show-msg-nok');
        displayResult.textContent = "";
    }, 2000);
};

formElt.addEventListener('submit', addSearch);
formElt.addEventListener('keyup', (e) => {
    const displayText = document.getElementById('searchText');
    displayText.style.display = "block";
    if (e.keyCode == 13) {
        displayText.style.display = "none";
    }
});