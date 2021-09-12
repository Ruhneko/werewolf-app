import React, { Component } from 'react'
import HIDDEN_IMAGE from '../../images/back.jpg'
import ROLE_WEREWOLF_IMAGE from '../../images/werewolf.png'
import ROLE_SEER_IMAGE from '../../images/seer.png'
import ROLE_ROBBER_IMAGE from '../../images/robber.png'
import ROLE_VILLAGER_IMAGE from '../../images/villager.png'
import PlayerButton from './PlayerButton'

export default class PlayerCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            photo: HIDDEN_IMAGE,
        }
    }

    render() {
        const {turn, cardAccount, user} = this.props
        const {photo} = this.state

        console.log(turn)
        const divStyle = {
            backgroundImage: 'url(' + photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        return(
            <div className="player-card" style={divStyle}>
                <div className="player-card content">{cardAccount.name}</div>
                <PlayerButton turn = {turn}  cardAccount={cardAccount} user={user}/>
            </div>
        )
    }
}