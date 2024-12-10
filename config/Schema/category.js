const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
    name: { type:String },
    store_id: { type:String },
})

module.exports = mongoose.model('category', CategoryModel)