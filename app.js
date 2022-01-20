// import statements
const express = require('express')
const app = express()


// configure app
const PORT = 3000

app.set('view engine', 'ejs')

// middleware

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
  res.send('logs index')
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
   // res.redirect('/logs/')
})



// Server
app.listen(PORT, ()=>console.log('Listening on port:', PORT))