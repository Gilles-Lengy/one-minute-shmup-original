var playState = {

    create: function() {

        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

        var pad1 = game.input.gamepad.pad1;

        // To moves the ship
        //game.input.onDown.add(dump, this);

        // To detect the pressed buttons
        pad1.addCallbacks(this, {onConnect: game.addButtons360});

        // Hero
        var hero = game.add.sprite(game.world.centerX, -20, 'hero');
        hero.anchor.setTo(0.5, 0.5);
        game.add.tween(hero)
            .to({y: 470}, 2000, Phaser.Easing.Bounce.Out, true, 1000, 0, false)
            .to({x: 470}, 3500, Phaser.Easing.Linear.NONE, true, 0, 0, false)
            .to({x: 25}, 7000, Phaser.Easing.Linear.NONE, true, 0, 10000, true);
    },

    update: function() {
    },
    addButtons360 : function () {

        //  We can't do this until we know that the gamepad has been connected and is started

        buttonA = pad1.getButton(Phaser.Gamepad.XBOX360_A);
        buttonB = pad1.getButton(Phaser.Gamepad.XBOX360_B);
        buttonX = pad1.getButton(Phaser.Gamepad.XBOX360_X);
        buttonY = pad1.getButton(Phaser.Gamepad.XBOX360_Y);

        buttonA.onDown.add(onDown360, this);
        buttonB.onDown.add(onDown360, this);
        buttonX.onDown.add(onDown360, this);
        buttonY.onDown.add(onDown360, this);

        buttonA.onUp.add(onUp360, this);
        buttonB.onUp.add(onUp360, this);
        buttonX.onUp.add(onUp360, this);
        buttonY.onUp.add(onUp360, this);
    }

};
