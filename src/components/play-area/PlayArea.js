import React, { Component } from 'react'
import parse from 'html-react-parser';
import PlayerCard from './PlayerCard';
import { CHANGE_TURN } from '../../Events';
import Timer from './Timer';

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
            turn:"",
            seconds: 10,
            god:"Welcome To Ultimate Werewolf"
         };

         this.initTurn = this.initTurn.bind(this)
         this.resetTimer = this.resetTimer.bind(this)
    }

    componentDidMount(){
         this.initTurn()
    }

    initTurn(){
        const {socket} = this.props

        socket.on(CHANGE_TURN, (turn, seconds, god)=>{
            this.resetTimer(seconds+1)
            this.setState({turn, seconds, god})                
        })  
    }

    resetTimer(time){
        this.setState({seconds: time})
    }

    render() {

        const { turn, seconds } = this.state
        const {socket, user, connectedUsers} = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            return (<PlayerCard turn={turn} cardAccount={connectedUsers[key]}  user={user} />)
        })

        //console.log(Cards)

        return(
            <div className="playArea">
                <div className="timer"><Timer key={seconds} seconds={seconds} /></div>
                <div className="god">{this.state.god}</div>
                <div className="playArea-row">
                   {Cards}
                </div>        
            </div>
        )
    }
}