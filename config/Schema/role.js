const mongoose = require('mongoose')

const roleeModel = new mongoose.Schema({
    store_id: { type:String },
    name: { type:String },
    add_product: { type:Boolean, default:false },
    add_sale: { type:Boolean, default:false },
    all_products: { type:Boolean, default:false },
    all_sales: { type:Boolean, default:false },
    manage_role: { type:Boolean, default:false },
    manage_user: { type:Boolean, default:false },
})

module.exports = mongoose.model('role', roleeModel)