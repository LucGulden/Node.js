// Imports
const express = require('express');
const mysql = require('mysql');

// Instantiation du serveur
const serveur = express();

// Définitions de propriété de la BDD
const connexion = mysql.createConnection({
    // Propriétés de la BDD
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ws_webservices',
    port: 3308
});

// Connexion à la BDD
connexion.connect(function(error) {

    if (error) throw error;
    console.log("Connecté à la base de données");
});

// Configuration des routes
serveur.get('/users/:id', function(req, res) {

    // Définition des paramètre de requête
    const usersId = req.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";

    // Env
    connexion.query(queryString, [usersId], function(error, rows, fields) {
        if(error) {
            console.log("Erreur dans la requête users : " + error);
            res.sendStatus(500);
            throw error;
        } else {
            const users = rows.map(function(row) {
                return {Nom: row.username, Email: row.user_email};
            });
            res.json(users);
        }
    });
});



// Lancement du serveur
// localhost:3000
serveur.listen(3000);