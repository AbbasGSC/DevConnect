const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');
const User = require('../../models/User');

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Email is required').isEmail(),
    check('password','Password is required').isLength({min:6}),
    check('avatar','avatar is required').isEmpty(),
],async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

 

    try {
        let user =await User.findOne({ email:req.body.email });
        
        if(user){
            return res.status(200).json({errors:[{msg:'User already exists'}]});
        }
        
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10)
          });
        user.save();
        return res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
});
router.post('/login',async (req,res)=>{
    
    let user =await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){ 
        const payload = {
            user:{
                id: user.id,
            }
        }
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:3600000
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        });
        }else{
            return res.json({msg:'wrong credentials'});
        }
    }
    else{
        return res.json({msg:'user does not exists'});
    }
});
module.exports = router;
