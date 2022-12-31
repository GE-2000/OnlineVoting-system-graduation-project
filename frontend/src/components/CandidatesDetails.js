import {useCandidatesContext} from "../hooks/useCandidatesContext"


const CandidateDetails = ({ candidate })=>{
 const{ dispatch }=useCandidatesContext()
    const handleClick = async()=>{
       
        const response = await fetch('api/candidates/'+candidate._id,{
            method:'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type:'DELETE_CANDIDATE',payload:json})

        }
    }


    return(
        <div className="candidate-details">
            <h4>{candidate.name}</h4>
            <p><strong>ID:</strong>{candidate.id}</p>
            <p><strong>Number Of Votes:</strong>{candidate.number_of_votes}</p>
            <p>{formatDistanceToNow(new Date(candidate.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )

}

export default CandidateDetails