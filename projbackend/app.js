require('dotenv').config();

const mongoose=require("mongoose");
const express =require("express");
const app=express();
const bodyParser =require("body-parser");
const cookieparser =require("cookie-parser");
const cors =require("cors");


const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");


//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("DB Connected");
});



//middleware

app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());



// Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)


app.get("/",(req,res)=>{
    res.send("this is home page");
});


//server connection
const port =process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server started ${port}`);
})
