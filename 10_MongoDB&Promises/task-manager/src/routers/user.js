const express = require('express');
const User = require('../models/user');
const router =  new express.Router();
const auth = require('../middleware/auth');

//todo only the signup and login route are going
// to be public rest all will be accessible after
// authentication... i.e client needs to provide the authentication token
// and server will validate before performing that request



router.post('/users',async (req,res)=>{
    //todo creating instance of the model
    const user = new User(req.body);
    //todo to save the instance use methods available on that instance
    try {
        await user.save();
        //todo Generate a token and return it to the yser
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});
    }catch (e) {
        res.status(400).send(e);
    }

})

//todo login request will send back a Authentication Token
router.post('/users/login',async (req,res)=>{
    try {
        //todo here findByCredentials is custom defined by us
        // in the user model...this function works as a Middleware
         const user = await User.findByCredentials(req.body.email,req.body.password);

         const token = await user.generateAuthToken();

        //todo this is an object sent using shortHand Syntax
         res.send({user,token})
    }catch (e) {
        res.status(404).send();
    }
})


//todo IMP
// Note how auth middleware is added to individual Routes
// Routes will run only if the middleware calls next ....not otherwise

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save();
        res.send();
    }catch (e) {
        res.status(500).send();
    }
})


router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens=[];
        await req.user.save();
        res.send()
    }catch (e) {
        res.status(500).send();
    }
})


router.get('/users/me',auth, async (req,res)=>{
    //todo Note that the user  was set on the request in the auth function
    res.send(req.user)

})

// router.get('/users/:id',async (req,res)=>{
//     //todo creating instance of the model
//     const _id = req.params.id;
//     try {
//         //todo Note that Mongoose itself converted the _id to   new ObjectID(_id)
//         const user = await User.findById(_id);
//
//         if(!user)
//             return res.status(404).send();
//         return res.send(user);
//     }catch (e) {
//         res.status(500).send();
//     }
//
// })

//todo UPDATE
router.patch('/users/me',auth,async (req,res)=> {

    const updates   =   Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation)
    {
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try {
        //todo findByIdAndUpdate is a method that is described in  mongoose
        // new will return the updated User

        // console.log(1);
        // const user  = await User.findById(req.params.id);

        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save();


        //todo Note that this by-passes mongoose - performs direct update on the Database
        // const user  = await User.findByIdAndUpdate(req.params.id,req.body,{new :true,runValidators:true})

        res.send(req.user);

    }
    catch (e) {
        console.log(2);
        res.status(500).send(e);
    }
})

//todo Delete
router.delete('/users/me',auth,async (req,res)=>{
    try {
        // const user = await  User.findByIdAndDelete(req.user._id);
        //
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove();

        res.send(req.user);
        //res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }

})


module.exports = router