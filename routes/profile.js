const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile')
const mongoose = require('mongoose')

router.post('/me', async (req, res) => {

    console.log(req.body)

    try {
        const profile = await Profile.find({
            user: mongoose.Types.ObjectId(req.body.userId)
        })

        console.log('profile', profile)
        res.json(profile);

    } catch (e) {
        console.error(e.message);
        response.status(500).send('Server Error');
    }
})

module.exports = router