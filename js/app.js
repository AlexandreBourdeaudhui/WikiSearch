var searchElt = "paris";
var resultElt = document.getElementById('result');
//document.querySelector('[input type="search"]');

// Request Ajax
//ajaxGet('https://fr.wikipedia.org/w/api.php?action=opensearch&search=' + searchElt + '&limit=10', function (response) {
// On recupere en json les 15 mots qui se rapprochent le plus de la requete souhaitée (paris)
ajaxGet('https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=' + searchElt, function (response) {
var result = JSON.parse(response).query.pages;
  for(var index in result) { 
    var attr = result[index]; 
    // Regarde ta console ce que tu obtiens :)
    console.log(attr);
  }
});

/**
 * return preformated block of content
 * @param  {object}
 * @return {string} 
 */
function generateBlock (obj) {
  // a clean - je le laisse pour te rappeler ce que tu avais fais et pas tout supprimer
 /* var titre = document.createElement('p');
  titre.textContent = result[0];

  var descrip = document.createElement('p');
  descrip.textContent = result[1];

  var url = document.createElement('a');
  url.textContent = result[2];

  resultElt.appendChild(titre);
  resultElt.appendChild(descrip);
  resultElt.appendChild(url);
  */
};

/**
 * return preformated url
 * @id  {integer}
 * @return url {string} 
 */
function getUrl (id) {

};