const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const indexRoute = require('./routes/index.routes')

const app = express() 

const PORT = process.env.PORT || 6000

const URL =  "mongodb+srv://Dru1DD:ZshoIbBe5aAglBoA@cluster0.7gucy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(cors())
app.use(express.json({
    extended: false
}))

app.use('/', indexRoute)

const start = async () => {
    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on PORT ${PORT}... `)
            console.log('Change index.js file to see updates...')
        })
    } catch(e) {
        console.log(e)
    }
}


start()