const mongoose = require('mongoose')

let userSchema = mongoose.Schema;

let User = new userSchema({
    userName: String,
    room: Number
})

module.exports = mongoose.model('activeUsers', User)