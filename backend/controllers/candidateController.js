const Candidate = require('../models/candidatesModel')
const mongoose =require('mongoose')
//get all candidates
const getCandidates = async(req,res)=>{
    const candidates = await Candidate.find({}).sort({createdAt:-1})
    res.status(200).json(candidates)
}

//get single candidate
const getCandidate = async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such candidate'})
    }


    const candidate=await Candidate.findById(id)

    if(!candidate){
        return res.status(404).json({error:'No such candidate'})
    }
    res.status(200).json(candidate)
}

//create new candidate
const createCandidate = async(req,res)=>{
    const{name,id,load}=req.body
    let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!id) {
    emptyFields.push('id')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
 


    //add doc to db
    try{
        const candidate = await Candidate.create({name,id,load})
        res.status(200).json(candidate)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//delete a candidte
const deleteCandidate = async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such candidate'})
    }
    
    const candidate=await Candidate.findOneAndDelete({_id: id})

    if(!candidate){
        return res.status(404).json({error:'No such candidate'})
    }
    res.status(200).json(candidate)

}

//update a candidate
const updateCandidate = async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such candidate'})
    }
    
    const candidate=await Candidate.findOneAndUpdate({_id: id},{
       ...req.body
    })

    if(!candidate){
        return res.status(404).json({error:'No such candidate'})
    }
    res.status(200).json(candidate)

}
module.exports={
    getCandidate,
    getCandidates,
    createCandidate,
    deleteCandidate,
    updateCandidate


}