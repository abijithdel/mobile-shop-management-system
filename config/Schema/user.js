const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    email: { type:String },
    password: { type:String },
    admin: { type:Boolean, default: false },
})

module.exports = mongoose.model('user', UserModel)