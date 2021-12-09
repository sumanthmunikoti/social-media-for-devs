const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile')
const mongoose = require('mongoose')

router.post('/me', async (req, res) => {

    try {
        const profile = await Profile.find({
            user: mongoose.Types.ObjectId(req.body.userId)
        })

        console.log(profile.experience)
        res.json(profile);

    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
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
        res.status(500).send('Server error')
    }
})


router.delete('/phone', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: mongoose.Types.ObjectId(req.body.userId)
        });
        profile.phone = ''
        await profile.save()
        res.json({ msg: 'Phone number deleted' })
    } catch (e) {
        console.err(e.message);
        res.status(500).send('Server Error');
    }
})

router.put('/experience', async (req, res) => {
    console.log("Here")
    const {
        userId,
        title,
        company,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: userId })
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Server error')
    }
})


router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user')
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'There are no profiles'
        }));
});

module.exports = router