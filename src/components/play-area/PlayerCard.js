import React, { Component } from 'react'

export default class PlayerCard extends Component {

    render() {
        const {user} = this.props
        return(
            <div className="player-card">
                <div className="player-card content">{user.name}</div>
                <button className="vote-button">Vote</button>
            </div>
        )
    }
}