import { CandidatesContext } from "../context/CandidatesContext"
import { useContext } from "react"

export const useCandidatesContext = ()=>{
    const context = useContext(CandidatesContext)
    if(!context){
        throw Error('useCandidatesContext must be used inside an CandidatesContextProvider')
    }
    return context
}