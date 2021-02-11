const express=require("express")
const router =express.Router()

const {getUserById,getUser,updateUser}=require("../controllers/user");
const {isSignedIn,isAutenticated,isAdmin}=require("../controllers/auth");



router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAutenticated,getUser);

router.put("/user/:userId",isSignedIn,isAutenticated,updateUser);

module.exports =router;




