const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    fullname:
            {
              type:String,
              required:true,
              minlength:2
            },
    email:
          {
            type:String,
            required:true,
            validate:
                    {
                      validator:validator.isEmail,
                      message:'{VALUE} is not email'
                    }
          },
    password:
          {
            type:String,
            required:true,
            minlength:6
          },
    created:
          {
            type:Date,
            default:Date.now
          },
    token:
            {
                type:String,
                require:true
            }

  }
);

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password,this.password);
};


//for unique email:-
UserSchema.index({email:1},{unique:true});

var User = mongoose.model('user',UserSchema);
module.exports = User;
