const express = require('express')
const { 
    createCandidate,
    getCandidate,
    getCandidates,
    deleteCandidate,
    updateCandidate
 } = require('../controllers/candidateController')

const router = express.Router()

//GET ALL CANDIDATES
router.get('/',getCandidates)

//GET a single candidate
router.get('/:id',getCandidate)

//post a new candidate
router.post('/',createCandidate)

//delete a candidate
router.delete('/:id',deleteCandidate)

//update a candidate
router.patch('/:id',updateCandidate)


module.exports=router