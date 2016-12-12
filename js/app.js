/* @Todo :
- Trier les résultats par leur index
- Enlever les balises <p> qui sont dans l'extract
- Voir pour des URLs plutôt que des ID
- Mettre un message si recherche NOK || recherche OK

*/
var resultElt = document.getElementById('result');

var formElt = document.querySelector('form');
var domElement = "";
var firstDomElement = "";

function createElement(elem) {
    elem.forEach(function(element, key) {
        Object.keys(element).map(function(elemKey, index) {
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
        'type': 'span',
        'name': 'extractSpan',
        'innerHTML': search.extract,
        'append': 'auto'
    }, {
        'type': 'li',
        'name': 'pageidLi',
        'textContent': 'https://fr.wikipedia.org/wiki/' + search.title,
        'append': 'auto'
    }];

    createElement(elements);
};

formElt.addEventListener('submit', function(e) {
    e.preventDefault();
    var searchElt = formElt.elements.search.value;
    var searchContent = {};
    // Request Ajax
    // Request done in JSON format with ~10 result & params 
    ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&exlimit=10&gsrlimit=10&gsrsearch=' + searchElt, function(response) {
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

            // If Search == Ok
            if (searchElt != undefined) {
                generateBlock(searchContent);
            }
        }

    });

    resultElt.innerHTML = ""; // Delete result when new Search
});

/**
 * return preformated url
 * @id  {integer}
 * @return url {string} 
 */

function getUrl(id) {

};