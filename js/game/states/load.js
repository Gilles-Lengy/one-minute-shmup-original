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

        // Load Bitmap Fonts
        this.load.bitmapFont('desonanz0', 'assets/fonts/desonanz0.png', 'assets/fonts/desonanz0.fnt');
        this.load.bitmapFont('desonanz1', 'assets/fonts/desonanz1.png', 'assets/fonts/desonanz1.fnt');

        // Load all image assets
        game.load.image('pixel', 'assets/images/pixel.png');
        game.load.image('hero-bullet', 'assets/images/bullet-hero-1.png');
        game.load.image('trackerRay', 'assets/images/enemy-tracker-1-ray.png');
        game.load.spritesheet('bossRay', 'assets/images/boss-1-large-ray-1.png', 104, 10, 2);

        // Load all sprites assets
        game.load.spritesheet('hero', 'assets/images/hero-hitted-and-damaged.png', 40, 40);
        game.load.spritesheet('bomber', 'assets/images/enemy-bomber-1.png', 60, 40, 3);
        game.load.spritesheet('bomberExplode', 'assets/images/enemy-bomber-1-explode.png', 60, 40, 4);
        game.load.spritesheet('bomb1', 'assets/images/enemy-bomb-1-explode.png', 20, 30, 5);
        game.load.spritesheet('bomberRay', 'assets/images/enemy-bomber-rays.png', 6, 17, 3);
        game.load.spritesheet('tracker', 'assets/images/enemy-tracker-1-and-explode.png', 40, 36, 5);
        game.load.spritesheet('boss', 'assets/images/boss-1-explode.png', 120, 90, 5);


    },

    create: function () {
        game.state.start('menu');
    }
};