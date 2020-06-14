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
    const prevOrder = await Order.collection.find({ $and: [{ email : req.body.email},{productName: req.body.productName }, { productSize: req.body.productSize },{orderStatus : "Cart"}] }).toArray()
        
    if (prevOrder.length === 0) {

        req.body.productPrice = req.body.productQuantity*req.body.productPrice

        const order = new Order(req.body)
        await order.save(err => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.sendStatus(200)
            }
        })
    }
    else{
        const quantity = prevOrder[0].productQuantity + req.body.productQuantity
        const price = req.body.productPrice * quantity
        Order.collection.updateOne(
            {$and : [{email : req.body.email},{productName : req.body.productName},{productSize:req.body.productSize}]},
            {$set :{productQuantity : quantity,productPrice : price }}
        )
        res.sendStatus(200)
    }
})

router.post('/getcart', async (req, res) => {
    const cart = await Order.collection.find({ $and: [{ email: req.body.email }, { orderStatus: "Cart" }] }).toArray()
    if (cart.length === 0) {
        res.json({ message: "empty" })
    }
    else {
        res.send(cart)
    }
})

router.post('/deletecard', async (req, res) => {
    const discard = await Order.collection.deleteOne({ id: req.body.id })
    res.sendStatus(200)
})

router.post('/getcount', async (req, res) => {
    const count = await Order.collection.find({$and :[{ email: req.body.email},{orderStatus : "Cart"}]}).toArray()

    if (count.length === 0) {
        res.json({ message: "empty" })
    } else {
        res.json({ message: count.length })
    }
})

router.post('/updatecart',async(req,res)=>{
    await Order.collection.updateMany(
        {$and : [{email : req.body.email}, {orderStatus : "Cart"}]},
        {$set : {orderStatus : "Accepted"}}
    )

    res.sendStatus(200)
})


module.exports = router