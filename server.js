require('./models/db')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 4000

const RegistrationController = require('./controllers/Registration.controller')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/register',RegistrationController)
// app.use('/user',UserController)

app.listen(port,()=>{
    console.log("listening on "+port);
})