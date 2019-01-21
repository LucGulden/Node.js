// Imports
var express = require('express');
var mysql = require('mysql');

// Instantiation du serveur
var serveur = express();

// Définitions de propriété de la BDD
var connexion = mysql.createConnection({
    // Propriétés de la BDD
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wswebservice'
});

// Connexion à la BDD
connexion.connect(function(error) {

    if (error) throw error;
    console.log("Connected!");
});

// Configuration des routes
serveur.get('/', function(req, res) {
    connexion.query("SELECT * FROM users", function(error, rows, fields) {
    	if(!!error) {
    		console.log("Problème");
    	} else {
    		console.log(rows);
    	}
    });
});

// Lancement du serveur
serveur.listen(3000, function() {
    console.log('Serveur démarré');
});