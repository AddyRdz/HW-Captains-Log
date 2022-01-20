// import statements
const express = require('express')
const methodOverride = require('method-override')
const app = express()

// Mongo Database config
const mongoose = require('mongoose')
const URI = "mongodb://127.0.0.1:27017/"

// mongoose connection
mongoose.connect(URI,()=>console.log('mongoose connected at '+URI))

const logs = require('./models/logs')

// configure app
const PORT = 3000
app.set('view engine', 'ejs')

// middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))

// body-parser middleware - creates a req.body{}
app.use((req,res,next)=>{
    console.log(req.body)
    next()
})
app.get('/',(req,res)=>{
    console.log('hitting home route')
    res.send('home route')
})
// routing - logs

//  new route
app.get('/logs/new',(req,res) =>{
    console.log('new route on')
    res.render('new.ejs')
 })

// index route
app.get('/logs/', (req,res)=> {
    Log.find({}, (err,foundLogs)=>{
        res.render('index.ejs'), {
            logs:foundLogs
        })
    })
  
})

// create route POST
app.post('/logs/', (req,res) => {
    console.log(req.body)
    if(req.body.shipIsBroken === "on"){
       req.body.shipIsBroken = true
   }else {
       req.body.shipIsBroken = false
   }

    res.send(req.body)
   // logs.push(req.body)
   res.redirect('/logs/')
})



// Server
app.listen(PORT, ()=>console.log('Listening on port:', PORT))