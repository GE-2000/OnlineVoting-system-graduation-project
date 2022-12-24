import { useState } from 'react'
import {useCandidatesContext} from "../hooks/useCandidatesContext"


const CandidateForm = () => {
  const {dispatch}=useCandidatesContext()

  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [number_of_votes, setNumberOfVotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const candidate = {name,id, number_of_votes}
    
    const response = await fetch('/api/candidates', {
      method: 'POST',
      body: JSON.stringify(candidate),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setId('')
      setNumberOfVotes('')
      setEmptyFields([])
      console.log('new candidate added:', json)

      dispatch({type:'CREATE_CANDIDATES',payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Candidate</h3>

      <label>Candidate Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Id:</label>
      <input 
        type="number" 
        onChange={(e) => setId(e.target.value)} 
        value={id}
        className={emptyFields.includes('id') ? 'error' : ''}
      /> 

      <label>Number of votes:</label>
      <input 
        type="number" 
        onChange={(e) => setNumberOfVotes(e.target.value)} 
        value={number_of_votes} 
        className={emptyFields.includes('number_of_votes') ? 'error' : ''}
      />

      <button>Add Candidate</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CandidateForm