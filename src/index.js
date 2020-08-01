const middlewares = require('./config/middlewares')
const routes = require('./routes/routes')
const express = require('express')
const app = express()
const port = 3000

middlewares(app)
routes(app)

app.listen(port, () => {
    console.log(`Server running on port http://localhost${port}`)
})



