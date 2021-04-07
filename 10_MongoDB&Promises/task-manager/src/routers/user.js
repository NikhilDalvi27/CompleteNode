const express = require('express');
const User = require('../models/user');
const router =  new express.Router();

router.post('/users',async (req,res)=>{
    //todo creating instance of the model
    const user = new User(req.body);
    //todo to save the instance use methods available on that instance
    try {
        await user.save();
        res.status(201).send(user);
    }catch (e) {
        res.status(400).send(e);
    }

})



//todo GET

router.get('/users',async (req,res)=>{
    //todo creating instance of the model
    try{
        const users = await User.find({});
        res.send(users);
    }catch (e) {
        res.status(500).send();
    }

})

router.get('/users/:id',async (req,res)=>{
    //todo creating instance of the model
    const _id = req.params.id;
    try {
        //todo Note that Mongoose itself converted the _id to   new ObjectID(_id)
        const user = await User.findById(_id);

        if(!user)
            return res.status(404).send();
        return res.send(user);
    }catch (e) {
        res.status(500).send();
    }

})

//todo UPDATE
router.patch('/users/:id',async (req,res)=> {

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
        const user  = await User.findByIdAndUpdate(req.params.id,req.body,{new :true,runValidators:true})

        if(!user){
            res.status(404).send();
        }
        res.send(user);

    }
    catch (e) {
        res.status(500).send(e);
    }
})

//todo Delete
router.delete('/users/:id',async (req,res)=>{
    try {
        const user = await  User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).send()
        }

        res.send(user);
    }
    catch (e) {
        res.status(500).send();
    }

})


module.exports = router