const nodeMailer = require('nodemailer');
const config = require('./configuration');

exports.sendMail = function(req,res){
const transporter = nodeMailer.createrTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,

  auth:{
    user: config.central_mail,
    password: config.central_password
  }
});

const mailOptions = {
    from: config.central_mail,
    to:req.body.to,
    subject:req.body.subject,
    text:req.body.text,
    html:req.body.html
};

transporter.sendMail(mailOptions,(err,info)=>{
  if(error)
  {
    console.log(err);
    res.status(400).send(err);
  }
  else{
    res.status(200).send({success:true});
  }
});
}






























// var emailManager = {};
// const mailer = require('nodemailer');
// var config = require('./configuration');
// //for config email and password
// var transport;
//
// emailManager.createrTransport = function (){
//   transport = mailer.createrTransport({
//     host: 'smtp.google.com',
//     port: 587,
//     //service = 'Gmail',
//     auth:
//         {
//           user:config.central_mail,
//           password:config.central_password
//         }
//   });
//
//
// emailManager.sendEmail = function(to,subject,bodyTEXT){
//   var mailOptions = {
//     from:config.central_mail,
//     to:to,
//     subject:subject,
//     bodyTEXT:bodyTEXT
//     //bodyHTML:bodyHTML
//   }
//   transport.sendMail(mailOptions,function(err,info){
//     if(err){
//       return console.log(err);
//     }
//     else{
//       return console.log("MAIL SENT");
//     }
//   });
// }
//
// }
