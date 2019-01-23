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
    database: 'projet_web_local',
    port: 3308
});

// Connexion à la BDD
connexion.connect(function(error) {

    if (error) throw error;
    console.log("Connecté à la base de données");
});

// Configuration des routes
// GET
serveur.get('/boite-a-idees', function(req, res) {

    // Définition des paramètre de requête
    //const ideeId = req.body.idee_id;
    const queryString = "SELECT * FROM idee";

    // Execution de la requête et envoie des données
    connexionn.query({
        sql: queryString,
        timeout: 40000
        //values: []
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                res.sendStatus(500);
                throw error;
            } else {
                console.log("Succès de la requête GET");
                res.json(rows);
                console.log(rows);
            }
        });

    
});

//POST
serveur.post('/proposition-idee', (req, res) => {
    console.log("Tentative de création d'une nouvelle idée...");

    const titre = req.body.idee_titre;
    const description = req.body.idee_description;
    const id_user = req.body.id_user;
    

    const queryString = "INSERT INTO users (username, user_email, user_role, user_status) VALUES (?, ?, ?, ?)"; 

    connexionn.query({
        sql: queryString,
        timeout: 40000
        //values: []
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                res.sendStatus(500);
                throw error;
            } else {
                console.log("Succès de la requête GET");
                res.json(rows);
                console.log(rows);
            }
        });
});


// Lancement du serveur
// localhost:3000
serveur.listen(3000);