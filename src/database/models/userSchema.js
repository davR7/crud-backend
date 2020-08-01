const mongoose = require('../index')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    }
})

module.exports = mongoose.model('user', userSchema)