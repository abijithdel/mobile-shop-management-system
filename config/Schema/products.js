const mongoose = require('mongoose')

const ProductModel = new mongoose.Schema({
    name: { type:String },
    store_id: { type:String },
    category: { type:String },
    price: { type:String },
    add_date: { type:String },
    img: { type:String, default: 'default-product.png' },
})

module.exports = mongoose.model('product', ProductModel)