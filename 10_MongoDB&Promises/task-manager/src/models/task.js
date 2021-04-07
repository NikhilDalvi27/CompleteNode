const mongoose = require('mongoose');
//todo mongoose will create a Collection with name
// tasks
const Tasks = mongoose.model('Tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    }
})


module.exports = Tasks;