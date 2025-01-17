const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const user = require('./user.controller')
const app = express()
const port = process.env.PORT
const mongoURI = process.env.MONGO_URI

app.use(express.json())
mongoose.connect(`${mongoURI}`)

app.get('/', user.list)
app.post('/', user.create)
app.get('/:id', user.get)
app.put('/:id', user.update)
app.patch('/:id', user.update)
app.delete('/:id', user.destroy)

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})