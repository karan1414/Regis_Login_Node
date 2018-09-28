const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const User=require('../models/user_model');
const config = require('../config/configuration');


//route to post registration data
router.post('/register_user',(req,res)=>{
  var newUser = new User(req.body);

  newUser.password = bcrypt.hashSync(req.body.password,10);
  var token = jwt.sign({_id:newUser._id , fullname:newUser.fullname , email:newUser.email , password : newUser.password },config.secret);
  newUser.token = token;
  //jwt.verify for decoding

  newUser.save().then((newUser)=>{
    if(!newUser)
    {
      res.status(404).send();
    }

      res.send("Congratulations You Are Now Registered");
      // res.sendFile(__dirname + '/views/login.html');
  }).catch((err)=>{
    res.status(400).send(err);
  });

});

//Routers for change password




//-------------SIGNIN-----------------------------//

//routers for sign in
router.post('/sign_in',(req,res)=>{
  User.findOne({email:req.body.email}).then((user)=>{
    if(!user)
    {
      res.status(401).send("Authentication Failed User not found");
    }
      // res.send("SIGNED IN");
      else if(user)
      {
        // console.log(req.body.password);
        // console.log(user.password);
        if(user.comparePassword(req.body.password))
        {
          
          //res.send("SIGNED IN");
          res.sendFile('index.html', {root: './views'});

        }
        else
        {
          res.status(401).send("Authentication Failed. Password not found");
        }

      }


  }).catch((err)=>{
    res.send(err);
  });
});

//---------------------------------------------------------------

module.exports = router
