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

router.get('/get/:id', async (req, res) => {
    // extract request data
    const { id } = req.params;

    try {

        const post = await Post.findOne({ _id: id })
        if (!post) {
            res.status(404).json({ message: "Nenhum resultado encontrado!" });
        }
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// UPDATE (PUT, PATCH)
router.patch('/update/:id', async (req, res) => {
    const { id } = req.params
    const { img, content } = req.body

    const person = {
        img,
        content
    }

    try {
        const post = await Post.updateOne({ _id: id }, person)

        if (post.matchedCount === 0) {
            res.status(404).json({ message: "Nenhum resultado encontrado!" });
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// DELETE 
router.delete('/destroy/:id', async (req, res) => {
    const { id } = req.params;

    const post = await Post.findOne({ _id: id })

    if (!post) {
        res.status(404).json({ message: "Nenhum resultado encontrado!" });
    }

    try {

        await Post.deleteOne({ _id: id });
        res.status(200).json({ message: "Removido" })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})


module.exports = router;