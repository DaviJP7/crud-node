require('dotenv').config()
const express = require('express')
const app = express();
const port = 3001;
const { USERDB, PASSDB } = process.env
const mongoose = require('mongoose')

// app config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use(require('./routes/web'))

mongoose.connect(
    `mongodb+srv://${USERDB}:${PASSDB}@cluster0.rumrbsa.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log('DB connected successfully')
}).catch((error) => console.log(error))

app.listen(port, () => console.log("Server Started in: 127.0.0.1:" + port))