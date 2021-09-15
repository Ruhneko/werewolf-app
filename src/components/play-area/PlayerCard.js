import React, { Component } from 'react'
import HIDDEN_IMAGE from '../../images/back.jpg'
import ROLE_WEREWOLF_IMAGE from '../../images/werewolf.png'
import ROLE_SEER_IMAGE from '../../images/seer.png'
import ROLE_ROBBER_IMAGE from '../../images/robber.png'
import ROLE_VILLAGER_IMAGE from '../../images/villager.png'
import PlayerButton from './PlayerButton'
import { PLAYER_DONE, ROBBER_SWAP, PLAYER_VOTE} from '../../Events'

export default class PlayerCard extends Component {
    constructor(){
        super()

        this.state={
            seer_look: "",
        }

        this.handleLook = this.handleLook.bind(this)
        this.handleRob = this.handleRob.bind(this)
        this.handleVote = this.handleVote.bind(this)
        this.getVotes = this.getVotes.bind(this)
    }

    handleLook(userID){
        const {socket} = this.props
        this.setState({seer_look: userID})
        socket.emit(PLAYER_DONE)
    }

    handleRob(robber, robbed){
        const {socket} = this.props
        socket.emit(ROBBER_SWAP, robber, robbed)
    }

    handleVote(voter, vote){
        const {socket} = this.props
        socket.emit(PLAYER_VOTE, voter, vote)
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

    getVotes()
    {
        const {connectedUsers, cardAccount} = this.props
        let votes = 0
        Object.keys(connectedUsers).map(key =>{
            if(connectedUsers[key].voteID == cardAccount.name){
                votes++
            }
        })
        return votes
    }

    render() {
        const {socket, turn, cardAccount, user} = this.props
        const {seer_look} = this.state
        var photo = HIDDEN_IMAGE
        var votes = 0

        if(turn == "ROLE_WEREWOLF" && user.role == "ROLE_WEREWOLF" && cardAccount.role == "ROLE_WEREWOLF"){
            photo = ROLE_WEREWOLF_IMAGE
        }

        if(turn == "ROLE_SEER" && seer_look == cardAccount.id && user.role == "ROLE_SEER"){
            photo = this.getPhoto(cardAccount.role)
        }

        if(turn == "RESULTS"){
           photo = this.getPhoto(cardAccount.role)
           votes = this.getVotes()
        }
        
        const divStyle = {
            backgroundImage: 'url(' + photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        return(
            <div className="player-card" style={divStyle}>
                <div className="player-card content">
                   {cardAccount.name + "\n"}
                   {
                   turn == "RESULTS"
                   ? <div className="player-card-content">VOTES:{votes}</div>
                   : null
                }
                </div>     
                <PlayerButton isCenterDeck={false} turn = {turn}  cardAccount={cardAccount} user={user} 
                    handleLook={this.handleLook} handleRob={this.handleRob} handleVote={this.handleVote} />
            </div>
        )
    }
}