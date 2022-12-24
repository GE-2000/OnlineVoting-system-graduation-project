const mongoose = require('mongoose')
const Schema = mongoose.Schema
const candidateSchema = new Schema({
    name:{
        type : String,
        required:true
    },

    id:{
        type:Number,
        required:true
    },

    load:{
        type:Number,
        required :true
    }


},
{timestamps:true})

module.exports = mongoose.model('Candidate',candidateSchema )