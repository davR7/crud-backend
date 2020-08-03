const mongoose = require('../index')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator(v){
              return /^[a-z][a-z\s]*$/i.test(v)
            },
            message: props => `${props.value} is not a valid name!`
        },
        required: [true, "Please enter name."]
    },
    fone: {
        type: String,
        validate: {
            validator(v){
              return /^[0-9]*$/.test(v)
            },
            message: props => `${props.value} is not a valid fone!`
        },
        required: [true, "Please enter fone."]
    },
    email: {
        type: String,
        validate: {
            validator(v){
              return /\S+@\S+\.\S+/.test(v)
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique: [true, "Email must be unique."],
        lowercase: true,
        required: [true, "Please enter email."]
    }
})

module.exports = mongoose.model('user', userSchema)