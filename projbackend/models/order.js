const mongoose = require("mongoose");
const{ObjectId}=mongoose.Schema;


const ProductCartSchema = new  mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"product"
    },
    name:String,
    count:Number,
    price:Number
});

const OrderSchema =new mongoose.Schema({
    products:[ProductCartSchema],
    transition_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"user"
    }
},{timestamps:true});




const Order = mongoose.model("Order",OrderSchema)

const ProductCart = mongoose.model("ProductCart",ProductCartSchema)


module.exports ={Order, ProductCart}


