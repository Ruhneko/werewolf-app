import React, { Component } from 'react'
import parse from 'html-react-parser';
import { Socket } from 'socket.io-client';
import PlayerCard from './PlayerCard';

export default class PlayArea extends Component {

    render() {
        const {socket, user, connectedUsers} = this.props
        let Cards = Object.keys(connectedUsers).map(key=> {
            return (<PlayerCard user={connectedUsers[key]} />)
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