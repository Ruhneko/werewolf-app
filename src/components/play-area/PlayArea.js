import React, { Component } from 'react'
import parse from 'html-react-parser';
import { Socket } from 'socket.io-client';

export default class PlayArea extends Component {

    constructor(props){
        super(props)

        this.state = {
           players:[1,2,3],
        };

    }

    render() {
        return(
            <div className="playArea">
                <div className="god">PLAYER WAKE UP</div>
                <div className="playArea-row">
                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>
                </div>  

                    <div className="playArea-row">
                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>

                    <div className="player-card">
                        <div className="player-card content">Werewolf</div>
                        <button className="vote-button">Vote</button>
                    </div>
                </div>        
                      
            </div>
            
        )
    }
}