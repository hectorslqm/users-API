const mongoose = require('mongoose')
// Define the User model schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    lastname: {
        type: String,
        required: true,
        minLength: 3
    }
})

module.exports = Users