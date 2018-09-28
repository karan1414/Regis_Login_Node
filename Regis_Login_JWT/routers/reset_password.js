const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const User=require('../models/user_model');
const config = require('../config/configuration');
const EmailManager = require('../config/email_manager');
const nodeMailer = require('nodemailer');



//-----------------------PASSWORD RESET-----------------------//

  //enter email address

  router.post('/passwordreset',(req,res)=>{
    var emailAddress = req.body.email;
    User.findOne({email:emailAddress}).then((user)=>{
      var token = user.token;

      let transporter = nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
          user:config.central_mail,
          pass:config.central_password
        }
      });

      let mailOptions = {
        from : '"PASSWORD RESET"<the email id specified in config which is to be used for sending the mails>',
        to:req.body.email,
        text:'Password request link is below',
        html:'<a href="http://localhost:3000/reset_password/resetpassword/' + token + '">Reset password</a>'
      };

      transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
          return console.log(err);
        }
        console.log("MEssage sent");
        res.send("Password Reset link sent");

      });
      //res.send('<a href="resetpassword/' + token + '">Reset password</a>');
    }).catch((err)=>{
      res.send(err);
    });
  });


//after clicking on reset password it will guide to the link below

  //router.get('/resetpassword/:token',(req,res)=>{
  router.get('/resetpassword/:token',(req,res)=>{
    var token = req.params.token;

    User.findOne({token : token}).then((user)=>{

      if(!user)
      {
        res.send("ERROR");
      }
      // console.log(req.params.token);
      res.send('<form action="/reset_password/resetpassword" method="post">' +
        '<input type="hidden" name="id" value="'+ user._id+'" />' +
        '<input type="hidden" name="token" value="' + user.token + '" />' +
        '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input type="submit" value="Reset Password" />' +
    '</form>');
    }).catch((err)=>{
      res.send(err);
    });
  });


  router.post('/resetpassword',(req,res)=>{
    token = req.body.token;
    id = req.body.id;

    // console.log(token);
    // console.log(id);
    // var query = {_id:id};
    User.findById(id).then((user)=>{
      user.password = bcrypt.hashSync(req.body.password,10);
      //hash password
      res.send(user);
      user.save();
    }).catch((err)=>{
      res.send(err);
    });
});


module.exports = router;
