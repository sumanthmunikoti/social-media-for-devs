const express = require('express');
const router = express.Router();
const Post = require('../models/post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate('user');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router