//Request ajaxGet
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();

    //La requête est asynchrome lorsque le 3ième paramètre vaut true ou est absent
    req.open("GET", url);
    req.setRequestHeader("Access-Control-Allow-Origin","*");
    //Gestion de l'événement indique la fin de la requête
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status <= 400) {
            // Le serveur à réussi à traiter la requète
            // On affiche alors la réponse reçu par la requète
            callback(req.responseText);
        } else {
            //On affiche des infos sur l'échec du traitement de la requète
            console.error(reqt.status + "" + req.statusText + "" + url);
        }
    });

    //Si la requète n'a pas réussi à atteindre le serveur
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL : " + url);
    });
    req.send(null);
}