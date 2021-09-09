import React, { Component } from 'react'
import  io from 'socket.io-client'
import { LOGOUT, USER_CONNECTED, VERIFY_USER } from '../Events'
import LoginForm from './LoginForm'
import Game from './Game'

const socketURL = "/" //build
//const socketURL = "http://localhost:3231" //dev

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
            if(this.state.user){
                this.reconnect(socket)
            }else{
                console.log("Connected")
            }
            console.log("Connected")
        })

        this.setState({socket})
    }

    reconnect = (socket) => {
        socket.emit(VERIFY_USER, this.state.user.name, ({isUser, user})=>{
            if(isUser){
                this.setState({user:null})
            }else{
                this.setUser(user)
            }
        })
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