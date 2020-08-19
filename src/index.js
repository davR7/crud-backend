const middlewares = require('./config/middlewares')
const routes = require('./routes/routes')
const {errorHandler} = require('./config/serv_exceptions')
const express = require('express')
const app = express()
const port = 3000

middlewares(app)
routes(app)

//exceptions and server configuration
app.use((req, res, next) =>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    errorHandler(error, res)
})

app.listen(port, () => {
    const url = ` http://localhost:${port}`
    const color = '\x1b[36m%s\x1b[0m'
    console.log('Server running on port:'+ color, url)
})



