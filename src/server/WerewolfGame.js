const io = require('./index.js').io
const { CHANGE_TURN, RESET, UPDATE_USER } = require("../Events");

class WerewolfGame {

    static ROLE_WEREWOLF = "ROLE_WEREWOLF";
    static ROLE_SEER = "ROLE_SEER";
    static ROLE_ROBBER = "ROLE_ROBBER";
    static ROLE_TROUBLEMAKER = "ROLE_TROUBLEMAKER";
    static ROLE_VILLAGER = "ROLE_VILLAGER";
    static BASE_DECK = [
        WerewolfGame.ROLE_WEREWOLF,
        WerewolfGame.ROLE_WEREWOLF,
        WerewolfGame.ROLE_ROBBER,
        WerewolfGame.ROLE_SEER,
        WerewolfGame.ROLE_VILLAGER,
        WerewolfGame.ROLE_VILLAGER
    ]

    static BASE_PLAYER_SIZE = 3;

    constructor(users, updateUsers, resetAll) {
        this.players = users;
        this.deck = [...WerewolfGame.BASE_DECK]
        this.currentTimeout = null;
        this.updateUsers = updateUsers
        this.resetAll = resetAll
    }

    initialize() {
        // for each player above 3, add an additional villager
        for (let i = 0; i < this.getPlayerCount() - WerewolfGame.BASE_PLAYER_SIZE; i++) {
            this.deck.push(WerewolfGame.ROLE_VILLAGER)
        }
        // shuffle deck
        this.shuffleDeck()

        // assign roles to player
        let playerlist = this.getPlayerList();
        playerlist.forEach(p => {
            this.players[p].role = this.deck.pop()
        })

        return this.players
    }

    getCenterDeck(){
        return this.deck
    }

    randomizeCards(user, cards){
        let playerlist = this.getPlayerList();
        
        console.log("cards:" + cards)
        playerlist.forEach(p => {
            if(this.players[p].id == user.id){
                if(cards == 1){
                    var key = Math.floor(Math.random() * this.deck.length);
                    this.players[p].card1 = key
                    console.log("key:" + key)
                }
                else if(cards== 2){
                    var key = Math.floor(Math.random() * this.deck.length);
                    this.players[p].card1 = key
                    while ((key = Math.floor(Math.random() * this.deck.length)) == this.players[p].card1);
                    this.players[p].card2 = key
                }
            }
        })
        this.updateUsers(this.players)
    }


    updatePlayerDone(role){
        let playerlist = this.getPlayerList();
        playerlist.forEach(p => {
            if(this.players[p].role == role){
                this.players[p].playerDone = true
            }
        })
        //this.updateUsers(this.players)
    }

    rob(robber, robbed){
        let playerlist = this.getPlayerList();
        let swapped_role = robber.role
        playerlist.forEach(p => {
            if(this.players[p].id == robber.id){
                this.players[p].swappedRole = robbed.role
                this.players[p].playerDone = true
            }
            else if(this.players[p].id == robbed.id){
                this.players[p].swappedRole = swapped_role
            }
        })
        this.updateUsers(this.players)
    }

    vote(voter, vote){
        let playerlist = this.getPlayerList();
        playerlist.forEach(p => {
            if(this.players[p].id == voter){
                this.players[p].voteID = vote
            }
            if(this.players[p].id == vote){
                this.players[p].voteCount += 1;
            }
        })
        this.updateUsers(this.players)
    }

    fillEmptyVotes(){
        let playerlist = this.getPlayerList();
        var personToLeft = this.players[playerlist[this.getPlayerCount() - 1]].name
        playerlist.forEach(p => {
            if(this.players[p].voteID == ""){
                this.players[p].voteID = personToLeft
            }
            personToLeft = this.players[p].name
        })
        this.updateUsers(this.players)
    }

    finalize_roles(){
        let playerlist = this.getPlayerList();
        playerlist.forEach(p => {
            if(this.players[p].swappedRole != ""){
                this.players[p].role = this.players[p].swappedRole
            }
        })
        //this.updateUsers(this.players)
    }

    mainGame(){
        io.emit(CHANGE_TURN,"VIEW", 10, "Welcome to Ultimate Werewolf")
        setTimeout(() => this.startWerewolf(),10000)
    }
    startWerewolf(){
        io.emit(CHANGE_TURN,"ROLE_WEREWOLF", 20, "Wake up Werewolves")
        setTimeout(() => this.startSeer(),20000)
    }
    startSeer(){
        this.updatePlayerDone("ROLE_WEREWOLF")
        io.emit(CHANGE_TURN,"ROLE_SEER", 20, "Wake up Seers")
        setTimeout(() =>this.startRobber(),20000)
    }
    startRobber(){
        this.updatePlayerDone("ROLE_SEER")
        io.emit(CHANGE_TURN,"ROLE_ROBBER", 20, "Wake up Robbers")
        setTimeout(() =>this.startDiscussion(),20000)
    }
    startDiscussion(){
        this.updatePlayerDone("ROLE_ROBBER")
        io.emit(CHANGE_TURN,"DISCUSSION", 300, "Wake up Everyone, Discussion Time")
        this.finalize_roles()
        this.currentTimeout = setTimeout(() =>this.startVote(),300000)
    }
    startVote(){
        io.emit(CHANGE_TURN,"START_VOTE", 20, "Time to Vote")
        setTimeout(() =>this.endVote(),20000)
    }
    endVote(){
        this.fillEmptyVotes()
        let playerlist = this.getPlayerList();
        let voteList = [];
        let high = 0;
        let werewolf_in_game = false;
        let winners = "NO ONE"
        let message = ""

        playerlist.forEach(p => {
            let vote = this.players[p].voteID;
            this.players[vote].voteCount += 1;

            console.log(this.players[p].role)
            if(this.players[p].role == "ROLE_WEREWOLF"){
                werewolf_in_game = true;
            }
        })

        playerlist.forEach(p => {
            if (this.players[p].voteCount > high) {
                high = this.players[p].voteCount
                voteList.length = 0
                voteList.push(this.players[p])
            } else if (this.players[p].voteCount == high) {
                voteList.push(this.players[p])
            }
            console.log(voteList)
        })

        console.log("werewolf_in_game:", werewolf_in_game)
        console.log("playerlist:", playerlist)
        console.log(voteList);

        if (werewolf_in_game) {
            winners = "WEREWOLVES"
        } else if (this.getPlayerCount() === voteList.length) {
            winners = "VILLAGERS"
        }

        voteList.forEach(p => {
            console.log(p.role)
            if (p.role === "ROLE_WEREWOLF") {
                winners = "VILLAGERS"
            }
        })

        message = "And the winner is... " + winners;
        /*
        if(wwVote){
            message = "And the winner is... VILLAGERS"
        } else{
            if(high === 1){
                message = "And the winner is... VILLAGERS"
            } else{
                message = "And the winner is... WEREWOLVES"
            }
        } */

        io.emit(CHANGE_TURN,"RESULTS", 20, message)
        setTimeout(() =>this.endGame(),20000)
    }
    endGame(){
        this.resetAll()
    }
    
    stopTimer(){
        clearTimeout(this.currentTimeout);
    }

    getPlayerCount() {
        return Object.keys(this.players).length;
    }

    getPlayerList() {
        return Object.keys(this.players);
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
}

module.exports = WerewolfGame