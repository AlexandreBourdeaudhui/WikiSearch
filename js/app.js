/* @Todo :
- Trier les résultats par leur index
- Enlever les balises <p> qui sont dans l'extract
- Voir pour des URLs plutôt que des ID
- Mettre un message si recherche NOK || recherche OK

*/
var resultElt = document.getElementById('result');

var formElt = document.querySelector('form');
formElt.addEventListener('submit', function (e) {
    e.preventDefault();
    var searchElt = formElt.elements.search.value;

    // Request Ajax
    // Request done in JSON format with ~10 result & params 
    ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&exlimit=10&gsrlimit=10&gsrsearch=' + searchElt, function (response) {
        var result = JSON.parse(response).query.pages;
        console.log(result);

        for (var x in result) {
            var attr = result[x];

            var searchContent = {
                title: attr.title,
                extract: attr.extract,
                pageid: attr.pageid,
                index: attr.index
            };


            /**
             * return preformated block of content
             * @param  {object}
             * @return {string} 
             */

            function generateBlock(obj) {
                var divContainer = document.createElement('div');
                divContainer.classList.add('show-content');

                var titleA = document.createElement('a');
                titleA.href = "https://fr.wikipedia.org/?curid=" + searchContent.pageid;
                titleA.textContent = searchContent.title;

                var extractSpan = document.createElement('span');
                extractSpan.innerHTML = searchContent.extract;

                var pageidLi = document.createElement('li');
                pageidLi.textContent = "https://fr.wikipedia.org/wiki/" + searchContent.title;

                resultElt.appendChild(divContainer);
                divContainer.appendChild(titleA);
                divContainer.appendChild(pageidLi);
                divContainer.appendChild(extractSpan);

            };
            // If Search == Ok
            if (searchElt != undefined) {
                generateBlock();
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