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
            seconds: 10
         };

         this.initTurn = this.initTurn.bind(this)
         this.resetTimer = this.resetTimer.bind(this)
    }

    componentDidMount(){
         this.initTurn()
    }

    initTurn(){
        const {socket} = this.props

        socket.on(CHANGE_TURN, (turn, seconds)=>{
            this.resetTimer()
            this.setState({turn, seconds})                
        })  
    }

    resetTimer(){
        this.setState({seconds: 0})
    }

    render() {

        const { turn, seconds } = this.state
        const {socket, user, connectedUsers} = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            return (<PlayerCard turn={turn} user={connectedUsers[key]} />)
        })

        //console.log(Cards)

        return(
            <div className="playArea">
                <div className="timer"><Timer key={seconds} seconds={seconds} /></div>
                <div className="god">PLAYER WAKE UP</div>
                <div className="playArea-row">
                   {Cards}
                </div>        
            </div>
        )
    }
}