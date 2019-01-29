var Like = require('../model/appLikeModel.js');
var jwtUtils = require('../../utils/jwt.utils');

exports.set_a_like = function(req, res) {
    var headerAuth = req.headers['authorization'];
    var userRole = jwtUtils.getUserRole(headerAuth);

    var new_like = new Like(req.body);
  
    if (userRole == 1 || userRole == 2 || userRole == 4) {
        //handles null error 
        if(!new_like.id_idee || !new_like.id_users){

            res.status(400).send({ error:true, message: 'Please provide id_idea/id_user' });

        } else {
        
            Like.checkLike(new_like.id_idee, new_like.id_users, function(err, like) {
        
                if (err) {
                    res.send(err);
                } else {
                    if (like == true) {
                        Like.setLike(new_like, function(err, result) {
                            if(err) {
                                res.send(err);
                            } else {
                                res.send("Vous avez liké");
                            }
                        });
                    } else {
                        res.sendStatus(403);
                    }
                }
            });
        }
    } else {
        return res.status(400).json({ 'error': "Vous n'avez pas les autorisations nécessaires. Connectez vous pour pouvoir liker une idée"  });
    }
};

exports.get_a_like = function(req, res) {
    Like.getLikeById(req.params.ideeId, function(err, result) {
        if (err)
          res.send(err);
        res.json(result);
      });
};