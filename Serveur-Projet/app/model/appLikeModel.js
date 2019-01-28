const sql = require('../../Config/databaseLocal.js');

var Like = function(like) {
    this.id_idee = like.id_idee;
    this.id_users = like.id_users;
};

Like.setLike = function (newLike, result) {

    const queryString = "INSERT INTO aime SET ?"; 

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [newLike]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux likes : " + error);
                result(error, null);
                throw error;
            } else {
                result(null, rows);
            }
        });       
};

Like.checkLike = function (idea, user, result) {
    const queryString = "SELECT * FROM aime WHERE id_idee = ? AND id_users = ?"; 

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [idea, user]
        }, function(error, rows, fields) {
            if(error) {
                console.log("Impossible d'accéder aux likes : " + error);
                result(error, null);
                throw error;
            } else if (rows[0] == null) {
                result(null, true);
            } else {
                result(null, false);
            }
        });  
};

Like.getLikeById = function(ideaId, result) {
    const queryString = "SELECT * FROM aime WHERE id_idee = ?";

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


module.exports = Like;