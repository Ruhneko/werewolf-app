import React from 'react'

export default function({turn, cardAccount, user}){

    if(turn == "START_VOTE"){
        return(
           <button className="vote-button">Vote</button>
        )
    }
    else if(turn == "ROLE_SEER" &&  user.role == "ROLE_SEER" && user.playerDone == false && cardAccount.id != user.id){
        return(
            <button className="seer-button">Look</button>
        )
    }
    else if(turn == "ROLE_ROBBER" &&  user.role == "ROLE_ROBBER" && user.playerDone == false && cardAccount.id != user.id){
        return(
            <button className="swap-button">Swap</button>
        )
    }
    else{
        return <p></p>
    }
   
}