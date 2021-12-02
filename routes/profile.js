const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile')

router.get('/me', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        .populate('user')

        //check to see if there's no profile
        if (!profile) {
            return response.status(400).json({msg: 'Profile for this user does not exist!'})
        }
        //if there is a profile
        await response.json(profile);
    } catch (e) {
        console.error(e.message);
        response.status(500).send('Server Error');
    }
})

module.exports = router