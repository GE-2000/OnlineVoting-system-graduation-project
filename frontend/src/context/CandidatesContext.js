import { createContext,useReducer } from 'react'
export const CandidatesContext = createContext()

export const candidatesReducer = (state,action)=>{
    switch(action.type){
        case 'SET_CANDIDATES':
            return {
                candidates:action.payload
            }
        case 'CREATE_CANDIDATES':
            return{
                candidates:[action.payload,...state.candidates]
            }
        case 'DELETE_CANDIDATE':
            return{
                candidates: state.candidates.filter(c => c._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const CandidatesContextProvider =({ children })=>{
    const[state,dispatch]=useReducer(candidatesReducer,{
        candidates:null
    })

    
    return(
        <CandidatesContext.Provider value={{...state,dispatch}}>
            { children }
        </CandidatesContext.Provider>
    )
}