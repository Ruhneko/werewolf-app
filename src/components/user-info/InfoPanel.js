import React, { Component } from 'react'
import day from '../../day.jpg'

export default class InfoPanel extends Component {
    render() {
        const {socket, user} = this.props
        return(
            <div className="info-panel">
                <div className="info-box">
                    Info:
                    <img className="info-image" src={day} alt="BigCo Inc. logo"/>
                    Character
                 </div>
                <div className="desc-box">
                    <div className="desc-tag">Description:</div>
                    <div className="desc-main">This charater can blah blah</div>
                </div>

            </div>
        )
    }
}