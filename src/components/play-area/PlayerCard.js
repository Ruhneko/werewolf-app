import React, { Component } from 'react'
import photo from '../../images/back.jpg'

export default class PlayerCard extends Component {

    render() {
        const {user} = this.props
        const divStyle = {
            backgroundImage: 'url(' + photo + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        };

        return(
            <div className="player-card" style={divStyle}>
                <div className="player-card content">{user.name}</div>
                <button className="vote-button">Vote</button>

            </div>
        )
    }
}