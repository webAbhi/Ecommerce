


const User=require("../models/user");
const { check,validationResult } = require('express-validator');
var expressjwt =require('express-jwt');
var jwt=require('jsonwebtoken');


exports.signup=(req,res)=>{


    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }


    const user= new User(req.body);
    user.save((err,user)=>{
        if(err || !user){
            console.log(err);
            return res.status(400).json({
                err:"Not able to save "
               
            })
        }
        res.json(user);

    })
    
};


exports.signin=(req,res) => {

    const {email,password}=req.body;
    console.log(password);

    const errors=validationResult(req);


    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        });
    }

    User.findOne({email},(error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error:"User email not found"
            });
        }
        if(!user.autenticate(password)){
            return res.status(401).json({
                error:"email and password do not match"
            });

        }

        //token creation
        const token =jwt.sign({_id:user._id},process.env.MYSECREAT)


        //putting token in cookie{
            res.cookie("token",token,{expire:new Date() + 9999});
            // final response

            const{_id,email,role,name}=user;
            return res.json({token,user:{_id,name,email,role}});


    })

};

exports.signout=(req,res)=>{
    res.send("user signout from controller");

}






