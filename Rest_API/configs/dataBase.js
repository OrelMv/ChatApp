const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/activeUsersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
