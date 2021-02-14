const express = require('express');
const router = express.Router();

const {isSignedIn, isAutenticated, isAdmin}=require("../controllers/auth");
const {getUserById, pushOrderInPurchaseList}=require("../controllers/user");
const {getOrderById, getAllOrder, createOrder, updateStaus, getOrderStaus}= require("../controllers/order")
const {updateStock}= require("../controllers/product")

router.param("userId", getUserById);
router.param("orderId", getOrderById);

//create
router.post("/order/create/:userId",
isSignedIn, 
isAutenticated, 
pushOrderInPurchaseList, 
updateStock, 
createOrder);

router.get("/order/all/:userId", 
isSignedIn,
isAutenticated,
isAdmin, 
getAllOrder)

//order status
router.get("/order/status/:userId",isSignedIn,
isAutenticated,
isAdmin, 
getOrderStaus)

router.put("/order/:orderId/status/:userId",
isSignedIn,
isAutenticated,
isAdmin, 
updateStaus
)


module.exports = router;