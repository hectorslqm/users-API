const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const user = require('./user.controller')
const app = express()
const port = process.env.PORT
const mongoURI = process.env.MONGO_URI

app.use(express.json())
mongoose.connect(`${mongoURI}`)

app.get('/users', user.list)
app.post('/users', user.create)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.destroy)

//This indicate to the midleware that the app will use the static files in the app folder so the user can render the multiple files inside app/
app.use(express.static('app'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})