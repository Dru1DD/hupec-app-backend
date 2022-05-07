const User = require('../models/user.model')

class SubscriberController {
    async getAllSubscriber(req, res) {
        try {
            const { username } = req.body
            
            const { subscribers, subscriptions } = await User.find({ username })
 

            return res.json({
                subscribers,
                subscriptions
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Ошибка при загрузке подписчиков' })
        }
    }

    async addSubscriber(req, res) {
        try {
            const {  username, userID, subscriberName, subscriberID } = req.body

            const candidate = User.find({ username })

            let isSubscriberYet = false
            let isSubscriptionYet = false

            candidate.subscribers ? candidate.subscribers.map((item) => {
                if(item.username === subscriberName) isSubscriberYet = !isSubscriberYet
                console.log(isSubscriberYet)
            }) : null

            candidate.subscriptions ? candidate.subscriptions.map((item) => {
                if(item.username === subscriberName) isSubscriptionYet = !isSubscriptionYet
            }) : null

            if(isSubscriberYet === false) {
                await User.findOneAndUpdate({
                    username
                }, {
                    $push: {
                        subscribers: {
                            subscriberName,
                            subscriberID
                        }
                    }
                }) 
            }
            
            if(isSubscriptionYet === false){

                await User.findOneAndUpdate({
                    username: subscriberName
                }, {
                    $push: {
                        subscriptions: {
                            subscriptionsName: username,
                            subcriptionsID: userID
                        }
                    }
                })  
            }
            
            res.json({
                message: 'Подписка добавлена'
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Ошибка при подписке. Попробуйте снова'})
        }
    }
}

module.exports = new SubscriberController()