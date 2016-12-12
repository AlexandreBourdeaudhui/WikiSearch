var searchElt = "paris";
var resultElt = document.getElementById('result');
//document.querySelector('[input type="search"]');

// Request Ajax
//ajaxGet('https://fr.wikipedia.org/w/api.php?action=opensearch&search=' + searchElt + '&limit=10', function (response) {
// On recupere en json les 15 mots qui se rapprochent le plus de la requete souhaitée (paris)
ajaxGet('https://fr.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&prop=extracts&exchars=500&exintro=true&exlimit=15&gsrlimit=15&gsrsearch=' + searchElt, function (response) {
    var result = JSON.parse(response).query.pages;
    console.log(result);

    for (var x in result) {
        var attr = result[x];

        var searchContent = {
            title: attr.title,
            extract: attr.extract,
            pageid: attr.pageid
        };

        // Regarde ta console ce que tu obtiens :)
        // console.log(attr);
        var titreElt = searchContent.title;
        var extractElt = searchContent.extract;
        var pageidElt = searchContent.pageid;

        var titleLi = document.createElement('li');
        titleLi.textContent = titreElt;

        var extractP = document.createElement('p');
        extractP.innerHTML = extractElt;

        var pageidA = document.createElement('a');
            pageidA.href = "https://en.wikipedia.org/?curid=" + pageidElt;
            pageidA.textContent = "https://en.wikipedia.org/wiki/" + titreElt;

        resultElt.appendChild(titleLi);
        resultElt.appendChild(extractP);
        resultElt.appendChild(pageidA);
    }

});

/**
 * return preformated block of content
 * @param  {object}
 * @return {string} 
 */
function generateBlock(obj) {
    /* On créé un block par défaut qui contiendras :
    - un titre,
    - un bref texte qui présentera le titre
    - l'url
    */
    var divElt = document.createElement('div');
    console.log(searchContent.title);
};

/**
 * return preformated url
 * @id  {integer}
 * @return url {string} 
 */
function getUrl(id) {
  
};

generateBlock(result);