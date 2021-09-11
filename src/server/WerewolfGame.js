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
        let playerlist = this.getPlayerList();
        playerlist.forEach(p => {
            this.players[p].role = this.deck.pop()
        })

        return this.players
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