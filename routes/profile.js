const { request } = require('express')
const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile')

router.get('/me', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        })
        .populate('user', ['name'])
    }
})