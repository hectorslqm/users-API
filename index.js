const mongoose = require('mongoose')
require('dotenv').config();

const mongoURI = process.env.MONGO_URI
mongoose.connect(`${mongoURI}`)

const User = mongoose.model('User', {
    username: String,
    age: Number,
})

const create = async (name) => {
    const user = new User({
        username: name,
        age: 30,
    })
    const savedUser = await user.save()
    console.log(savedUser)
}
const deleteUser = async (name) => {
    const result = await User.deleteOne({ username: name });
    //or 
    // const result = await User.findOne({ username: name })
    // if (user){
        // await result.remove()
    // }
    console.log(result);
}

const allUsers = async () => {
    const users = await User.find();
    console.log(users);
}

// Retrieve the first user that matches the name
const findUser = async (name) => {
    const user = await User.findOne({ username: name })
    console.log(user)
}

//Retrieve the users that match the name
const findUsers = async (name) => {
    const user = await User.find({ username: name })
    console.log(user)
}

//update a value
const update = async (name) => {
    const user = await User.findOne({ username: name })
    user.age = 31
    await user.save()
}

deleteUser('sLili')
//create('Lili')
//allUsers()
//findUser('Lili')
//findUsers('Lili')