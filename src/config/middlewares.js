const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const frontendUrl = 'http://localhost:8080'

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet())
    app.use(cors({ "origin": frontendUrl }))
}