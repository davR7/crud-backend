const controllers = require('../controllers/userCtl')

module.exports = app => {
    app.route('/')
        .get(controllers.getAll)
}