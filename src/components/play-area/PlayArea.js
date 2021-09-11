import React, { Component } from 'react'
import parse from 'html-react-parser';
import { Socket } from 'socket.io-client';
import PlayerCard from './PlayerCard';

export default class PlayArea extends Component {

    /*
        static ROLE_WEREWOLF = "ROLE_WEREWOLF";
        static ROLE_SEER = "ROLE_SEER";
        static ROLE_ROBBER = "ROLE_ROBBER";
        static ROLE_TROUBLEMAKER = "ROLE_TROUBLEMAKER";
        static ROLE_VILLAGER = "ROLE_VILLAGER";
    */
    constructor(props){
        super(props)

        this.state = {
            turn: "",
        }
    }

    componentDidMount(){
        const {socket} = this.props

        socket.on(CHANGE_TURN, (turn)=>{
            this.setState({turn})
        }) 
    }

    render() {

        
        const {socket, user, connectedUsers} = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            return (<PlayerCard turn = {turn} user={connectedUsers[key]} />)
        })

        console.log(Cards)

        return(
            <div className="playArea">
                <div className="god">PLAYER WAKE UP</div>
                <div className="playArea-row">
                   {Cards}
                </div>           
            </div>
        )
    }
}