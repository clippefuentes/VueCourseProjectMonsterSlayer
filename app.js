function getRandomValue(min, max) {
    return Math.floor(Math.random() *  (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%'}
            }
            return { width: this.monsterHealth + '%'}
        },
        healthBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%'}
            }
            return { width: this.playerHealth + '%'}
        },
        specialAttackAvail() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.currentRound = 0
            this.winner = null
            this.logMessages = []
        },
        attackMonster() {
            this.currentRound++
            const maxDamage = 12 
            const minDamage = 6
            const attackValue = getRandomValue(minDamage, maxDamage)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer()
        },
        attackPlayer () {
            const maxDamage = 15 
            const minDamage = 8
            const attackValue = getRandomValue(minDamage, maxDamage)
            this.playerHealth -= attackValue
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            this.currentRound++
            const maxDamage = 25 
            const minDamage = 10
            const attackValue = getRandomValue(minDamage, maxDamage)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'super attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            this.currentRound++
            const maxDamage = 20
            const minDamage = 8
            const healValue = getRandomValue(minDamage, maxDamage)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessage('player', 'heal', healValue)
            this.attackPlayer()
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                who, what, value
            })
        }
    }
});



app.mount('#game')