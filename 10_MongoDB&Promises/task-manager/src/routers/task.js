const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')
const router =  new express.Router();

//todo Note all these FIND_BY queries & save
// are provided by mongoose
// refer mongoose documentation for more


//todo POST

//todo Note async returns promise but
// express is not using the return value anyways


//todo note auth from middleware is used bcoz
// whenever a TASK is created it is associated with the USER who created it
// in the Owner Field
router.post('/tasks',auth,async (req,res)=>{
    const task = new Task({
        ...req.body,
        owner:req.user._id
    });

    try{
        await task.save();
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e);
    }

})


router.get('/tasks', auth,async (req,res)=>{

    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks);
    }catch (e) {
        res.status(500).send();
    }

})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({_id,owner:req.user._id});

        if(!task){
            return res.status(404).send();
        }

        res.send(task);
    }catch (e) {
        res.status(500).send();
    }

})




router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try {

        const task = await Task.findOne({_id: req.params.id,owner:req.user._id})
        // const task = await  Task.findById(req.params.id);
        updates.forEach((update) =>
            task[update] = req.body[update]
        )
        await task.save();

        // const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true})

        if(!task){
            console.log(1);
            return res.status(404).send();
        }

        console.log(2);
        res.send(task);
    }
    catch (e) {
        console.log(3);
        res.status(404).send();
    }

})




router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        // const task = await  Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!task){
            return res.status(404).send()
        }

        res.send(task);
    }
    catch (e) {
        res.status(500).send();
    }

})


module.exports = router;