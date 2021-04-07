const express = require('express');
const Tasks = require('../models/task');
const router =  new express.Router();

//todo Note all these FIND_BY queries & save
// are provided by mongoose
// refer mongoose documentation for more


//todo POST

//todo Note async returns promise but
// express is not using the return value anyways

router.post('/tasks',async (req,res)=>{
    const task = new Tasks(req.body);

    try{
        await task.save();
        res.status(200).send(task)
    }catch (e) {
        res.status(400).send(e);
    }

})


router.get('/tasks',(req,res)=>{

    Tasks.find({}).then((tasks)=>{
        res.status(201).send(tasks);
    }).catch((error)=>{
        res.status(400).send(e);
    })
})

router.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id;

    Tasks.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }).catch((error)=>{
        res.status(500).send();
    })
})




router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates!'});
    }

    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true})

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




router.delete('/tasks/:id',async (req,res)=>{
    try {
        const task = await  Tasks.findByIdAndDelete(req.params.id);

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