exports.signout=(req,res)=>{
    res.send("user signout from controller");

}


exports.signup=(req,res)=>{
    res.json({
        message:"Signup route works"
    });
;
}