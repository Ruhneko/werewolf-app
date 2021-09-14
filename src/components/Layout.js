import React, { Component } from 'react'
import  io from 'socket.io-client'
import { INITIALIZE, LOGOUT, USER_CONNECTED, VERIFY_USER, RESET, UPDATE_USER } from '../Events'
import LoginForm from './LoginForm'
import Game from './Game'

const socketURL = "/" //build
//const socketURL = "http://localhost:3231" //dev

export default class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            socket: null,
            user:null,
            start:null,
            connectedUsers: null,
            centerDeck: []        
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

        socket.on(INITIALIZE, (connectedUsers, centerDeck)=>{
            this.setState({start:true, connectedUsers, centerDeck})
            this.updateUser()
        })

        socket.on(RESET, ()=>{
            this.setState({user:null, start:null, connectedUsers:null, centerDeck:[]})
        })

        socket.on(UPDATE_USER, (connectedUsers)=>{
            this.setState({connectedUsers})
            this.updateUser()
        })


        this.setState({socket})
    }

    
    updateUser = () => {
        const {user, connectedUsers} = this.state
           
            Object.keys(connectedUsers).forEach(key =>{
                if(connectedUsers[key].name == user.name){
                    this.setState({user:connectedUsers[key]})
                }
            })

        console.log(connectedUsers)
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


    render() {
        const { title } = this.props
        const { socket, user, start, connectedUsers, centerDeck} = this.state
        return(
            <div className="container">
                {
                    !user || !start ?
                    <LoginForm socket={socket} setUser={this.setUser}/>
                    :
                    <Game socket={socket} user={user} connectedUsers={connectedUsers} centerDeck={centerDeck}/>
                }
            </div>
        )
    }
}