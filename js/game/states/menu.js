var menuState = {

    create: function () {

        // Variables
        var pad;

        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

        pad = game.input.gamepad.pad1;

        // To detect the pressed buttons
      //pad1.addCallbacks(this, {onConnect: game.addButtons360});
        pad.getButton(Phaser.Gamepad.XBOX360_START).onDown.add(this.onDown360Menu, this);

        // Hero
        var hero = game.add.sprite(game.world.centerX, -20, 'hero');
        hero.anchor.setTo(0.5, 0.5);
        game.add.tween(hero)
            .to({y: 470}, 2000, Phaser.Easing.Bounce.Out, true, 1000, 0, false)
            .to({x: 470}, 3500, Phaser.Easing.Linear.NONE, true, 0, 0, false)
            .to({x: 25}, 7000, Phaser.Easing.Linear.NONE, true, 0, 10000, true);
        //http://www.html5gamedevs.com/topic/1651-tween-oncompletecallback/

        // Name of the game with tween
        var nameLabel = game.add.text(game.width / 2, 80, 'ONE Minute SHMUP');
        nameLabel.fill = '#ffffff';
        nameLabel.font = 'Ranga';
        nameLabel.fontSize = 70;
        nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.scale.setTo(0, 0);

        var nameLabelOriginal = game.add.text(game.width / 2, 140, 'Original');
        nameLabelOriginal.fill = '#ffffff';
        nameLabelOriginal.font = 'Seaweed Script';
        nameLabelOriginal.fontSize = 40;
        nameLabelOriginal.anchor.setTo(0.5, 0.5);
        nameLabelOriginal.scale.setTo(0, 0);

        game.add.tween(nameLabel.scale).to({x: 1, y: 1}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        game.add.tween(nameLabelOriginal.scale).to({
            x: 1,
            y: 1
        }, 1000).easing(Phaser.Easing.Bounce.Out).delay(1000).start();

        // How to start the game, with tween
        var startLabel = game.add.text(game.width / 2, game.height / 2, 'Press the button START', {
            font: '25px Arial',
            fill: '#ffffff'
        });
        startLabel.anchor.setTo(0.5, 0.5);
        startLabel.alpha = 0;
        game.add.tween(startLabel).to({alpha: 1}, 750).yoyo(true).loop().delay(750).start();


    },
    onDown360Menu:function(button) {
    console.log('onDown360 MENU');
    if (button.buttonCode === Phaser.Gamepad.XBOX360_START) {
        console.log('Go to Play');
        game.state.start('play');
    }

}

};

