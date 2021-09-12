import React, { Component } from 'react'
import { CHANGE_TURN } from '../Events'
import ChatContainer from './chat/ChatContainer'
import PlayArea from './play-area/PlayArea'
import InfoPanel from './user-info/InfoPanel'

export default class Layout extends Component {


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

    resetTimer(time){
        this.setState({seconds: time})
    }


   initTurn(){
       const {socket} = this.props

       socket.on(CHANGE_TURN, (turn, seconds, god)=>{
           this.resetTimer(seconds+1)
           this.setState({turn, seconds, god})
       })  
   }

    render() {
        const {turn, seconds, god} = this.state
        const {socket, user, connectedUsers, centerDeck} = this.props
        return(
            <div className="container">
                <div className="container-row">
                    <PlayArea socket={socket} user={user} connectedUsers = {connectedUsers} centerDeck={centerDeck} 
                    turn ={turn} seconds={seconds} god={god}/>
                    <InfoPanel socket={socket} user={user} turn={turn} />
                </div>
                <ChatContainer socket={socket} user={user} />
            </div>
        )
    }
}