const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth=require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
//const { remove } = require("../../models/User");


//Get all the post
router.get("/", auth, async(req, res)=>{
try {

    const post = await Post.find().sort({date: -1});
    res.json(post);
    
} catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    
}
});

//Add a new post
router.post("/", [auth,
    [check("text","text is required").not().isEmpty()]], 
    async(req,res)=>{
       
        const errors= validationResult(req);
        
       
        if(!errors.isEmpty())
            return res.status(400).json({msg:errors.array()});
        
        
        try {
            const user = await User.findById(req.user.id).select("-password");

            const newPost = new Post({
                
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            });
    
            const post = await newPost.save();
            res.json(post);
 
            
        } catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
            
        }
    
});

//Delete a post created by the same user
router.delete("/:id", auth, async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        
        //check if post belongs to the user
        if(post.user.toString() !== req.user.id)
            return res.status(400).json({msg: "User not authorized"});
        await post.remove();
        res.json(post);

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error");
        
    }
});

//Like a post 
router.put("/like/:id",auth, async(req,res)=>{
    try {
       const post= await Post.findById(req.params.id);

        //check if the post is already liked by the user
        //console.log(post.likes.filter(like => like.user.toString()));
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
            return res.status(400).json({msg: "Already Liked"});
        
        //like a post 
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

//Unlike a post
router.put("/unlike/:id", auth, async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0)
            return res.status(400).json({msg: "Post not yet liked"});

        // Unlike a post
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})
module.exports=router;