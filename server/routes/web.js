const express = require('express')
var router = express.Router()
// models
const Post = require('../models/Post')

// Define
router.post('/store', async (req, res) => {
    const { img, content } = req.body

    if (!content) {
        res.status(422).json({ error: 'Sem dados!' })
    }
    const post = {
        img,
        content
    }

    // CREATE
    try {

        await Post.create(post)
        res.status(201).json({ message: 'Created Successfully' })

    } catch (error) {
        res.status(500).json({ error: error })
    }

    res.json('<h1>Hello World</h1>')
})

// Read
router.get('/get', async (req, res) => {

    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router;