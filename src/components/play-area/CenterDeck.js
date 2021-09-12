import React, { Component } from 'react'
import HIDDEN_IMAGE from '../../images/back.jpg'
import ROLE_WEREWOLF_IMAGE from '../../images/werewolf.png'
import ROLE_SEER_IMAGE from '../../images/seer.png'
import ROLE_ROBBER_IMAGE from '../../images/robber.png'
import ROLE_VILLAGER_IMAGE from '../../images/villager.png'
import PlayerButton from './PlayerButton'
import {GET_RANDOM, PLAYER_DONE} from '../../Events'

export default class PlayerCard extends Component {
    constructor(){
        super()

        this.state={
            centerDeck:[],
            change:false, 
        }

        this.handleLook = this.handleLook.bind(this)
        this.handleLook2 = this.handleLook2.bind(this)
    }

    componentDidMount(){
        const {centerDeck} = this.props
        this.setState({centerDeck})
        console.log(centerDeck)
    }

    handleLook(user, cards){
        const {socket} = this.props
        socket.emit(PLAYER_DONE)
        socket.emit(GET_RANDOM, user, cards)
    }

    handleLook2(){
        let {change} = this.state
        change = !change
        this.setState({change})
    }

    getPhoto(role){
        switch (role){
            case "ROLE_WEREWOLF": return ROLE_WEREWOLF_IMAGE; break;
            case "ROLE_SEER": return ROLE_SEER_IMAGE; break;
            case "ROLE_ROBBER": return ROLE_ROBBER_IMAGE; break
            case "ROLE_VILLAGER": return ROLE_VILLAGER_IMAGE; break
            default: return HIDDEN_IMAGE
        }
    }
    
    render() {
        const {socket, turn, user} = this.props
        const {centerDeck, change} = this.state
        
        var photo = HIDDEN_IMAGE
        var text = "CENTER DECK"

        if(turn == "ROLE_WEREWOLF" && user.role == "ROLE_WEREWOLF" && user.card1 != ""){
            photo = this.getPhoto(centerDeck[user.card1])
            text = "CARD 1"
        }

        if(turn == "ROLE_SEER" && user.role == "ROLE_SEER"){
            if(!change){
                photo = this.getPhoto(centerDeck[user.card1])
                text = "CARD 1"
            }
            else{
                photo = this.getPhoto(centerDeck[user.card2])
                text = "CARD 2"
            }
        }

        const divStyle = {
            backgroundImage: 'url(' + photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        return(
            <div className="player-card" style={divStyle}>
                <div className="player-card content">{text}</div>
                <PlayerButton isCenterDeck={true} turn = {turn}  user={user} centerDeck={centerDeck} 
                handleLook={this.handleLook} handleLook2={this.handleLook2}/>
            </div>
        )
    }
}