module.exports = function(app) {
    var ideaController = require('../controller/appIdeaController');
    var likeController = require('../controller/appLikeController');
    var userController = require('../controller/appUsersController');
  
    // todoList Routes
    app.route('/idee')
        .get(ideaController.list_all_ideas)
        .post(ideaController.create_an_idea);
     
    app.route('/idee/:ideeId')
        .get(ideaController.read_an_idea)
        .put(ideaController.update_an_idea)
        .delete(ideaController.delete_an_idea);

    app.route('/aime')
        .post(likeController.set_a_like);

    app.route('/aime/:ideeId')
        .get(likeController.get_a_like);

    app.route('/users/login/')
        .post(userController.login);
};