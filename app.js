// import statements
const express = require('express')
const app = express()

// const methodOverride =require('method-override')

// const mongoose = require('mongoose')

// configure app
const PORT = 8000

app.set('view engine', 'ejs')

// middleware
// app.use(methodOverride('_method'))
// app.use(express.urlencoded({extended: false}))
// body-parser middleware - creates a req.body{}

// routing - logs

//  new route
app.get('/logs/new',(req,res) =>res.render('new.ejs'))

// index route
app.get('/logs/', (req,res)=> res.send('logs index'))

// create route POST
app.post('/logs/', (req,res) => res.send('create logs'))

app.get('/',(req,res)=>{
    console.log('hitting home route')
    res.send('home route')
})

// Server
app.listen(PORT, ()=>console.log('Listening on port:', PORT))