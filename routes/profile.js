const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile')
const mongoose = require('mongoose')

router.post('/me', async (req, res) => {

    try {
        const profile = await Profile.find({
            user: mongoose.Types.ObjectId(req.body.userId)
        })

        res.json(profile);

    } catch (e) {
        console.error(e.message);
        response.status(500).send('Server Error');
    }
})

router.post('/phone', async (req, res) => {

    const phoneNumber = req.body.phone;

    try {
        const profile = await Profile.findOne({
            user: mongoose.Types.ObjectId(req.body.userId)
        })

        profile.phone = phoneNumber;
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server error')
    }
})

module.exports = router