const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('UserSchema')
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hash
        })

        await user.save((err) => {
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
})

router.post('/login',async(req,res)=>{
    const user = await User.collection.find({email:req.body.email}).toArray()

    bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
        if(result==true){
            res.send("success")
        }
        else{
            res.send("fail")
        }
    });
})

module.exports = router