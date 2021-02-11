const User =require("../models/user")
const Orders =require("../models/order")



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

exports.userPurchaseList = (req, res) => {
    Orders.find({user: req.profile._id})
    .populate('user','_id name')
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error:"No product found"
            });
        }
        res.json(order);
    });


}


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases =[]
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id:product._id,
            name: product.name,
            decription: product.description,
            category :product.category,
            quantity: product.quantity,
            amouunt: req.body.order.amount,
            transaction_id: req.body.order.transaction_id

        });
    });

    //database part
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new:true},
        (err,purchases) => {
            if(err){
                return res.status(400).json({
                    err: "Unable to save"
                })
            }
            next();
        }
    );

};