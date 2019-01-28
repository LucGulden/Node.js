const mysql = require('mysql');

// Définitions de propriété de la BDD
const connection = mysql.createConnection({
    // Propriétés de la BDD
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_web_local',
    port: 3308
});

// Connexion à la BDD
connection.connect(function(error) {

    if (error) throw error;
    console.log("Connecté à la base de données");
});

module.exports = connection;