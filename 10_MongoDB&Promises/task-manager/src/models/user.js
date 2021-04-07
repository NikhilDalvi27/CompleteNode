const mongoose = require('mongoose');
const validator = require('validator');


// todo Creating a user model and enforcing the data type on each property
const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            //todo Validator library used
            if(!validator.isEmail(value)){
                throw  new Error(`Email is Invalid`);
            }
        }
    },

    age:{
        type:Number,
        //todo can have custom validation
        default:0,
        validate(value){
            if(value<0){
                throw new Error(`Age must be positive number`);
            }
        }

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error(`Password should not contain string password`);
            }
        }
    }
})

module.exports = User;

