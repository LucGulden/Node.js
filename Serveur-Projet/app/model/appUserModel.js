// Imports
const sql = require('../../Config/databaseUser');

// User object
var User = function(user) {
    this.nom_users = user.nom_users;
    this.prenom_users = user.prenom_users;
    this.mail_user = user.mail_user;
    this.mdp_user = user.mdp_user;
    this.id_role = user.id_role;
    this.id_centre = user.id_centre;
};

// searchUser function
User.searchUser = function(mail, result) {
    const queryString = "SELECT * FROM users WHERE mail_user = ?"; 

    sql.query({
        sql: queryString,
        timeout: 40000,
        values: [mail]
        }, 
        function(error, rows, fields) {
            if(error || rows[0] == null) {
                console.log(error);
                return result(error, null);
            } else {
                return result(null, rows);
            }
    });     
}

// Exports
module.exports = User;