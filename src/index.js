const middlewares = require('./config/middlewares')
const routes = require('./routes/routes')
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
    const {status, message } = error
    res.status(status || 500)
    res.json({ error: message })
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost${port}`)
})



