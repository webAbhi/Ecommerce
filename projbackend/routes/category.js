const express = require('express');
const router = express.Router();

const{getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} =require ("../controllers/category")
const{isSignedIn,isAutenticated,isAdmin} =require ("../controllers/auth")
const{getUserById} =require ("../controllers/user")


router.param('userId',getUserById)
router.param('categoryId',getCategoryById)


// main router

router.post("/category/create/:userId",
 isSignedIn,
 isAutenticated,
 isAdmin,
 createCategory);

// read
 router.get("/category/:categoryId", getCategory)
 router.get("/categories", getAllCategory)

//update

router.put("/category/:categoryId/:userId",
 isSignedIn,
 isAutenticated,
 isAdmin,
 updateCategory);


 //delete
 router.delete("/category/:categoryId/:userId",
 isSignedIn,
 isAutenticated,
 isAdmin,
 removeCategory);

module.exports= router;