const mongoose = require('mongoose')
const Joi = require('Joi')

// the item schema
const itemSchema = new mongoose.Schema({
    itemNO : {
        type: Number,
        min: 0
    },
    itemTitle: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    itemText: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },
    location : {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    },

    // time
    piece: {
        type: String,
        min: 1,
        required: true
    }

})