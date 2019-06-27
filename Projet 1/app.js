new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {        // Fonction qui permet de remettre le jeu a 0 et les pdv a 100 pour tout le monde 
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({           // unshift est un push au debut du tableau (turns)
                isPlayer: true,
                text: 'Le Joueur inflige ' + damage + ' points de dégâts au Monstre'
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks();
        },

        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Le Joueur inflige violemment ' + damage + ' points de dégâts au Monstre'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },

        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Le joueur reçoit 10 points de vie'
            });
            this.monsterAttacks();
        },

        giveUp: function () {
            this.gameIsRunning = false;
        },

        monsterAttacks: function() {                   
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Le Monstre inflige ' + damage + ' points de dégâts au Joueur'
            });
        },

        calculateDamage: function(min, max) {                       // Fonction qui permet d'avoir un nb aleatoire entre un min et max
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin: function() {                // fonction qui permet de controler le code quand on gagne ou perd
            if (this.monsterHealth <= 0) {
                if (confirm('Vous avez gagné ! Nouvelle partie ?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;        // Si le joueur ne souhaite pas rejouer 
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('Vous avez perdu ! Rejouez ?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});