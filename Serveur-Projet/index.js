// Imports
const express = require('express');
    const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');

// localhost:3000
app.listen(3000);

app.use(morgan('short'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes.js'); // Importing route
routes(app); // Register the route


// // GET LE COMPTE DES LIKE POUR UNE IDEE
// serveur.get('/aime/:id', function(req, res) {

//     // Définition des paramètre de requête
//     //const ideeId = req.body.idee_id;
//     const queryString = "SELECT COUNT(*) AS COUNT FROM aime WHERE id_idee = ?";

//     // Execution de la requête et envoie des données
//     connexion.query({
//         sql: queryString,
//         timeout: 40000,
//         values: [req.params.id]
//         }, function(error, rows, fields) {
//             if(error) {
//                 console.log("Impossible d'accéder aux likes : " + error);
//                 res.sendStatus(500);
//                 throw error;
//             } else {
//                 console.log(rows);
//                 res.json(rows);
//             }
//         });
// });

//-------------------------------------------------------------------------------------------------------

// // POST LIKE
// serveur.post('/aime', (req, res) => {

//     const pouvoirAimer = "SELECT * FROM aime WHERE id_idee = ? AND id_users = ?";
//     //const aimer = "INSERT INTO aime (id_idee, id_users) VALUES (?, ?)";

//     connexion.query({
//         sql: pouvoirAimer,
//         timeout: 40000,
//         values: [req.body.id_idee, req.body.id_users]
//         }, function(error, rows, fields) {
//             if(error) {
//                 console.log("Impossible d'accéder aux likes : " + error);
//                 res.sendStatus(500);
//                 throw error;
//             } else {
//                 if(rows[0] == null) {
//                     // Ajout du like dans la base de données
//                     connexion.query({
//                         sql: "INSERT INTO aime (id_idee, id_users) VALUES (?, ?)",
//                         timeout : 40000,
//                         values: [req.body.id_idee, req.body.id_users]
//                     }, function (err, row, field) {
//                         if (err) {
//                         console.log("Impossible d'ajouter un like : " + err);
//                         res.sendStatus(500);
//                         throw error;
//                         }
//                     });
//                     // Fin de l'ajout du like dans la base de données
//                 } else {
//                     console.log("Impossible d'aimer");
//                 }
//             }
//         });
// });

// function aimer(id, users) {
// // Ajout du like dans la base de données
// connexion.query({
//     sql: "INSERT INTO aime (id_idee, id_users) VALUES (?, ?)",
//     timeout : 40000,
//     values: [id, users]
// }, function (err, row, field) {
//     if (err) {
//         console.log("Impossible d'ajouter un like : " + error);
//         res.sendStatus(500);
//         throw error;
//     }
// });
// Fin de l'ajout du like dans la base de données
//}