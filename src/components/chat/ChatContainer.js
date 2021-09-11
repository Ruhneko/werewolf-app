import React, {Component} from 'react'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED, TYPING } from '../../Events';
import ChatHeading from './ChatHeading';
import MessageInput from './messages/MessageInput';
import Messages from './messages/Messages';

export default class ChatContainer extends Component {

    constructor(props){
        super(props)

        this.state = {
            chat: {messages:[],
                   user:"",
                   typingUsers:[]},
        };

        this.initChat = this.initChat.bind(this)

    }

    componentDidMount() {
        const { socket } = this.props
        socket.emit(COMMUNITY_CHAT, this.initChat)
    }

    /*
    *   Reset the chat back to only the chat passed in
    *   @param chat {Chat}
    */
    initChat = (COMchat)=>{
        const { socket } = this.props
        this.setState({chat: COMchat})
        socket.on(MESSAGE_RECEIVED, this.addMessageToChat())
        socket.on(TYPING, this.updateTypingInChat())
    }

    /*
    *   Returns a function that will 
    *   add a msseage to the chat
    * 
    */
    addMessageToChat = () =>{
        return (message) => {
            const { chat } = this.state
            let newChat = chat.messages.push(message)
            this.setState({newChat})
        }
    }

    /*
    *   Updates the typing of chat 
    */
    /*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	updateTypingInChat = () =>{
		return ({user, isTyping}) =>{ 
            if(user !== this.props.user.name){
                const { chat } = this.state
                let newChat = chat
    
                if(isTyping && !chat.typingUsers.includes(user))
                    newChat = chat.typingUsers.push(user)
                else if(!isTyping && chat.typingUsers.includes(user))
                    newChat = chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                    
                this.setState({newChat})
                console.log(newChat)
                }
        }
	}

    /*
    *   Adds a message to the chat
    *   @param message {string} The message to be added to the chat.
    */
    sendMessage = (message) => {
        const { socket } = this.props
        socket.emit(MESSAGE_SENT, {message})
    }

    /*
    *   Sends typing status to the server
    *   typing {boolean} If the user is still typing or not.
    */
    sendTyping = (isTyping) => {
        const { socket } = this.props
        socket.emit(TYPING, {isTyping})
    }


    render(){
        const {user} = this.props
        const {chat} = this.state
        console.log(chat)
        return(
            <div className="chat-room-container">
                    <div className ="chat-room">
                        <ChatHeading name="Werewolf Chat"/>
                        <Messages 
                            messages= {chat.messages}
                            user = {user}
                            typingUsers = {chat.typingUsers}
                        />
                        <MessageInput
                            sendMessage={
                                (message)=>{
                                    this.sendMessage(message)
                                }
                            }
                            sendTyping={
                                (isTyping) =>{
                                    this.sendTyping(isTyping)
                                }
                            }
                        />
                    </div>             
                </div>
        )
    }
}