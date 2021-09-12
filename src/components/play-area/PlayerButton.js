import React from 'react'

export default function({turn}){

    if(turn == "START_VOTE"){
        return(
           <button className="vote-button">Vote</button>
        )
    }
    else if(turn == "ROLE_SEER"){
        return(
            <button className="seer-button">Look</button>
         )
    }
    else{
        return <p></p>
    }
   
}