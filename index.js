const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Joi = require('Joi')
// const joi-ObjectId = require('joiObjectId')(Joi)
const users = require('./routes/users')

// middlewares
app.use(express.json())
app.use('/api/users', users)

// connection string
mongoose.connect('mongodb://localhost/logistics', {
    useNewUrlParser : true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
})
    .then(()=> console.log('Connected to the database successfully...'))
    .catch(er => console.log(er))

// port defnation
const port = process.env.PORT || 7500
app.listen(port, () => console.log(`Connected to port ${port}`))