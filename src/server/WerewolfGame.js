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

    constructor(users) {
        this.players = users;
        this.deck = [...WerewolfGame.BASE_DECK]
    }

    initialize() {
        // for each player above 3, add an additional villager
        for (let i = 0; i < this.getPlayerCount() - WerewolfGame.BASE_PLAYER_SIZE; i++) {
            this.deck.push(WerewolfGame.ROLE_VILLAGER)
        }
        // shuffle deck
        this.shuffleDeck()

        // assign roles to player
        let playerlist = this.getPlayerList()
        playerlist.forEach(p => {
            let role = this.deck.pop()
            this.players[p].role = role
            this.players[p].originalRole = role
        })

        return this.players
    }

    /**
     * Iterates through the player list and gets all werewolves
     * For use in werewolf phase
     * @returns A list of strings containing the player names of werewolves
     */
    getWerewolves() {
        let playerlist = this.getPlayerList()
        let werewolves = []

        playerlist.forEach(p => {
            if (this.players[p].role === WerewolfGame.ROLE_WEREWOLF) {
                werewolves.push(p)
            }
        })

        return werewolves
    }

    /**
     * Gets the role of a player, for use in seer role
     * @param {String} player Player name, not id
     * @returns Role of given player in String
     */
    getRoleOfPlayer(player) {
        if (this.players[player]) {
            return this.players[player].role
        }
        return null
    }

    /**
     * Gets the role of the chosen card in the center
     * For use in Seer and Werewolf
     * @param {Number} cardNum Card number of deck to pick
     * @returns Role of given card number in deck
     */
    getRoleOfDeck(cardNum) {
        return this.deck[cardNum]
    }

    /**
     * Swaps the roles of the two players
     * @param {String} player1 
     * @param {String} player2 
     */
    swapPlayerRoles(player1, player2) {
        let tempRole = this.players[player1].role
        this.players[player1].role = this.players[player2].role
        this.players[player2].role = tempRole
    }

    /**
     * Determines the winners of the game
     * @param {List<String>} votes A list of the voted player's usernames
     * @returns 
     */
    determineWinners(votes) {
        const WINNER = {
            VILLAGERS: "VILLAGERS",
            WEREWOLVES: "WEREWOLVES",
            NO_ONE: "NO_ONE"
        }

        let frequency = {}
        let max = 0
        let voted = []
        let winners = WINNER.WEREWOLVES

        // Get player with most votes
        votes.forEach(v => {
            frequency[v] = (frequency[v] || 0) + 1
            if (frequency[v] === max) {
                voted.push(v)
            } else if (frequency[v] >= max) {
                voted.length = 0 // empty array
                voted.push(v)
                max = frequency[v]
            }
        })

        // If there is a werewolf among the players
        if (this.getWerewolves.length > 0) {
            // Check if at least one of them is a werewolf
            voted.forEach(p => {
                if (this.players[p].role === WerewolfGame.ROLE_WEREWOLF) {
                    // Villagers win if there is
                    winners = WINNER.VILLAGERS
                }
            })
        } else {
            // Check if everyone voted for each other
            if (voted.length === this.getPlayerCount()) {
                // Villagers win if they did
                winners = WINNER.VILLAGERS
            } else {
                // No one wins if they didn't
                winners = WINNER.NO_ONE
            }
        }

        return winners
    }

    getPlayerCount() {
        return Object.keys(this.players).length
    }

    getPlayerList() {
        return Object.keys(this.players)
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }

    getDeckLength() {
        return this.deck.length
    }
}

module.exports = WerewolfGame