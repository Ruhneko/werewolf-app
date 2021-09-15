import React, {Component} from 'react'
import { VERIFY_USER, GAME_START, TEMP_END } from '../Events'
import WEREWOLF_VECTOR from '../images/werewolf-vector.png';
import Button from 'react-bootstrap/Button';

export default class LoginForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            nickname:"",
            error:"",
            joined: false
        };

    }

    setUser = ({user, isUser, gameStart}) =>{
        if(!gameStart){
            if(isUser){
                this.setError("User name taken")
            }
            else{
                this.setState({joined:true})
                this.props.setUser(user)
            }
        }
        else{
            if(isUser){
                this.setState({joined:true})
                this.props.setUser(user)
            }
            else{
                this.setError("A game is Ongoing")
            }
        }
   
    }

    handleJoin = (e)=>{
        e.preventDefault()

        const {socket} = this.props
        const {nickname} = this.state
        
        if(nickname == '')
        {
            window.alert("Please enter a nickname!");
            document.getElementsByClassName("joinBtn").disabled = true;
        }
        else
            socket.emit(VERIFY_USER, nickname, this.setUser)
    }

    handleStart = (e)=>{
        e.preventDefault()

        const {socket} = this.props
        socket.emit(GAME_START)
    }

    handleChange = (e)=>{
        this.setState({nickname:e.target.value})
    }

    handleTempEnd = (e) => {
        e.preventDefault()
        const {socket} = this.props
        socket.emit(TEMP_END)
    }

    setError = (error) =>{
        this.setState({error})
    }

    render(){

        const { nickname, error, joined} = this.state
        const {connectedUsers} = this.props
        return(
            <div className='login'>
                <form className="login-form" >
                    <img src ={WEREWOLF_VECTOR}/>
                    <label htmlFor="nickname">
                        <h2><b>Got a nickname?</b></h2>
                    </label>
                    <input 
                        ref={(input)=>{this.textInput = input}} 
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange = {this.handleChange}
                        placeholder={'Enter Username'}
                        />
                    <div className="error">{error ? error:null}</div>
                    <Button type="submit" className="joinBtn" onClick={this.handleJoin} disabled={joined}> Join Game </Button>
                    <p/>
                    <Button type="submit" onClick={this.handleStart} disabled={!joined}>Start Game</Button>
                    <p> {connectedUsers ? "Currently Connected Users(3-6 to start): " +  Object.keys(connectedUsers).length : null }</p>                   
                </form>
            </div>
        )
    }
}