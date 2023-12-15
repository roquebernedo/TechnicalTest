const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/Product')
const app = express()
const cors = require('cors')
const Order = require('./models/Order')

app.use(express.json())
mongoose.connect("mongodb+srv://roquebernedo:extreme123@cluster0.ezxtpm7.mongodb.net/?retryWrites=true&w=majority")

app.use(cors())

app.get("/", async (req, res) => {
    try{
        const response = await Product.find({})
        res.json(response)
    } catch (err){
        res.json(err)
    }
})

app.post("/", async (req, res) => {
  const body = req.body
  
  const product = new Product({
    name: body.name,
    unitPrice: body.unitPrice,
    qty: body.qty
  })
  
  const savedProduct = await product.save()
  res.json(savedProduct)
});

let orderCounter = 1

app.post('/order', async (req, res) => {
    const body = req.body
    //const user = req.user

    // Recuperar productos por sus IDs
    const products = await Product.find({}). select('name');
    console.log(products)

    // Verificar si todos los IDs corresponden a productos válidos
    if (products.length !== body.name.length) {
      return res.status(400).json({ message: 'Al menos un ID de producto no es válido' });
    }
    

    


  
    const order = new Order({
      name: body.name,
      Order: orderCounter++,
      Date: new Date(),
      Products: body.products,
    })
  
    const savedOrder = await order.save()
    //user.blogs = user.blogs.concat(savedBlog._id)
    //await user.save()
    
    res.json(savedOrder)  
})

app.get("/order", async (req, res) => {
    try{
        const response = await Order.find({})
        res.json(response)
    } catch (err){
        res.json(err)
    }
})
  
const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})