// Imports
var jwt = require('jsonwebtoken');

// Token key
const JWT_SIGN_SECRET = '2jksxsdj6hckedk67dgs6hd9kdsl01jctawc7xdewlmp';

// Exported functions
module.exports = {
    // Generate Token
    generateTokenForUser: function(userData) {
        return jwt.sign({
            id_users: userData.id_users,
            id_role: userData.id_role
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        });
    },

    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserRole: function(authorization) {
        var userRole = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null) {
                    userRole = jwtToken.id_role;
                }
            } catch(err) { 
                return userRole;
            }
        }
        return userRole;
    }
}