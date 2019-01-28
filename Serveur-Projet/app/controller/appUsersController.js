var bcrypt = require('bcryptjs');
var jwtUtils = require('../../utils/jwt.utils');
var User = require('../model/appUserModel');

// Routes
exports.login = function(req, res) {
    var mail_user = req.body.mail_user;
    var mdp_user = req.body.mdp_user;

    if (mail_user == null || mdp_user == null) {
        return res.status(400).json({ 'error': 'missing parameter'});
    } else {
        User.searchUser(mail_user, function(err, result) {
            if(err) {
                return res.send(err);
            } else {
                if(result) {
                    bcrypt.compare(mdp_user, result[0].mdp_user, function(errBycrypt, resBycrypt) {
                        if(resBycrypt) {
                            return res.status(200).json({
                                    'id_users': result[0].id_users,
                                    'token': jwtUtils.generateTokenForUser(result[0])
                            });
                        } else {
                            return res.status(403).json({ 'error': 'invalid password' });
                        }
                    });
                } else {
                    return res.status(404).json({ 'error': 'user not exist in DataBase' });
                }
            }
            
        });
    }

    
}