const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/auth', async (req, res) => {
    try {
        // console.log(req.body.email)
        const user = await User.find({"email": req.body.email})
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router