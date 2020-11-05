const mongoose = require('mongoose')
const userModel = require('../database/models/userSchema')

module.exports = {
    async findAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 0
            
            const data = await userModel.find().limit(limit)
                .skip((page - 1) * limit)
            
            const count = await userModel.countDocuments()

            res.header('X-Total-Count', count)
            return res.json({
                users: data,
                totalcount: count,
                limit,
                page
            })
        } catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {
        const user = { ...req.body }

        if (await userModel.findOne({ email: user.email }))
            return res.status(400).json({ error: 'User already exists' })

        try {
            await userModel.create(user)
            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
    async update(req, res, next) {
        const user = { ...req.body }
        const userId = req.params.id

        try {
            const idIsValid = mongoose.Types.ObjectId.isValid(userId)
            if (!idIsValid) 
                return res.status(422).json({ error: 'Invalid id' })
            
            const dbUser = await userModel.findByIdAndUpdate(userId, user)
            if (!dbUser)
                return res.status(204).json()
                
            return res.json()
        } catch(error) {
            next(error)
        }
    },
    async remove(req, res, next) {
        const userId = req.params.id

        try {
            const idIsValid = mongoose.Types.ObjectId.isValid(userId)
            if (!idIsValid) 
                return res.status(422).json({ error: 'Invalid id' })
            
            const dbUser = await userModel.findByIdAndRemove(userId)
            if (!dbUser)
                return res.status(204).json()
            
            return res.json()
        } catch(error) {
            next(error)
        }
    }
}
