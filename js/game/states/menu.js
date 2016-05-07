var menuState = {

    create: function() { 
        // Name of the game with tween
        var nameLabel = game.add.text(game.width/2, 80, 'ONE Minute SHMUP');
        nameLabel.fill = '#ffffff';
        nameLabel.font = 'Ranga';
        nameLabel.fontSize = 70;
        nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.scale.setTo(0, 0);

        var nameLabelOriginal = game.add.text(game.width/2, 140, 'Original');
        nameLabelOriginal.fill = '#ffffff';
        nameLabelOriginal.font = 'Seaweed Script';
        nameLabelOriginal.fontSize = 40;
        nameLabelOriginal.anchor.setTo(0.5, 0.5);
        nameLabelOriginal.scale.setTo(0, 0);

        game.add.tween(nameLabel.scale).to({x: 1, y: 1}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        game.add.tween(nameLabelOriginal.scale).to({x: 1, y: 1}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1000).start();


    }
};