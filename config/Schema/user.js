const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    email: { type:String },
    password: { type:String },
    role: { type:String, default: 'user' },
})

module.exports = mongoose.model('user', UserModel)