const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req,res,next)=>{
   try {

       const token = req.header('Authorization').replace('Bearer ','');
       //todo note the second parameter is the exact secret that was used while
       // generating the token
       const decoded  = jwt.verify(token,'thisismynewcourse');
       //todo search for the user with the following id
       // and the token value is there in the database

       const  user = await User.findOne({_id:decoded._id,'tokens.token':token})
       if(!user){
           throw new Error();
       }

       req.token = token;
       //todo give route handler the access to the user that we fetched from database
        req.user = user;

        //todo to ensure that the route handler runs
       next();
   }catch (e) {
       res.status(401).send({error:'Please authenticate correctly'})
   }
}

module.exports = auth;
