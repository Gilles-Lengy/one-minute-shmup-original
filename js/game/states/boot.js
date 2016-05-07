var wfconfig = {

    active: function() {
        console.log("font loaded");
        bootState.preload();
    },

    google: {
        families: [ 'Ranga:700:latin' , 'Seaweed+Script:400:latin' ]
    }

};

WebFont.load(wfconfig);


var bootState = {

    preload: function () {
        game.load.image('progressBar', 'assets/images/preload-bar-white.png');
    },

    create: function() { 
        // Game settings
        game.stage.backgroundColor = '#000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        // Start the load state
        game.state.start('load');
    }
};