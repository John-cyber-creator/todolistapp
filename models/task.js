const mongoose = require('mongoose');
const ObjectId = require('mongoose').ObjectId;


const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
   creator: {
        type: ObjectId, 
        ref: 'user'
    },

});

  

module.exports = mongoose.model('Task', taskSchema)