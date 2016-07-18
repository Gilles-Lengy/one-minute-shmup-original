/**************************************************
 * Variables
 *************************************************/

var gamerOverState = {

    create: function () {
        
        // init
        this.scoreString = 'Score : ';
        if(game.global.bossDestroyed){
            this.bossDestroyedString = "You're the boss !";
            this.bossFrame=4;
        }else{
            this.bossDestroyedString = "You know who's the boss !";
            this.bossFrame=0;
        }

        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from pad1
        pad = game.input.gamepad.pad1;
        // To detect the pressed buttons
        pad.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(menuState.onDown, this);

        // The score
        this.scoreText = game.add.text(5, 0, this.scoreString + game.global.score, {fontSize: '18px', fill: '#fff'});

        // The boss text
        game.add.text(game.width / 2, 140, this.bossDestroyedString, {fontSize: '18px', fill: '#fff'});

        // The boss
        this.boss = game.add.sprite(game.width / 2, game.height / 2, 'boss');
        this.boss.anchor.setTo(0.5, 0.5);
        this.boss.frame=this.bossFrame;

        this.gameText = game.add.text(100, 100, 'game over', {fontSize: '36px', fill: '#fff'});

        // How to start the game, with tween
        var startLabel = game.add.text(game.width / 2, game.height - 20, 'Press the button START', {
            font: '25px Arial',
            fill: '#ffffff'
        });
        startLabel.anchor.setTo(0.5, 0.5);
        startLabel.alpha = 0;
        game.add.tween(startLabel).to({alpha: 1}, 750).yoyo(true).loop().delay(750).start();

        console.log('GameOver');

    },

    update: function () {



    }

};
