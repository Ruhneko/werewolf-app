const { v4: uuidv4 } = require('uuid');
/*
*   createUser
*   Creates a user
*   @prop id {string}
*   @prop name {string}
*   @param {object}
*           name {string}
*/
const createUser = ({name="", role="", swappedRole="", playerDone=false, disconnected=false, voteID="", voteCount=0, card1=-1, card2=-1} = {})=>(
    {
        id:uuidv4(),
        name,
        role,
        swappedRole,
        playerDone,
        disconnected,
        voteID,
        voteCount,
        card1,
        card2
    }
)

/*
*   createMessage
*   Creates a message object.
*   @prop id {string}
*   @prop time {Date} the time is 24hr format i.e. 15:30
*   @prop message {string} actual string message
*   @prop sender {string} sender of message
*   @param {object}
*       message {string}
*       sender {string}
*/
const createMessage = ({message="", sender=""} = {}) => (
    {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

/*
*   createChat
*   Creates a Chat Object
*   @prop id {string}
*   @prop name {string}
*   @prop message {Array.Message}
*   @prop users {Array.string}
*   @param {object}
*       messages{Array.Message}
*       name {string}
*       users {Array.string}
*/
const createChat = ({messages=[], name="Commmunity", users=[]} = {}) => (
    {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers: []
    }
)
/* 
*   @param date {Date}
*   @return a string represented in 24 time i.e. '9:30', '21:30'
*/
const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
    createMessage,
    createChat,
    createUser
}