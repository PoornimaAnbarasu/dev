const express= require("express");
const router= express.Router();

const Profile= require("../../models/Profile");
const User=require("../../models/User")

const auth=require("../../middleware/auth");

const {check,validateResult, validationResult}= require("express-validator");
const config = require("config");


router.get("/",auth,async (req,res)=>{
        
    try {
        let profile= await Profile.findOne({user: req.user.id}).populate("user",["name","avatar"]);
        if(!profile)
            return res.status(400).json({error:[{msg:"No profile for this user"}]});
        res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


//Profile update
router.post("/",
    [auth,[
    check("status","Status is required").not().isEmpty(),
    check("skills","Skills is required").not().isEmpty()]], 
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()});
        
        const{
              company,
              website,
              location,
              status,
              skills,
              bio,
              githubusername
        }=req.body;

        //Build profile object
        const profileFields={};
        profileFields.user=req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(skills) {
            profileFields.skills = skills.split(",").map(skill=>skill.trim());
            console.log(profileFields.skills);
        }
        if(bio) profileFields.bio =bio;
        if(githubusername) profileFields.githubusername=githubusername;

        try {

            let profile= await Profile.findOne({user:req.user.id});
            
            //Update an existing profile
            if(profile){
                profile= await Profile.findOneAndUpdate({user:req.user.id},
                    {$set:profileFields},
                    {new:true});
                   console.log("Old profile updated");
                return res.json(profile);
            }
            
            //Create a new profile for the user
            profile = new Profile(profileFields);
            console.log("new profile updated");
            await profile.save();
            res.json(profile);
                                               
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error")
        }
})


//delete user and profile
router.delete("/",auth, async (req,res)=>{
        
    try {
        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findByIdAndRemove({ _id:req.user.id });
       
        res.json({msg: "User deleted"});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
module.exports=router;