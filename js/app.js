/* @Todo :
- Trier les résultats par leur index
- Voir pour des URLs plutôt que des ID
*/

var formElt = document.querySelector('form'),
    resultElt = document.getElementById('result'),
    zSection = document.querySelector('section'),
    domElement = "",
    firstDomElement = "";

var nbPrincipale = 7,
    nbSecondaire = 8,
    nbFinal = nbPrincipale + nbSecondaire;

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

/**
 * return preformated block of content
 * @param  {object}
 */
function generateBlock(search) {
    var elements = [{
        'type': 'div',
        'name': 'divContainer',
        'class': 'show-content',
        'append': resultElt
    }, {
        'type': 'a',
        'name': 'titleA',
        'href': 'https://fr.wikipedia.org/?curid=' + search.pageid,
        'textContent': search.title,
        'append': 'auto'
    }, {
        'type': 'li',
        'name': 'pageidLi',
        'textContent': 'https://fr.wikipedia.org/wiki/' + search.title,
        'append': 'auto'
    }, {
        'type': 'span',
        'name': 'extractSpan',
        'innerHTML': search.extract,
        'append': 'auto'
    }];

    createElement(elements);
};

function generateBlockSimilaire(search) {
    var elementSimilaire = [{
        'type': 'div',
        'name': 'divSimilaire',
        'class': 'show-similaire',
        'append': zSection
    }, {
        'type': 'a',
        'name': 'titleA',
        'href': 'https://fr.wikipedia.org/?curid=' + search.pageid,
        'textContent': search.title,
        'append': 'auto'
    }];

    createElement(elementSimilaire);
};

formElt.addEventListener('submit', function (e) {
    e.preventDefault();
    var searchElt = formElt.elements.search.value;
    var searchContent = {};
    // Request Ajax
    // Request done in JSON format with ~10 result & params 
    ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&explaintext=false&gsrlimit=15&gsrsearch=' + searchElt + '&exlimit=' + nbFinal, function (response) {
        var result = JSON.parse(response).query.pages;
        console.log(result);

        for (var x in result) {
            var attr = result[x];

            searchContent = {
                title: attr.title,
                extract: attr.extract,
                pageid: attr.pageid,
                index: attr.index
            };
            /*  // EN COURS --
            *   // TODO : Si plus de 7 résultats >
            *   Effacer les résultats dont l'index est supérieur à 7
            *   Les affichés en bas de pages ( FAIT sans mise en page )
            */
            if (searchContent.index > 7) {
                generateBlockSimilaire(searchContent);
            } else {
                generateBlock(searchContent);
            }
        };
    });

    // TODO : Si la recherche ne donne aucun résultat > SearchNOK
    if (searchElt) {
        searchOk();
    } else {
        searchNOk();
    }
    resultElt.innerHTML = ""; // Delete result when new Search
});

/**
 * return preformated url
 * @id  {integer}
 * @return url {string} 
 */

function getUrl(id) {

};

formElt.addEventListener('keyup', function (e) {
    var displayText = document.getElementById('searchText');
    displayText.style.display = "block";
    if (e.keyCode == 13) {
        displayText.style.display = "none";
    }
});

function searchOk() {
    var a = document.createElement('div');
    a.classList.add("show-msg-ok");
    a.textContent = "Votre recherche a été effectuée.";
    zSection.insertBefore(a, resultElt);
    setTimeout(function () {
        zSection.removeChild(a);
    }, 2000);

};

function searchNOk() {
    var a = document.createElement('div');
    a.classList.add("show-msg-nok");
    a.textContent = "Votre recherche n'a donné aucun résultat.";
    zSection.insertBefore(a, resultElt);
    setTimeout(function () {
        zSection.removeChild(a);
    }, 2000);
}