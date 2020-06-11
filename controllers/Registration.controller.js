const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('UserSchema')

router.post('/', async (req, res) => {
    const user = new User(req.body)
    console.log(user);
    
    await  user.save((err) => {
        if (err) {
            if (err.keyPattern.email == 1) {
                res.send("Email")
            }
            if (err.keyPattern.phone == 1) {
                res.send("Phone")
            }
        }
        else {
            res.send("Success")
        }
    })
})

module.exports = router