const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

//todo Schema used for using functionality of Middleware

//todo note that the email is marked unique
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        unique:true,
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
    },
    tokens:[{
        token:{
            type : String,
            required:true
        }
    }]
});

//todo this won't be stored in the Document since it's virtual
// it's just the way for Mongoose to figureOut how the two models are related
userSchema.virtual('tasks',{
    ref:'Task',
    localField :'_id',
    foreignField:'owner'
});
//todo ForeignField is for the ref Model(task) task
// localField is for the current Model(user)

//todo this is for data Hiding
// Note we don't explicitly call this method
// This is called implicitly when we do res.send()
// bcoz res.send() calls JSON.Stringify()

userSchema.methods.toJSON = function(){
        const user = this;
        const userObject = user.toObject();

        delete userObject.password;
        delete userObject.tokens;

        return userObject;
}


//todo methods are accessible on the instances
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    //todo generate the jwt
    const token =  jwt.sign({_id:user._id.toString()},'thisismynewcourse');

    //todo save the token
    user.tokens = user.tokens.concat({token})
    await user.save();

    return token;
}



//todo here we are attaching our new method to user schema
// statics method are accessible on the model
userSchema.statics.findByCredentials =  async (email,password)=>{
    //todo note this is short hand syntax for email:email
    const user = await User.findOne({ email });

    //todo if user with that email is not found
    if(!user){
        throw  new Error(`Unable to login`);
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error(`Unable to login`);
    }

    return user;
}



//todo this is something to be done before users are saved
userSchema.pre('save',async function (next) {
    //todo here this points to the document being saved
    const user = this;

    //todo if the password is changed then hash the new
    // password and then save it
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    //todo next is to be called when we are done
    // its like return
    next();
})


// todo Creating a user model and enforcing the data type on each property
const User = mongoose.model('User',userSchema)

module.exports = User;

