const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.post('/',[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const post = new Post({
            text:req.body.text,
            name:req.body.name,
            avatar:user.avatar,
            user:req.user.id
        });
        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
});

router.get('/',auth,async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});

router.get('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'post not found'});
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});

router.delete('/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'post not found'});
        }
        if(post.user.toString()!== req.user.id){
            return res.status(500).json({msg:'authentication went wrong'});
        }


        await post.remove();

        return res.status(200).json({msg:'post removed'});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});

router.put('/like/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:'post already liked'});
        }

        post.likes.unshift({user : req.user.id});

        await post.save();

        return res.status(200).json(post.likes);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});

router.put('/unlike/:id',auth,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:'post has not yet been liked'});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex,1);

        await post.save();

        return res.status(200).json(post.likes);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});


router.post('/comments/:id',[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const comment = new Post({
            text:req.body.text,
            name:req.body.name,
            avatar:user.avatar,
            user:req.user.id
        });

        post.comments.unshift(comment);

        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
});

router.delete('/comment/:id/:comment_id',auth , async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if(!comment){
            return res.status(404).json({msg:'comment does not exist'});
        }

        if(comment.user.toString() !==req.user.id){
            return res.status(404).json({msg:'user not authorized'});
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex,1);

        await post.save();

        return res.json(post.comments);
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
});

module.exports = router;
