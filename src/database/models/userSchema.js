const mongoose = require('../index')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator(v){
              return /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/i.test(v)
            },
            message: props => `Name format is invalid!`
        },
        required: [true, "Please enter name."]
    },
    email: {
        type: String,
        validate: {
            validator(v){
              return /\S+@\S+\.\S+/.test(v)
            },
            message: props => `Email format is invalid!`
        },
        unique: [true, "Email must be unique."],
        lowercase: true,
        required: [true, "Please enter email."]
    },
    phone: {
        type: String,
        validate: {
            validator(v){
              return /^[0-9]*$/.test(v)
            },
            message: props => `Phone format is invalid!`
        },
        required: [true, "Please enter phone."]
    }
})

module.exports = mongoose.model('user', userSchema)