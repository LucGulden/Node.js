// Imports
var express = require('express');

// Instantiation du serveur
var serveur = express();

// Configuration des routes
serveur.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur le serveur du sale</h1>');
});

// Lancement du serveur
serveur.listen(8080, function() {
    console.log('Serveur démarré');
});