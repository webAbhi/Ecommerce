const express = require('express');
const router = express.Router();

const {isSignedIn, isAutenticated, isAdmin}=require("../controllers/auth");
const {getProductById, createProduct, getProduct,getAllUniqueCategories,  photo, getAllProduct, updateProduct, deleteProduct}=require("../controllers/product");
const {getUserById}=require("../controllers/user");



//params

router.param("productId",getProductById);
router.param("userId",getUserById);

//all routes
router.post("/product/create/:userId",
isSignedIn, 
isAutenticated,
isAdmin, 
createProduct)


//reading
router.get("/product/:productID",getProduct)
router.get("/product/photo/:productID",photo)


//delete 
router.delete("/product/:productId/:useId",
isSignedIn, 
isAutenticated, 
isAdmin,
deleteProduct)


//update

router.put("/product/:productId/:useId",
isSignedIn, 
isAutenticated, 
isAdmin,
updateProduct)

//listing
router.get("/product", getAllProduct)

router.get("/products/categories", getAllUniqueCategories)




module.exports= router;