var loadState = {

    preload: function () {
        // Add a loading label that we won't to really load the google fonts
        var loadingLabel1 = game.add.text(game.width / 2, 600, 'loading...');
        loadingLabel1.font = 'Ranga';
        loadingLabel1.anchor.setTo(0.5, 0.5);

        var loadingLabel2 = game.add.text(game.width / 2, 600, 'loading...');
        loadingLabel2.font = 'Seaweed Script';
        loadingLabel2.anchor.setTo(0.5, 0.5);

        // Add a progress bar
        var progressBar = game.add.sprite(game.width / 2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        // Load all image assets
        game.load.image('hero-bullet', 'assets/images/bullet-hero-1.png');
        // Load all sprites assets
        game.load.spritesheet('hero', 'assets/images/hero-hitted-and-damaged.png', 40, 40);
        game.load.spritesheet('bomber', 'assets/images/enemy-bomber-1.png', 60, 40, 3);


    },

    create: function () {
        game.state.start('menu');
    }
};