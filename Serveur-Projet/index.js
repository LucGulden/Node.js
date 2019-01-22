// Imports
const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Instantiation du serveur
const serveur = express();

serveur.use(morgan('short'));

serveur.use(express.static('./public'));

serveur.use(bodyParser.urlencoded({extended: false}));

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
// GET
serveur.get('/users/:id', function(req, res) {

    // Définition des paramètre de requête
    const usersId = req.params.id;
    const queryString = "SELECT * FROM users WHERE id = ?";

    // Envoie de la requête et affichage des données
    connexion.query(queryString, [usersId], function(error, rows, fields) {
        if(error) {
            console.log("Erreur dans la requête users : " + error);
            res.sendStatus(500);
            throw error;
        } else {
            res.json(rows);
        }
    });
});

serveur.get('/users', function(req, res) {
    const queryString = "SELECT * FROM users";

    connexion.query(queryString, function(error, rows, fields) {
        if(error) {
            res.sendStatus(500);
            throw error;
        } else {
            res.json(rows);
        }
    });
});

//POST
serveur.post('/user_create', (req, res) => {
    console.log("Tentative de création d'un nouvel utilisateur...");

    const nom = req.body.creation_nom;
    const email = req.body.creation_email;
    const role = req.body.creation_role;
    const statut = req.body.creation_statut;

    const queryString = "INSERT INTO users (username, user_email, user_role, user_status) VALUES (?, ?, ?, ?)"; 
    connexion.query(queryString, [nom, email, role, statut], (error, results, fields) => {
        if(error) {
            console.log("Impossible de créer un nouvel utilisateur : " + error);
            res.sendStatus(500);
        }

        console.log("Création d'un nouvel utilisateur avec l'id : ", results.insertId);
        res.end();
    });
});


// Lancement du serveur
// localhost:3000
serveur.listen(3000);