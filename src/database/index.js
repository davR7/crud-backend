const mongoose = require('mongoose')
const {host, user, pass, port, db} = require('../config/db') 

const url = `mongodb://${user}:${pass}@${host}:${port}/${db}`

const options = {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise
}

try {
    mongoose.connect(url, options)
}catch(error){
    console.error(error)
}

mongoose.connection.on('error', (error) => {
    console.error(error)
})

module.exports = mongoose