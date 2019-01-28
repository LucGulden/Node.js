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
            id_role: userData.id_role,
            id_centre: userData.id_centre
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
}