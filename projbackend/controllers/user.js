const User =require("../models/user")



exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error:"no user was found"
            });
        }
        req.profile = user;
        next();

    });
};

exports.getUser = (req, res) => {
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;


    return res.json(req.profile);
};




exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, userFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    err:"Update failed"
                })
            }
            user.encry_password = undefined;
            user.salt = undefined;
            return res.json(user);
        }

    )
}