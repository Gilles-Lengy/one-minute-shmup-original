var menuState = {

    create: function() { 
        // Name of the game with tween
        var nameLabel = game.add.text(game.width/2, 100, 'One Minute SHMUP Original', { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        nameLabel.scale.setTo(0, 0);
        game.add.tween(nameLabel.scale).delay(200).to({x: 1, y: 1}, 1000).easing(Phaser.Easing.Bounce.Out).start();
                
    }
};