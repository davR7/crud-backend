const users = require('../database/models/userSchema')

module.exports = {
    async findAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 5
            
            const data = await users.find().limit(limit)
                .skip((page - 1) * limit).exec()
            
            const count = await users.countDocuments()

            res.header('X-Total-Count', count)
            return res.json({
                data,
                count,
                limit,
                page
            })
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        const user = { ...req.body }

        if (await users.findOne({ email: user.email }))
            return res.status(400).json({ error: 'User already exists' })

        try {
            await users.create(user)
            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        const user = { ...req.body }
        const userId = req.params.id

        try {
            await users.findByIdAndUpdate(userId, user)
            return res.send()
        } catch(error) {
            next(error)
        }
    },
    async remove(req, res, next) {
        const userId = req.params.id

        try {
            const delrow = await users.findByIdAndRemove(userId)
            if (!delrow) throw Error('User not found')
            return res.send()
        } catch(error) {
            error.status = 400
            next(error)
        }
    }
}