const mongoose = require('mongoose')

const StoreModel = new mongoose.Schema({
    name: { type:String }
})

module.exports = mongoose.model('store', StoreModel)