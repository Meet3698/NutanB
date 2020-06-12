const mongoose = require('mongoose')

const ProductSizeSchema = new mongoose.Schema({
    productName : {
        type : String
    },
    XS : {
        type : Number
    },
    S : {
        type : Number
    },
    M : {
        type : Number
    },
    L : {
        type : Number
    },
    XL : {
        type : Number
    },
    XXL : {
        type : Number
    }
})

mongoose.model('ProductSizeSchema',ProductSizeSchema)