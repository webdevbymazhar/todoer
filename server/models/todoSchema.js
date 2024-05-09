const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo : {
        type:String,
        unique:true,
        required:true
    },
    success:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const todoModel = mongoose.model("todos",todoSchema)
module.exports = todoModel