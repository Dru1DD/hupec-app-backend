const User = require('../models/user.model')

class AuthController {
    async registration(req, res) {
        try {

            const { email, username } = req.body

            const candidate = await User.findOne({ email })

            if(candidate) {
                return res.status(400).json({ message: "Пользователь с таким email существует."})
            }

            const user = new User({ 
                email, 
                username,
                subscribers: [],
                subscriptions: [],
                updates: []
            })

            await user.save()

            return res.json({ message: "Пользователь успешно создан" })
            
        } catch(e) {
            res.status(400).json({ message: "Ошибка при создании пользователя. Проверьте данные на правильность и повторите снова" })
        }
    }

    async login (req, res) {
        try {
            const { email } = req.body

            const user = await User.findOne({ email })

            if(!email) {
                return res.status(400).json({ message: `Пользователь с почтой: ${email} не был найден`})
            }

            return res.json(user)
        } catch (e) {
            res.status(400).json({ message: 'Введены неправильно данные, попробуйте снова!'})
        }
    }

    async getAllUsers (req, res) {
        try {
            const users = await User.find()

            res.json(users)

        } catch (e) {
            res.status(400).json({ message: 'Ошибка при загрузке пользователей' })
        }
    }
}

module.exports = new AuthController()