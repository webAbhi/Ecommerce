import mongoose from 'mongoose';
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

var userSchema = new Schema({
  name: {
      type:String,
      required:true,
      maximum:32,
      trim:true
  },
  lastname:{
      type:String,
      required:true,
      maximum:32,
      trim:true

  },
  email:{
      type:String,
      trim:true,
      required:true,
      unique:true
  },
  encry_password:{
      type:String,
      required:true
  },
  salt:String,
  role:{
      type:Number,
      default:0

  },
  purchases:{
      type:Array,
      defauly=[]
  }
},{timestamp:true});




userSchema.virtual("password")
          .set(function(password){
              this._password=password
              this.salt=uuidv4();
              this.encry_password=this.securePassword(password);
          })
          .get(function(){
              return this.password 
          })
     

userSchema.methods={


    autenticate:function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password(plainpassword)

    },
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try{
            crypto.createHmac('sha256', this.salt)
                   .update(plainpassword)
                   .digest('hex');

        }catch{
            return "";
        }

    }
}





module.exports=mongoose.model("user",userSchema)