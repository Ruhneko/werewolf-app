import React, { Component } from 'react'
import  io from 'socket.io-client'
import { LOGOUT, USER_CONNECTED } from '../Events'
import LoginForm from './LoginForm'
import Game from './Game'

const socketURL = "http://localhost:3231"

export default class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            socket: null,
            user:null
        }
    }

    componentDidMount(){
        this.initSocket()
    }

    /*
    *   Connect to and intializes socket.
    */

    initSocket = ()=>{
        const socket = io(socketURL)
        socket.on('connect', ()=>{
            console.log("Connected")
        })
        this.setState({socket})
    }

    /*
    * Sets the user property in state
    * @param user {id:number, name:string}
    */
    setUser = (user)=>{
        const { socket } = this.state
        socket.emit(USER_CONNECTED, user);
        this.setState({user})
    }

    /*
    * Sets the user property in state to null
    */
   logout = ()=>{
       const { socket } = this.state
       socket.emit(LOGOUT)
       this.setState({user:null})
   }

    render() {
        const { title } = this.props
        const { socket, user } = this.state
        return(
            <div className="container">
                {
                    !user ?
                    <LoginForm socket={socket} setUser={this.setUser}/>
                    :
                    <Game socket={socket} user={user} logout={this.logout}/>
                }
            </div>
        )
    }
}