const controllers = require('../controllers/userCtl')

module.exports = app => {
    app.route('/users')
        .get(controllers.findAll)
        .post(controllers.create)
    app.route('/users/:id')
        .put(controllers.update)
        .delete(controllers.remove)
}