const mongoose = require('mongoose')
const Joi = require('joi')

// creating the schema
const userSChema = new mongoose.Schema({
    name : {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
        trim : true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 100
    },
    ticket: {
        type: String,
        maxlength: 100,
        minlength: 10
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1200
    }
})

// creating the model
const User = mongoose.model('Users', userSChema)

// validating the inputs
const validateUsers = (user) => {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().min(10).max(100).required(),
        ticket: Joi.string().max(100).min(10),
        password: Joi.string().min(8).max(100).required()
    }

    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUsers
exports.userSChema = userSChema