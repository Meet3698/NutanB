const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Product = mongoose.model('ProductSchema')

router.get('/newarrival',async(req,res)=>{
    const products = await Product.collection.find({productCategory: "New Arrival"}).toArray()
    if(products.length === 0){
        res.sendStatus(404)
    }
    else{
        res.send(products)
    }
})

router.post('/productdetail',async(req,res)=>{
    const products = await Product.collection.find({productName: req.body.productName}).toArray()
    if(products.length === 0){
        res.sendStatus(404)
    }
    else{
        res.send(products)
    }
})

module.exports = router