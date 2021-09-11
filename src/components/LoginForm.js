import React, {Component} from 'react'
import { VERIFY_USER, GAME_START } from '../Events';

export default class LoginForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            nickname:"",
            error:"",
            joined: false
        };

    }

    setUser = ({user, isUser}) =>{
        console.log(user, isUser)
        if(isUser){
            this.setError("User name taken")
        }
        else{
            this.setState({joined:true})
            console.log(this.state)
            this.props.setUser(user)
        }
    }

    handleJoin = (e)=>{
        e.preventDefault()

        const {socket} = this.props
        const {nickname} = this.state
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

    setError = (error) =>{
        this.setState({error})
    }

    render(){

        const { nickname, error, joined } = this.state
        return(
            <div className='login'>
                <form className="login-form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                    </label>
                    <input 
                        ref={(input)=>{this.textInput = input}} 
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange = {this.handleChange}
                        placeholder={'MYCoolUsername'}
                        />
                    <div className="error">{error ? error:null}</div>
                    <input type="submit" value="JOIN" onClick={this.handleJoin} disabled={joined}/>
                    <p/>
                    <input type="submit" value="START" onClick={this.handleStart} disabled={!joined}/>
                </form>
            </div>
        )
    }
}