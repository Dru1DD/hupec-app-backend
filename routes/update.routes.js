const User = require('../models/user.model')

class UpdateController {
    async getUserUpdate (req, res) {
        try {
            const { username } = req.body

            const candidate = await User.find({ username })
            
            const updates = candidate.updates ? candidate.updates : []

            res.json({ updates })

        } catch (e) {
            console.log(e.message)
            res.status(400).json({ message: 'Не удалось загрузить обновления' })
        }
    }

    async getFriendsUpdate (req, res) {
        try {
            
            const { username } = req.params 

            const user = await User.find({ username })

            console.log(username)
            const subscriptions = user[0].subscriptions
            
            const getUpdates = async () => {

                if (subscriptions.length === 0) return []
                
                const updates = await subscriptions.map(async (item) => {
                    const friend = await User.find({
                        username: item.subscriptionsName
                    })
    
                    let update = {
                        friendName: friend[0].username,
                        friendUpdates: friend[0].updates
                    }

                    return update
                })

                return Promise.all(updates)
            }

            const friendsUpdate = await getUpdates()

            res.json({
                friendsUpdate
            })

        } catch(e) {
            console.log(e.message)
            res.status(400).json({
                message: 'Не удалось получить обновления друзей'
            })
        }
    }


    

    async addUpdate (req, res) {
        try {
            const { username, data, textBody } = req.body

            await User.findOneAndUpdate({
                username
            }, {
                $push: {
                    updates: {
                        data,
                        textBody
                    }
                }
            })

            res.json({ message: 'Пост добавлен' })
        } catch (e) {
            console.log(e.message)
            res.status(400).json({
                message: 'Не удалось добавить обновление'
            })
        }
    }
}

module.exports = new UpdateController()