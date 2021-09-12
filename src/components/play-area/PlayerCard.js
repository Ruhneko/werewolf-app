import React, { Component } from 'react'
import HIDDEN_IMAGE from '../../images/back.jpg'
import ROLE_WEREWOLF_IMAGE from '../../images/werewolf.png'
import ROLE_SEER_IMAGE from '../../images/seer.png'
import ROLE_ROBBER_IMAGE from '../../images/robber.png'
import ROLE_VILLAGER_IMAGE from '../../images/villager.png'
import PlayerButton from './PlayerButton'
import { PLAYER_DONE, ROBBER_SWAP } from '../../Events'

export default class PlayerCard extends Component {
    constructor(){
        super()

        this.state={}

        this.handleLook = this.handleLook.bind(this)
        this.handlerob = this.handlerob.bind(this)
    }

    handleLook(){
        const {socket} = this.props
        socket.emit(PLAYER_DONE)
    }

    handlerob(robber, robbed){
        const {socket} = this.props
        socket.emit(ROBBER_SWAP, robber, robbed)
    }

    render() {
        const {socket, turn, cardAccount, user} = this.props
        var photo = HIDDEN_IMAGE

        if(turn == "ROLE_WEREWOLF" && user.role == "ROLE_WEREWOLF" && cardAccount.role == "ROLE_WEREWOLF"){
            photo = ROLE_WEREWOLF_IMAGE
        }

        console.log(turn)
        const divStyle = {
            backgroundImage: 'url(' + photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        return(
            <div className="player-card" style={divStyle}>
                <div className="player-card content">{cardAccount.name}</div>
                <PlayerButton turn = {turn}  cardAccount={cardAccount} user={user} 
                handleLook={this.handleLook} handlerob={this.handlerob}/>
            </div>
        )
    }
}