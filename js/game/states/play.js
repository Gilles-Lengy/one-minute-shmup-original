// Variables
var pad;
var hero;
var playState = {

    create: function () {




        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from pad1
        pad = game.input.gamepad.pad1;


        // Hero
        hero = game.add.sprite(game.world.centerX, 470, 'hero');
        hero.anchor.setTo(0.5, 0.5);
        hero.frame = 1;
        game.time.events.repeat(Phaser.Timer.SECOND * 0.18, 3, this.heroFlashes, this);

    },

    update: function () {
    },
    heroFlashes: function () {

        if (hero.frame === 0) {
            hero.frame = 1;
        } else {
            hero.frame = 0;
        }

    }

};
