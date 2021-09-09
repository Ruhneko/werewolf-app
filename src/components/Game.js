import React, { Component } from 'react'
import ChatContainer from './chat/ChatContainer'

export default class Layout extends Component {



    render() {
        const {socket, user} = this.props
        return(
            <div className="container">
                <ChatContainer socket={socket} user={user} />
            </div>
        )
    }
}