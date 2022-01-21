const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    title: {
        type: String,     
    },
    entry: {
        type: String,         
    },
        shipIsBroken : {
                type: Boolean, 
                default: true
        }
},  {timestamps: true})   

const logs = mongoose.model("logs", logsSchema)

module.exports = logs