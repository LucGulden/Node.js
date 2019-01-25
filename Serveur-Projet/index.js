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
serveur.use(bodyParser.json());

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
serveur.get('/idee/:ideeId', function(req, res) {

    // Définition des paramètre de requête
    //const ideeId = req.body.idee_id;
    const queryString = "SELECT * FROM idee WHERE id_idee = ?";

    // Execution de la requête et envoie des données
    connexion.query({
        sql: queryString,
        timeout: 40000,
        values: [req.params.ideeId]
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

serveur.get('/idee', function(req, res) {

    // Définition des paramètre de requête
    //const ideeId = req.body.idee_id;
    const queryString = "SELECT * FROM idee";

    // Execution de la requête et envoie des données
    connexion.query({
        sql: queryString,
        timeout: 40000
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
serveur.post('/', (req, res) => {
    console.log("Tentative de création d'une nouvelle idée...");

    const queryString = "INSERT INTO idee (titre_idee, description_idee, id_users) VALUES (?, ?, 2)"; 

    connexion.query({
        sql: queryString,
        timeout: 40000,
        values: [req.body.titre_idee, req.body.description_idee]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                res.sendStatus(500);
                throw error;
            } else {
                console.log("Succès de la requête POST");
                console.log(rows);
            }
        });
});

serveur.post('/aime', (req, res) => {
    console.log("Aime une idée...");

    const pouvoirAimer = "SELECT * FROM aime WHERE id_idee = ? AND id_users = ?";
    const aimer = "INSERT INTO aime (id_idee, id_users) VALUES (?, ?)"

    connexion.query({
        sql: pouvoirAimer,
        timeout: 40000,
        values: [req.body.id_idee, req.body.id_users]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux likes : " + error);
                res.sendStatus(500);
                throw error;
            } else {
                console.log(rows);
                if(rows[0] == null) {
                    // Ajout du like dans la base de données
                    connexion.query({
                        sql: aimer,
                        timeout : 40000,
                        values: [req.body.id_idee, req.body.id_users]
                    }, function (err, row, field) {
                        if (err) {
                            console.log("Impossible d'ajouter un like : " + error);
                            res.sendStatus(500);
                            throw error;
                        } else {
                            console.log("Like ajouté");
                        }
                    });
                    // Fin de l'ajout du like dans la base de données
                } else {
                    console.log("Impossible d'aimer");
                }
            }
            res.end();
        });
});

// Lancement du serveur
// localhost:3000
serveur.listen(3000);