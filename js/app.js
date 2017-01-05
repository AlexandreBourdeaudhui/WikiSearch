/* @Todo :
- Trier les résultats par leur index
- Voir pour des URLs plutôt que des ID
*/

var formElt = document.querySelector('.formElt'),
    resultElt = document.getElementById('result'),
    resultSimiElt = document.getElementById('result-similaire'),
    resultMsg = document.getElementById('result-msg'),
    domElement = "",
    firstDomElement = "";

function createElement(elem) {
    elem.forEach(function (element, key) {
        Object.keys(element).map(function (elemKey, index) {
            var value = element[elemKey];

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
}

function generateBlock(searchs = []) {
    searchs.map((search, index) => {
        var elements = [{
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
            'textContent': `https://fr.wikipedia.org/wiki/${search.title}`,
            'append': 'auto'
    }, {
            'type': 'span',
            'name': 'extractSpan',
            'innerHTML': `${search.extract}`,
            'append': 'auto'
    }];
        createElement(elements);
    });
}

function generateBlockSimilaire(searchs = []) {
    searchs.map((search, index) => {
        var elements = [{
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
}

var searches = [];

function addSearch(e) {
    e.preventDefault();
    var searchElt = this.querySelector('[name=search]').value;
    ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&explaintext=false&gsrlimit=15&exlimit=15&gsrsearch=' + searchElt, searchResult);
}

function searchResult(response) {
    var result = JSON.parse(response).query.pages;
    if (result === 'undefined') { console.log('coucou'); }
    var searchContent = {};

    for (var x in result) {
        var attr = result[x];
        searchContent = {
            title: attr.title,
            extract: attr.extract,
            pageid: attr.pageid,
            index: attr.index
        };
        searches.push(searchContent);
    };

    searches.sort(function (firstIndex, secondIndex) {
        if (firstIndex.index > secondIndex.index) {
            return 1;
        } else {
            return -1;
        }
    });
    resultElt.innerHTML = "";
    resultSimiElt.innerHTML = "";

    var nbIndex = searches.filter(search => (search.index <= 7));
    var nbIndexMax = searches.filter(search => (search.index > 7));
    
    console.table(nbIndex);
    console.table(nbIndexMax);

    if (nbIndexMax == false) {
         resultMsg.style.display = "none";
    } else {
         resultMsg.style.display = "block";
    }

    generateBlock(nbIndex, resultElt);
    generateBlockSimilaire(nbIndexMax, resultSimiElt);

    // Nouvelle recherche
    searches.splice(0, 15);
};

formElt.addEventListener('submit', addSearch);
formElt.addEventListener('keyup', function (e) {
    var displayText = document.getElementById('searchText');
    displayText.style.display = "block";
    if (e.keyCode == 13) {
        displayText.style.display = "none";
    }
});