const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt')

// get users
router.get('/', async (req, res) => {
    const users = await User.find().sort('-1')
    if (!users) return res.status(404).send('There are no users yet')
    res.send(users)
})

// getting user by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send('That user does not exist')
    res.send(user)
})

// post request
router.post('/', async (req, res) => {
    // error checking
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).send('User with that email exists')
    
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        ticket: req.body.ticket,
        password: req.body.password,
    })


    try {
        const salting = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salting)

        await user.save()
        res.send(user)
    } 
    
    catch (er) {
        console.log(er)
    }


})

// put request
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // updating a given users
    const user = await User.findOneAndUpdate(req.params.id, {
        $set : {
            name: req.body.name,
            email: req.body.email,
            ticket: req.body.ticket,
            password: req.body.password,
        }, 
        new : true
    })
    
    if (!user) return res.status(404).send('That user does not exist')

    try {
        const salting = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salting)

        await user.save()
        res.send(user)
    } 
    
    catch (er) {
        console.log(er)
    }
})

// deleting the users
router.get('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send('That user does not exist')
    res.send(false)
})

module.exports = router