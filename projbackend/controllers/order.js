const {Order, ProductCart} = require("../models/order")



exports.createOrder =(req, res) =>{
    req.body.order.useer= req.profile;
    const order = new order (req.body.order)
    order.save((err, order) => {
        if(err){
            return ress.status(400).json({
                err:"failedd to savedd your order in DB"
            })
        }
        return res.json(order);
    })
}

exports.getOrderById =(req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
        if(err){
            return res.stats(400).json({
                err:"No order fouund"
            })
        }
        res.order=order;
        next();
    })
}

exports.getAllOrder = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
        if(err){
            return res.status(400).json({
                err:"No order found"
            })
        }
        return res.json(orders);

    })
}

exports.updateStatus =(req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set:{status: req.body.status}},
        (err, order) => {
            if(err){
                return res.status(400).json({
                    err:"failed to update status"
                })
            }
            return res.json(order)
        }
        
        )
}

exports.getOrderStaus =(req, res) => {
    return res.json(Order.schema.path("status").enumValues)
}