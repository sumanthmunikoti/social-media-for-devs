const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/auth', async (req, res) => {
    try {
        console.log(req.body.email)
        // const user = await User.findById
    } catch (err) {

    }
})

module.exports = router;