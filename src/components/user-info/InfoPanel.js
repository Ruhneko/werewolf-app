import React, { Component } from 'react'
import HIDDEN_IMAGE from '../../images/back.jpg'
import ROLE_WEREWOLF_IMAGE from '../../images/werewolf.png'
import ROLE_SEER_IMAGE from '../../images/seer.png'
import ROLE_ROBBER_IMAGE from '../../images/robber.png'
import ROLE_VILLAGER_IMAGE from '../../images/villager.png'
import { SKIP_DISCUSSION, SKIP_OK } from '../../Events'


export default class InfoPanel extends Component {

    constructor(props){
        super(props)

        this.state={
            skip: false,
        }

        this.skipDiscussion = this.skipDiscussion.bind(this)
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

    getRoleName(role){
        switch (role){
            case "ROLE_WEREWOLF": return "Werewolf"; break;
            case "ROLE_SEER": return "Seer"; break;
            case "ROLE_ROBBER": return "Robber"; break
            case "ROLE_VILLAGER": return "Villager"; break
            default: return "Error"
        }
    }

    getDescription(role){
        switch (role){
            case "ROLE_WEREWOLF": return "When the Werewolves wake up, along with the other Werewolves, to see who they are. If a Werewolf wakes up and they see no other Werewolves, they are allowed to look at one card in the center."; break;
            case "ROLE_SEER": return "When the Seer wakes up, they can either look at a player's card or 2 cards in the center."; break;
            case "ROLE_ROBBER": return "When the Robber wakes up, they can trade their card with another player's card, then look at their new card."; break
            case "ROLE_VILLAGER": return "The Villager remains asleep throughout the night and does not take any actions during this phase"; break
            default: return "Error"
        }
    }

    skipDiscussion(){
        const {socket} = this.props
        socket.emit(SKIP_DISCUSSION)
        socket.on(SKIP_OK, ()=>{
            this.setState({skip: true})
        })
    }

    render() {
        const {socket, user, turn} = this.props
        const {skip} = this.state

        var photo = ""
        var role_name = ""
        var role_desc = ""

        user.role == "ROLE_ROBBER" && user.swappedRole != "" ? photo =  this.getPhoto(user.swappedRole) :  photo = this.getPhoto(user.role)
        user.role == "ROLE_ROBBER" && user.swappedRole != "" ? role_name =  this.getRoleName(user.swappedRole) :  role_name = this.getRoleName(user.role)
        user.role == "ROLE_ROBBER" && user.swappedRole != "" ? role_desc =  this.getDescription(user.swappedRole) :  role_desc = this.getDescription(user.role)

        return(
            <div className="info-panel">
                <div className="info-box">
                    Info:
                    <img className="info-image" src={photo} alt={role_name}/>
                    {role_name}
                 </div>
                 <div className="container-row">
                    <div className="desc-box">
                        <div className="desc-tag">Description:</div>
                        <div className="desc-main">{role_desc}</div>
                    </div>
                    <div className ="vote-box">
                        <div className="vote-tag">Vote:</div>
                        {
                            turn == "DISCUSSION"
                            ? <button onClick={()=>this.skipDiscussion()} disabled={skip}>Skip Discussion</button>
                            : null
                        }
                        <div className="vote-main">{user.voteID}</div>
                    </div>
                 </div>
            </div>
        )
    }
}