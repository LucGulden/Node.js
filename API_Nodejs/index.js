//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express
var express = require('express');

//On définit ici les paramètres du serveur.
var hostname = 'localhost';
var port = 3000;

//Instantiation du serveur
var app = express();
 

//C'est à partir de cet objet monRouteur, que l'on va implémenter les méthodes
var monRouteur = express.Router();

//Route pour les evenements
monRouteur.route('/Evenements')
// Implémentation des méthode GET, PUT, UPDATE et DELETE
//GET
.get (function(req, res) {
    res.json({message : "Liste de tous les évènements prévus", methode : req.method});
})
//POST
.post(function(req, res) {
    res.json({message : "Ajoute un nouvel évènement", methode : req.method});
})
//PUT
.put(function(req,res){ 
    res.json({message : "Mise à jour des informations d'un évènement", methode : req.method});
})
//DELETE
.delete(function(req,res){ 
res.json({message : "Suppression d'un évènement", methode : req.method});  
});

monRouteur.route('/')
// all permet de prendre en charge toutes les méthodes. 
.all(function(req,res){ 
      res.json({message : "Bienvenue sur notre API ", methode : req.method});
});


//On demande à l'application d'utiliser notre routeur
app.use(monRouteur);


// On démarre le serveur
app.listen(port, hostname, function(){
    console.log("Le serveur fonction sur http://" + hostname + ":" + port + "\n" + "Test 2");
});