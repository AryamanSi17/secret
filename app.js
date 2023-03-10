require('dotenv').config()
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose")
const encrypt=require("mongoose-encryption");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema=new mongoose.Schema ({
  email:String,
  password:String
});

userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']});
const User=new mongoose.model("User",userSchema);
app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});
app.post("/login",function(req,res){
  const userName=req.body.username;
  const password=req.body.password;
  User.findOne({email:userName},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password===password){
          res.render("secrets");
        }
      }
    }
  });
});
app.get("/register",function(req,res){
  res.render("register");
});
app.post("/register",function(req,res){
  const newUser=new User({
    email:req.body.username,
    password:req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("secrets");
    }
  });
});

app.get("/secrets",function(req,res){

});

app.get("/submit",function(req,res){

});

app.get("/logout", function(req,res){

});

















app.listen(3000,function(){
  console.log("server started on port 3000");
});
