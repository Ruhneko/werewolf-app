import React from 'react'

export default function({isCenterDeck, turn, cardAccount, user, handleLook, handleRob, handleVote, handleLook2, centerDeck}){

    if(!isCenterDeck){
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
            return(
                <p></p>
            ) 
        }
    }
    else{
        if(turn == "ROLE_WEREWOLF" &&  user.role == "ROLE_WEREWOLF" && user.playerDone == false && centerDeck.length >= 1){
            return(
                <button className="look-button" onClick={()=>handleLook(user, 1)}>Look at Center</button>
            )
        }

        else if(turn == "ROLE_SEER" &&  user.role == "ROLE_SEER" && user.playerDone == false && centerDeck.length >= 2){
            return(
                <button className="look-button" onClick={()=>handleLook(user, 2)}>Look at Center</button>
            )
        }

        else if(turn == "ROLE_SEER" &&  user.role == "ROLE_SEER" && user.playerDone == true && centerDeck.length >= 2 
            && user.card1 != -1 && user.card2 != -1){
            return(
                <button className="look-button" onClick={()=>handleLook2()}>Look at other Card</button>
            )
        }

        else{
            return(
                <p></p>
            ) 
        }
    } 
}