// Imports
var Idea = require('../model/appIdeaModel.js');
var jwtUtils = require('../../utils/jwt.utils');

// List all ideas
exports.list_all_ideas = function(req, res) {
  Idea.getAllIdea(function(err, result) {
    if (err)
      res.send(err);
    res.json(result);
  });
};


// Create an idea in database
exports.create_an_idea = function(req, res) {
  var headerAuth = req.headers['authorization'];
  var userRole = jwtUtils.getUserRole(headerAuth);

  if (userRole == 1 || userRole == 2 || userRole == 4) {
    var new_idea = new Idea(req.body);

    //handles null error 
    if(!new_idea.titre_idee || !new_idea.description_idee || !new_idea.id_users){
      res.status(400).send({ error:true, message: 'Please provide idea/description/user' });  
    }
    else{
      Idea.createIdea(new_idea, function(err, id) {
        if (err)
          res.send(err);
        res.json(id);
      });
    }
  } else {
    return res.status(400).json({ 'error': "Vous n'avez pas les autorisations nécessaires. Connectez vous pour pouvoir poster une idée"  });
  }
};

// Get an idea by id
exports.read_an_idea = function(req, res) {
  Idea.getIdeaById(req.params.ideeId, function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};

// Update an idea
exports.update_an_idea = function(req, res) {
  Idea.updateById(req.params.ideeId, new Idea(req.body), function(err, idea) {
    if (err)
      res.send(err);
    res.json(idea);
  });
};

// Delete an idea
exports.delete_an_idea = function(req, res) {


  Idea.remove(req.params.ideaId, function(err, idea) {
    if (err)
      res.send(err);
    res.json({ message: 'Idea successfully deleted' });
  });
};