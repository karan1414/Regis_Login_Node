const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const regisRouter = require('./routers/regis_router');
const forgotPassword = require('./routers/reset_password');
const mongoose = require('mongoose');
const dbConfig = require('./config/configuration');
const User = require('./models/user_model');


// app.use(express.static(__dirname + '/views'));

//Store all html files in views.
//__dirname : it will resolve to your project folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));//important while getting stuff from template
//create routes

app.use('/regis',regisRouter);

app.use('/reset_password',forgotPassword);

app.get('/registration',(req,res)=>{
  res.sendFile(__dirname + '/views/registration.html');
});

app.get('/sign_in',(req,res)=>{
  res.sendFile(__dirname + '/views/sign_in.html');
});

app.get('/forgot_password',(req,res)=>{
  res.sendFile(__dirname+ '/views/forgot_password.html');
});

app.get('/',(req,res)=>{
  res.send("HOME");
});

//mongoose connection
mongoose.connect(dbConfig.url,{ useNewUrlParser: true }).then(()=>{
  console.log("---------------Database connected-----------------");
}).catch((err)=>{
  console.log(err);
});





//start server

app.listen(3000,()=>{
  console.log("Server started at http://localhost:3000");
});
