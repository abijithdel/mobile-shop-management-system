const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/mss'

mongoose.connect(URL)
.then(response => console.log(`Connected!`))
.catch(error => console.error(`Mongoose Error ${error}`))