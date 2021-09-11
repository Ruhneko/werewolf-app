const io = require('./index.js').io

const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
       LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING,
       GAME_START, INITIALIZE, TEMP_END, RESET, UPDATE_USER} = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

const WerewolfGame = require('./WerewolfGame.js')

let connectedUsers = { }
let userCount = 0
let gameStart = false
let werewolfGame

let communityChat = createChat()

module.exports = function(socket) {
    console.log("Socket ID" + socket.id)

    let sendMessageToChatFromUser;
    let sendTypingFromUser;
    let updateUserClients;
    
    //Verify Username //edit for game start
    socket.on(VERIFY_USER, (nickname, callback)=>{
        if(!gameStart){
            if(isUser(connectedUsers, nickname)){
                callback({gameStart: false, isUser: true, user:null})
            }
            else{
                callback({gameStart: false, isUser: false, user:createUser({name:nickname})})
            }
        }
        else{
            callback({gameStart: true, isUser:false, user:null})
        }
   
    })

    //Verify Username
    socket.on(GAME_START, ()=>{
        if (userCount >= 3) {
            console.log("Game has started.")
            werewolfGame = new WerewolfGame(connectedUsers)
            gameStart = true
            connectedUsers = werewolfGame.initialize()
            console.log("Assigned roles:", connectedUsers)
            updateUserClients()
            io.emit(INITIALIZE)
        } else {
            console.log("Game has not started, not enough players.")
        }
    })

    //User Connects with username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user)
        userCount++
        socket.user = user

        sendMessageToChatFromUser = sendMessageToChat(user.name)
        sendTypingFromUser = sendTypingToChat(user.name)
        updateUserClients = updateUserInfo(socket, socket.user)

        io.emit(USER_CONNECTED, connectedUsers)
        console.log(connectedUsers)
    })

    //User disconnects
    socket.on('disconnect', ()=>{
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name)
            userCount--

            io.emit(USER_DISCONNECTED, connectedUsers)
            console.log("Disconnect")
            console.log(connectedUsers)
        }
    })

    //User logs out
    socket.on(LOGOUT, ()=>{
        connectedUsers = removeUser(connectedUsers, socket.user.name)
        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log("Logout" + connectedUsers)
    })

    //Get Community Chat
    socket.on(COMMUNITY_CHAT, (callback)=>{
        callback(communityChat)
    })

    socket.on(MESSAGE_SENT, ({message})=>{
        sendMessageToChatFromUser(message)
    })

    socket.on(TYPING, ({isTyping})=>{
		sendTypingFromUser(isTyping)
	})

    socket.on(TEMP_END, ()=>{
        connectedUsers = {}
        userCount = 0
        gameStart = false
        communityChat = createChat()
        io.emit(RESET)
    })
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to add to the list
* @return userList {object} Object with key value pairs of Users
*
*/
function addUser(userList, user){
    let newList = Object.assign({}, userList)
    newList[user.name] = user
    return newList
}

/*
* Removes user from list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to remove from the list
* @return userList {object} Object with key value pairs of Users
*
*/
function removeUser(userList, username){
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
}

/*
* Checks if the user is in the list passed in
* @param userList {Object} Object with key value pairs of users
* @param username {String}
* @return userList {object} Object with key value pairs of Users
*
*/
function isUser(userList, username){
    return username in userList
}

/*
* Returns a function that will take a message
* and then emit a broadcast to the chat
* @param sender {string} username of sender
* @return function(message)
*/
function sendMessageToChat(sender){
	return (message)=>{
		io.emit(MESSAGE_RECEIVED, createMessage({message, sender}))
	}
}

/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user){
	return (isTyping)=>{
		io.emit(TYPING, {user, isTyping})
	}
}

function updateUserInfo(socket, user) {
    console.log("UpdateUserInfo")
    console.log(socket)
    return () => {
        io.to(socket).emit(UPDATE_USER, {user})
    }
}