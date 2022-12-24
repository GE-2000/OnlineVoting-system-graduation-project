import { useEffect } from "react"
import {useCandidatesContext} from "../hooks/useCandidatesContext"
//components
import CandidateDetails from '../components/CandidatesDetails'
import CandidateForm from '../components/CandidateForm'


const Home = ()=>{
    const{candidates,dispatch}=useCandidatesContext()
    useEffect(() =>{
        const fetchCandidates = async()=>{
            const response = await fetch('/api/candidates')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_CANDIDATES',payload:json})
            }

        }
        fetchCandidates()        
    },[dispatch])
    return(
        <div className="home">
            <div className="candidates">
                {candidates && candidates.map((candidate)=>(
                    <CandidateDetails key={candidate._id} candidate={candidate}/>
                ))}
            </div>
            <CandidateForm />
        </div>
    )
}

export default Home 