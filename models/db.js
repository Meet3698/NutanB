const mongoose = require('mongoose')
mongoose.connect("API",{useNewUrlParser:true},(err)=>{
    if(!err) console.log('connected!');
    else console.log(err);
})

require('./User.model')
require('./product.model')
require('./size.model')
require('./order.model')
