const express = require('express')

const authController = require('./auth.routes')
const subscriberController = require('./subscriber.routes')
const updatesController = require('./update.routes')

const router = express.Router()

router.get('/', function(req, res, next) {
    res.send('Welcome to OhMy backend')
})

router.post('/login', authController.login)
router.post('/registration', authController.registration)

router.get('/getAllUsers', authController.getAllUsers)


router.get('/getAllSubscriber', subscriberController.getAllSubscriber)
router.post('/addSubscriber', subscriberController.addSubscriber)

router.post('/addUpdates', updatesController.addUpdate)
router.get('/getUserUpdate', updatesController.getUserUpdate)

router.get('/getFriendsUpdate', updatesController.getFriendsUpdate)

module.exports = router