// import statements
const express = require('express')
const app = express()
const methodOverride = require('method-override')


// Mongo Database config
const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/"
const logs = require('./models/logs')
// mongoose connection
mongoose.connect(mongoURI,()=> {
    console.log('mongoose connected to MongoDB')
})



// configure app
const PORT = 3000
app.set('view engine', 'ejs')

// middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))

// body-parser middleware - creates a req.body{}
// app.use((req,res,next)=>{
//     console.log(req.body)
//     next()
// })
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
    logs.find({}, (err,foundLogs)=>{
        // console.log(foundLogs)
        res.render('index.ejs', {
            logs:foundLogs
        })
    })
  
})

// create route POST
app.post('/logs/new', (req,res) => {
    console.log(req.body)
    if(req.body.shipIsBroken === "on"){
       req.body.shipIsBroken = true
   }else {
       req.body.shipIsBroken = false
   }

    logs.create(req.body)
   // logs.push(req.body)
    res.redirect('/logs/')
})

// Show Route
app.get('/logs/:id',(req,res)=>{
    console.log([req.params.id])
    const id=req.params.id
    // res.send(logs[req.params.id])
    logs.findById(id,(err,foundLogs)=>{
        res.render('show.ejs',{logs:foundLogs})
    })
    //     log:logs[req.params.id]
    // })
})

// Edit Route
app.get('/logs/:id/edit', (req,res)=>{
    logs.findById(req.params.id, (err,foundLogs)=>{
        res.render('edit.ejs', {
            logs: foundLogs, id:req.params.id
        
        })
    })

})


// Delete Route
app.delete('/logs/:id', (req,res)=>{
    const deletelogs = (err,deleteMsg) => {
        console.log(deleteMsg)
        res.redirect('/logs/')
    }

    logs.findByIdAndDelete(req.params.id, deletelogs)
})


// Put Route
app.put('/logs/:id',(req,res)=> {
    logs.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedLogs) => {
        if(err){
            return res.send(err)
        }
        // console.log(req.body)
        console.log(updatedlogs)
        res.redirect('/logs')
    })
    // res.json(req.body)
})


// Server
app.listen(PORT, ()=>console.log('Listening on port:', PORT))