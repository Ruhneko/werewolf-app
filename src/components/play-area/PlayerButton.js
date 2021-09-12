import React from 'react'

export default function({turn, cardAccount, user, handleLook, handleRob, handleVote}){

    if(turn == "START_VOTE" && cardAccount.id != user.id){
        return(
           <button className="vote-button" onClick={()=>handleVote(user.id, cardAccount.name)}>Vote</button>
        )
    }
    else if(turn == "ROLE_SEER" &&  user.role == "ROLE_SEER" && user.playerDone == false && cardAccount.id != user.id){
        return(
            <button className="seer-button" onClick={()=>handleLook(cardAccount.id)}>Look</button>
        )
    }
    else if(turn == "ROLE_ROBBER" &&  user.role == "ROLE_ROBBER" && user.playerDone == false && cardAccount.id != user.id){
        return(
            <button className="swap-button" onClick={()=>handleRob(user, cardAccount)}>Swap</button>
        )
    }
    else{
        return <p></p>
    }
   
}