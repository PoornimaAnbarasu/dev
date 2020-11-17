const express=require("express");
const router= express.Router();

const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth= require("../../middleware/auth");

const {check,validationResult}=require("express-validator");
const User = require("../../models/User");

router.get("/",auth, async (req,res)=>{
    try {
        const user= await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send("Server Error");
    }
    });

router.post("/",[
    
    check("email","Please include an email").isEmail(),
    check("password","Please enter a password").exists()
    ],
    
    async(req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        try {
            const {email, password}=req.body;

            // Check whether the user already exist
            let user = await User.findOne({email});
            if(!user)
                return res.status(400).json({error:[{msg:"Invalid Credentials"}]});

            //Check email address with the password
            const isMatch = await bcryptjs.compare(password,user.password);
            if(!isMatch)
                 return res.status(400).json({error:[{msg:"Invalid Credentials"}]});
           
            // Get the jsonwebtoken
            const payload={
                user:{id:user.id}
            }
            jwt.sign(payload,
                config.get("jwtSecret"),
                {expiresIn: 3600},
                (err,token)=>{
                    if(err) throw err
                    res.json({token})
                    

            })
            
        } catch (errors) {
                console.error(errors.message);
                res.status(500).send("Server Error")
            
        }

        
    });
    
module.exports=router;