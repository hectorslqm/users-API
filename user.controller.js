const Users = require('./User')
const User = {
    get: async (req, res) => {
        const { id } = req.params
        const user = await Users.findOne({ _id: id })
        res.status(200).send(user)
    },
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req, res) => {
        const user = new Users(req.body)
        try {
            const savedUser = await user.save()
            res.status(201).send(savedUser._id)
        } catch (err) {
            res.status(400).send({error: 'Error while creating the user.', details: err.message})
        }
    },
    update: async (req, res) => {
        try{
            const { id } = req.params
            const user = await Users.findOne({ _id: id })
            Object.assign(user, req.body)
            await user.save()
            res.sendStatus(204)
        } catch (err) {
            res.status(400).send({error: 'Error while updating the user.', details: err.message})
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params
        await Users.deleteOne({ _id: id })
        res.sendStatus(204)
    },
}

// Export the User object
module.exports = User