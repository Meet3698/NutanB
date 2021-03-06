const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Product = mongoose.model('ProductSchema')
const Size = mongoose.model('ProductSizeSchema')
const Order = mongoose.model('OrderSchema')
const Users = mongoose.model('UserSchema')
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
    const discard = await Order.collection.deleteOne({ _id: mongoose.Types.ObjectId(req.body.id) })
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

router.post('/getorders',async (req,res)=>{
    const orders = await Order.collection.find({$and : [{email : req.body.email}, {orderStatus : {$ne: "Cart"}}]}).toArray()

    if(orders.length === 0){
        res.sendStatus(404)
    }else{
        res.send(orders)
    }
})

router.post('/filter',async(req,res)=>{
    const c = (req.body.productType.length !== 0) ? req.body.productType : ["Kurti","Bottom","Three Piece"]
    const s = (req.body.productSize.length !== 0) ? req.body.productSize : ["XS","S","M","L","XL","XXL"]
    const p = (req.body.productPriceGroup.length !== 0) ? req.body.productPriceGroup : [1,2,3]
    // const filter = await Product.collection.find({productType : {$in : c}}).toArray()
    const filter = await Product.collection.find({$and:[{productType : {$in : c}},{productSize : {$in : s}},{productPriceGroup : {$in : p}}]}).toArray()
    // const filter = await Product.collection.find({productSize : {$cond : {if : {$ne : [s.length,0]},then : {$in : s}}}}).toArray()
    res.send(filter)
})

router.post('/getallorders', async (req, res) => {
    const orders = await Order.collection.find({orderStatus : {$ne: "Cart"}}).toArray()
    if (orders.length === 0) {
        res.sendStatus(404)
    }
    else {
        res.send(orders)
    }
})

router.post('/addproduct', async(req, res) => {
        const product = new Product({
           productName: req.body.productName, 
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productSize: req.body.productSize,
            productStock: req.body.productStock,
            productColor: req.body.productColor,
            productLength: req.body.productLength,
            productCare: req.body.productCare,
            productComposition: req.body.productComposition,
            productStyleNo: req.body.productStyleNo,
            productCategory: req.body.productCategory,
            productType: req.body.productType
        })
        console.log(product)

        await product.save((err) => {
            if (err) {
                res.sendStatus(err)
            }
            else {
                res.sendStatus(200)
            }
        })
    })

    router.post('/getstatistics', async(req, res) => {
        const users = await Users.collection.find().toArray()
        const products = await Product.collection.find().toArray()
        const obj = {
            "users" : users.length,
            "products" : products.length
        }
        res.send(obj)
    })

    router.post('/changestatus', async(req,res) => {
        console.log(req.body.id)
        await Order.collection.updateOne(
            {_id : mongoose.Types.ObjectId(req.body.id)},
            {$set :{orderStatus : req.body.value}}
        )
        res.sendStatus(200)
    })
module.exports = router