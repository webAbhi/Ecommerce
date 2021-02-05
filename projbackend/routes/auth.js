var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

const {signout,signup}=require("../controllers/auth")



router.post("/signup",[
    check("name","name should be atlease 3 char").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password","password should be atlease 5 char").isLength({ min: 5 })

],signup)
router.get("/signout",signout);



module.exports = router;