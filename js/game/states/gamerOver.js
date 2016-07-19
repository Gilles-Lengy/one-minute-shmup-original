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

        // The Game Over text
        this.scoreText = game.add.bitmapText(game.width / 2, 37, 'desonanz1', 'GAME OVER', 27);
        this.scoreText.anchor.setTo(0.5, 0.5);

        // The boss text
        //game.add.text(game.width / 2, 140, this.bossDestroyedString, {fontSize: '18px', fill: '#fff'});
        this.scoreText = game.add.bitmapText(game.width / 2, 160, 'desonanz1', this.scoreString + game.global.score, 22);
        this.scoreText.anchor.setTo(0.5, 0.5);

        // The boss
        this.boss = game.add.sprite(game.width / 2, game.height / 2, 'boss');
        this.boss.anchor.setTo(0.5, 0.5);
        this.boss.frame=this.bossFrame;

        this.bossDestroyedText = game.add.bitmapText(game.width / 2, 320, 'desonanz1', this.bossDestroyedString, 12);
        this.bossDestroyedText.anchor.setTo(0.5, 0.5);

        // How to start the game, with tween
        var startLabel = game.add.bitmapText(game.width / 2, game.height - 36, 'desonanz1','Press the button START',14);
        startLabel.anchor.setTo(0.5, 0.5);
        startLabel.alpha = 0;
        game.add.tween(startLabel).to({alpha: 1}, 750).yoyo(true).loop().delay(750).start();

        console.log('GameOver');

    },

    update: function () {



    }

};
