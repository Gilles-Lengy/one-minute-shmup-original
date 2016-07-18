// Initialize Phaser
var game = new Phaser.Game(500, 500, Phaser.AUTO, 'gameDiv');

// Our 'global' variable
game.global = {
    score: 0,
    bossDestroyed: false
};

// Define states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gamerOver', gamerOverState);

// Start the "boot" state
game.state.start('boot');