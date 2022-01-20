const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    title: {
        type: String, require: true, default: "Title"
    },
        entry: {
            type: String, require: true, default: "Entry"
        },
            shipIsBroken : {
                type: Boolean, require: true, default: "true"
            }

},   {timestamps:true})

const logs = mongoose.model("logs", logsSchema)

module.exports = logs