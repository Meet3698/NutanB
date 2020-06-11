const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://meet:Meet@3698@anonymous-edqd9.mongodb.net/Nutan?retryWrites=true&w=majority",{useNewUrlParser:true},(err)=>{
    if(!err) console.log('connected!');
    else console.log(err);
})

require('./User.model')