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
         };

         this.initTurn = this.initTurn.bind(this)
    }

    componentDidMount(){
         this.initTurn()
    }

    initTurn(){
        const {socket} = this.props

        socket.on(CHANGE_TURN, (turn)=>{
            console.log(turn)
            this.setState({turn:turn})
        })  
    }

    render() {

        const { turn } = this.state
        const {socket, user, connectedUsers} = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            return (<PlayerCard turn={turn} user={connectedUsers[key]} />)
        })

        //console.log(Cards)

        return(
            <div className="playArea">
                <div className="timer"><Timer seconds={10}/></div>
                <div className="god">PLAYER WAKE UP</div>
                <div className="playArea-row">
                   {Cards}
                </div>        
            </div>
        )
    }
}