const USER_MODEL = require('../models/userModel');
const bcrypt = require('bcryptjs'); 
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const loginController = async (req,res) => { 
    console.log(req.body, "step 1");
    try{
        const {email,password} = req.body;
        const user = await USER_MODEL.findOne({email:email});
        console.log(user,"step 2");
        if(!user){
            res.status(200).json({message:'user not found',token:null});                       
        }
        if(user){
            bcrypt.compare(password,user.password, (err,hashRes) => {
                console.log(hashRes,"step 3");
                if(hashRes){
                    console.log("Password matches - step 4");
                    const token = jwt.sign({userId:user._id,name:user.name,role:user?.role},process.env.JWT_PASSWORD, {expiresIn:'2d'});
                    res.status(200).json({message:'valid credentials',token:token});
                }
                else{                
                    res.status(200).json({message:'invalid credentials',token:null});
                }

            })                                   
        }
        else{
            res.status(200).json({message:'unauthorized user',token:null});            
        }
    }catch(error){        
        console.log(error);
    }
};

const registerController = async (req,res) => {
    try{        
        // const {name,email,phone,password,confirmpassword} = req.body;
        const findUser = await USER_MODEL.findOne({email:req.body.email});
        if(findUser){
            console.log("User with email already registered");
            res.status(200).json({message:'user already registered'});
            return //the code below it will not work if email already exist
        }
        console.log('sign up data', req.body);
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            console.log(hash);
            USER_MODEL({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                country:req.body.country,
                password:hash
            }).save().then((response)=>{
                res.status(200).json({message:'signup successfull'});
            });
        });        
        
    }catch(err){
        console.log(err);
        res.status(200).json("error registering");
        console.log(err);
    }    
}

module.exports= {loginController,registerController}