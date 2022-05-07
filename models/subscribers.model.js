const { Schema, model } = require('mongoose')

const Subscriber = new Schema({
    userID: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    }, 
    subscriberID: {
        type: String,
        unique: true,
        required: true
    }
})