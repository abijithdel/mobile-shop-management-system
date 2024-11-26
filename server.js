const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const app = express()

// EJS
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.use(express.static("public"));

// Routers
const mainRouter = require('./routers/main')

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router Middleware's
app.use('/', mainRouter)

const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>console.log(`Server Running.! Port: ${PORT}`))