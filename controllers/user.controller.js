const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('UserSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

router.post('/login', async (req, res) => {
    const user = await User.collection.find({ email: req.body.email }).toArray()

    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result == true) {
            jwt.sign({ email: req.body.email }, 'wolfpack.com', (err, token) => {
                res.json({
                    token: token,
                    message : 'success'
                })
            })
        }
        else {
            res.send("fail")
        }
    });
})

router.post('/verify',(req,res)=>{
    jwt.verify(req.body.token, 'wolfpack.com',(err,authData)=>{
        if(err){
            res.json({message : false})
        }else{
            res.send({message : true})
        }
    })
})

// function verifyToken(req,res,next){
//     const bearerToken = req.body.token
//     if(typeof bearerToken !== 'undefined'){
//         req.token = bearerToken
//         next()
//     }else{
//         res.sendS
//     }
// }

module.exports = router