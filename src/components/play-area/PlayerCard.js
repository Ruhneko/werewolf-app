import React, { Component } from 'react';
import PlayArea from './PlayArea';

class PlayerCard extends React.Component {
    render() { 
        const {user} = this.props;
        console.log(user);

        return 
        (
            <div className="player-card">
                        <div className="player-card content">{user.name}</div>
                        <button className="vote-button">Vote</button>
            </div>);
    }
}
 
export default PlayerCard;