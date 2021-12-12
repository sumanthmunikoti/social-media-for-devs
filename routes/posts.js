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

router.get('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id).populate('user')
            .then(pst => pst)
        // // console.log(".....", post)
        // if (!post) return res.status(404).json('Cannot find post');
        return res.json(post);

    }
    catch (e) {
        console.log(e.message)
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

router.put('/unlike/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.body.userId).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.body.userId);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/comment/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post)
            return res.status(404).json('post not available');

        const comment = {
            user: req.body.userId,
            text: req.body.text
        }

        post.comments.push(comment)
        await post.save()
        res.json(post.comments)
    } 
    catch (e) {
        console.log(e)
        return res.status(500).json('server error')
    }
})

module.exports = router