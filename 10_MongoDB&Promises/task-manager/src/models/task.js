const mongoose = require('mongoose');
//todo mongoose will create a Collection with name
// tasks
const Task = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
})

//todo Note that the ref property is linking the User model
// with this task model

module.exports = Task;