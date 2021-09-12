import React, { Component } from 'react'
import PlayerCard from './PlayerCard';
import Timer from './Timer';
import CenterDeck from './CenterDeck';


export default class PlayArea extends Component {

    /*
        static ROLE_WEREWOLF = "ROLE_WEREWOLF";
        static ROLE_SEER = "ROLE_SEER";
        static ROLE_ROBBER = "ROLE_ROBBER";
        static ROLE_TROUBLEMAKER = "ROLE_TROUBLEMAKER";
        static ROLE_VILLAGER = "ROLE_VILLAGER";
    */
 

    render() {
        const {socket, user, connectedUsers, centerDeck, turn, seconds, god } = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            if(connectedUsers[key].id != user.id){
                return (<PlayerCard socket={socket} turn={turn} cardAccount={connectedUsers[key]}  user={user} />)
            }
        })

        //console.log(Cards)

        return(
            <div className="playArea">
                <div className="timer"><Timer key={seconds} seconds={seconds} /></div>
                <div className="god">{god}</div>
                <div className="playArea-row">
                   {Cards}
                   <CenterDeck socket={socket} turn={turn} user={user} centerDeck={centerDeck}/>
                </div>        
            </div>
        )
    }
}