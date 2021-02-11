var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

const {signout,signup,signin,isSignedIn}=require("../controllers/auth");



router.post("/signup",[
    check("name","name should be atlease 3 char").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password","password should be atlease 5 char").isLength({ min: 5 })

],signup);


router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({ min: 1 })
],signin);



router.get("/signout",signout);


router.get("/testroute",isSignedIn,(req,res) => {
    res.send("protected");
});


module.exports = router;