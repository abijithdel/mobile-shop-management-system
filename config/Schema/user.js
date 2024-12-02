const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    email: { type:String },
    password: { type:String },
    admin: { type:Boolean, default: false },
    role_info: [{
        store_id: { type:String },
        role_id: { type:String }
    }]
})

module.exports = mongoose.model('user', UserModel)