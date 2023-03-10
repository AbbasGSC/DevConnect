const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        console.log(req.user.id);
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
