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
                console.log(this.state)
                this.props.setUser(user)
            }
        }
        else{
            this.setError("A game is Ongoing")
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

        const { nickname, error, joined } = this.state
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
                    <p/>
                    <Button type="submit" value="END GAME" variant="danger" onClick={this.handleTempEnd}>End Game</Button>
                </form>
            </div>
        )
    }
}