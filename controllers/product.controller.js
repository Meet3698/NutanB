const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Product = mongoose.model('ProductSchema')
const Size = mongoose.model('ProductSizeSchema')
const Order = mongoose.model('OrderSchema')

router.get('/newarrival', async (req, res) => {
    const products = await Product.collection.find({ productCategory: "New Arrival" }).toArray()
    if (products.length === 0) {
        res.sendStatus(404)
    }
    else {
        res.send(products)
    }
})

router.post('/productdetail', async (req, res) => {
    const products = await Product.collection.find({ productName: req.body.productName }).toArray()
    if (products.length === 0) {
        res.sendStatus(404)
    }
    else {
        res.send(products)
    }
})

router.post('/getsize', async (req, res) => {
    const size = await Size.collection.find({ productName: req.body.productName }).toArray()
    if (size.length === 0) {
        res.sendStatus(404)
    }
    else {
        res.send(size)
    }
})

router.post('/addorder', async (req, res) => {
    const order = new Order(req.body)
    await order.save(err => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

router.post('/getcart',async (req, res) => {
    const cart = await Order.collection.find({ $and: [{ email: req.body.email }, { orderStatus: "Cart" }] }).toArray()
    if (cart.length === 0) {
        res.json({message : "empty"})
    }
    else {
        res.send(cart)
    }
})

router.post('/deletecard',async (req,res)=>{
    const discard = await Order.collection.deleteOne({id : req.body.id})
    res.sendStatus(200)
})

router.post('/getcount',async(req,res)=>{
    const count = await Order.collection.find({email:req.body.email}).toArray()
    
    if(count.length === 0){
        res.json({message : "empty"})
    }else{
        res.json({message : count.length})
    }
})
module.exports = router