const { Schema, model } = require('mongoose')

const Subscriber = new Schema ({
    subscriberName: {
        type: String,
        required: true
    },
    subscriberID: {
        type: String,
        required: true
    }
})

const Subscriptions = new Schema ({
    subscriptionsName: {
        type: String,
        required: true
    },
    subcriptionsID: {
        type: String,
        required: true
    }
})

const Updates = new Schema ({
    data: {
        type: String,
    },
    textBody: {
        type: String,
    }
})

const User = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    subscribers: [Subscriber],
    subscriptions: [Subscriptions],
    updates: [Updates]
})

module.exports = model('User', User)