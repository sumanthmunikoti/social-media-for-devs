const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate('user');
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)

        const newPost = new Post({
            text: req.body.text,
            user: req.body.userId
        })

        const savedPost = await newPost.save()

        return res.json(savedPost)
    } catch (e) {
        return res.status(500).json('server error');
    }

})


router.put('/like/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const filteredPost = post.likes.filter(like => like.user.toString() === req.body.userId);

        if (filteredPost.length > 0) {
            return res.status(400).json('You have already liked the post');
        } else {
            const like = { user: req.body.userId };
            post.likes.push(like);
            await post.save();
            res.json(post.likes);
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('Server error');
    }
})

module.exports = router