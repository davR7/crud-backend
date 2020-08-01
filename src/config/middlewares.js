const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet())
    app.use(cors())
}