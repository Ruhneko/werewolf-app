import React, { Component } from 'react'
import ChatContainer from './chat/ChatContainer'
import PlayArea from './play-area/PlayArea'
import InfoPanel from './user-info/InfoPanel'

export default class Layout extends Component {



    render() {
        const {socket, user, connectedUsers} = this.props
        console.log(user)
        return(
            <div className="container">
                <div className="container-row">
                    <PlayArea socket={socket} user={user} connectedUsers = {connectedUsers}/>
                    <InfoPanel socket={socket} user={user} />
                </div>
                <ChatContainer socket={socket} user={user} />
            </div>
        )
    }
}