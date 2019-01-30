// Imports
const sql = require('../../Config/databaseLocal.js');

// Idea object constructor
var Idea = function (idea) {
    this.titre_idee = idea.titre_idee;
    this.description_idee = idea.description_idee;
    this.id_users = idea.id_users;
};

// Function to create an Idea in database
Idea.createIdea = function (newIdea, result) {

    const queryString = "INSERT INTO idee SET ?"; 

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [newIdea]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                result(error, null);
                throw error;
            } else {
                result(null, rows.insertId);
            }
        });       
};

// Fonction to get an idea
Idea.getIdeaById = function (ideaId, result) {
    // Définition des paramètre de requête
    const queryString = "SELECT * FROM idee WHERE id_idee = ?";

    // Execution de la requête et envoie des données
    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [ideaId]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                result(error, null);
                throw error;
            } else {
                console.log("Succès de la requête GET");
                result(null, rows);
                console.log(rows);
            }
        });   
};

//Function to get all ideas in database
Idea.getAllIdea = function (result) {

    // Définition des paramètre de requête
    const queryString = "SELECT * FROM idee";

    // Execution de la requête et envoie des données
    sql.query({
        sql: queryString,
        timeout: 40000
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                result(error, null);
                throw error;
            } else {
                result(null, rows);
            }
        });
};

Idea.updateById = function(id, idea, result){

    const queryString = "UPDATE idee SET ? WHERE id_idee = ?";

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [idea, id]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                result(error, null);
                throw error;
            } else {
                result(null, rows);
            }
    });
};

Idea.remove = function(id, result){

    const queryString = "DELETE FROM idee WHERE id_idee = ?";

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [id]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux idées : " + error);
                result(error, null);
                throw error;
            } else {
                result(null, rows);
            }
    });
};

module.exports = Idea;