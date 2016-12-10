var searchElt = "paris";
var resultElt = document.getElementById('result');
//document.querySelector('[input type="search"]');

// Request Ajax
ajaxGet('https://fr.wikipedia.org/w/api.php?action=opensearch&search=' + searchElt + '&limit=10', function (response) {
    var result = JSON.parse(response);
    result.forEach(function (result) {
        var titre = document.createElement('p');
        titre.textContent = result[0];

        var descrip = document.createElement('p');
        descrip.textContent = result[1];

        var url = document.createElement('a');
        url.textContent = result[2];

        resultElt.appendChild(titre);
        resultElt.appendChild(descrip);
        resultElt.appendChild(url);
    });
});