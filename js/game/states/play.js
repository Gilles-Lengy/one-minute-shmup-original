var playState = {

    create: function () {
        console.log('begin create play');
        /**************************************************
         * Init
         *************************************************/
        // Global Variables
        game.global.score = 0;
        // Texts
        this.countdownDisplay = 60;
        this.countdownString = 'Countdown : ';
        this.scoreString = 'Score : ';
        this.levelString = 'Level : ';
        // Level
        this.level = 1;
        // PosXXXX VelocityYYYYY
        this.heroBulletVelocityY = -400;
        this.bomberVelocityX = 75;
        this.trackerPosY = 260;
        this.trackerVelocityX = 200;
        this.trackerVelocityY = 1111;
        this.bossVelocityX = 125;


        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from pad1
        pad = game.input.gamepad.pad1;
        // To detect the pressed buttons
        pad.getButton(Phaser.Gamepad.XBOX360_A).onDown.add(this.onDown360Play, this);

        // The countdown and the level
        this.timerCountDownGame = game.time.events.repeat(Phaser.Timer.SECOND, 60, this.countDown, this);
        this.countdownText = game.add.text(200, 0, this.countdownString + this.countdownDisplay, {
            fontSize: '18px',
            fill: '#fff'
        });
        this.levelText = game.add.text(420, 0, this.levelString + this.level, {fontSize: '18px', fill: '#fff'});

        // The score
        this.scoreText = game.add.text(5, 0, this.scoreString + game.global.score, {fontSize: '18px', fill: '#fff'});


        // Hero
        console.log('create hero');
        this.hero = game.add.sprite(game.world.centerX, 470, 'hero');
        this.hero.anchor.setTo(0.5, 0.5);
        this.hero.frame = 1;
        this.timerHeroFlashes = game.time.events.repeat(Phaser.Timer.SECOND * 0.18, 3, this.heroFlashes, this);

        // Create the hero-bullet group
        this.heroBullets = game.add.group();
        this.heroBullets.enableBody = true;
        this.heroBullets.createMultiple(18, 'hero-bullet');
        this.heroBullets.setAll('checkWorldBounds', true);
        this.heroBullets.setAll('outOfBoundsKill', true);// The bombers's Bombs


        // Create Bomber 1
        this.bomber1 = this.createBomber(this.bomber1, 'bomber1', 145);
        console.log('bomber1 created');
        // Create Bomber 2
        this.bomber2 = this.createBomber(this.bomber2, 'bomber2', 195);
        console.log('bomber2 created');

        // Create Tracker
        console.log('before tracker create');
        this.createTracker();
        console.log('tracker created');

        // Create Boss
        console.log('before boss create');
        this.createBoss();
        console.log('boss created');


        // Launch Bomber 1
        this.launchBomber(this.bomber1);
        this.timerBombersGenerator = game.time.events.repeat(Phaser.Timer.SECOND / 4, 250, this.relaunchBomber, this);
        //this.timerBombersGenerator.start();

        this.timerTrackerGenerator = game.time.events.repeat(Phaser.Timer.SECOND / 4, 250, this.relaunchTracker, this);
        //this.timerTrackerGenerator.start();

        this.timerGameCompleted = game.time.events.add(Phaser.Timer.MINUTE, this.gameCompleted, this);

        console.log('end create play');
    },

    update: function () {

        // Moves the Hero
        if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
            if (this.hero.x > 25) {
                this.hero.x -= 3;
            }
        }
        else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
            if (this.hero.x < 475) {
                this.hero.x += 3;
            }
        }

        this.updateBomber(this.bomber1);

        if (this.level > 1) {
            this.updateBomber(this.bomber2);
        }
        if (this.level > 2) {
            this.updateTracker();
            this.relaunchTracker();
        }
        if (this.level > 3) {
            if (this.boss.health === 0) {
                this.launchBoss();
            }
            this.updateBoss();
        }


    },
    heroFlashes: function () {

        if (this.hero.frame === 0) {
            this.hero.frame = 1;
        } else {
            this.hero.frame = 0;
        }

    },
    heroFireBullet: function () {
        console.log('heroFireBullet');
        // Retrieve a bullet from the bullets group
        var bullet = this.heroBullets.getFirstDead();
        if (!bullet) {
            return;
        }

        // Init the bullet
        bullet.anchor.setTo(0.5, 1);
        bullet.reset(this.hero.x, this.hero.y - this.hero.height / 2);
        bullet.body.velocity.y = this.heroBulletVelocityY;

    },
    onDown360Play: function (button) {
        //console.log('onDown360 Play');
        if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
            this.heroFireBullet();
        }
    },
    createBomber: function (varBomber, nameBomber, YPosBomber) {
        varBomber = game.add.sprite(560, YPosBomber, 'bomber');
        varBomber.anchor.setTo(0.5, 0.5);
        varBomber.alive = true;
        varBomber.health = 0;
        //this.dropBombTimer = game.time.now;
        //this.fireRayTimer = game.time.now;
        game.physics.arcade.enable(varBomber);
        varBomber.enableBody = true;
        varBomber.animations.add('blink');
        varBomber.animations.play('blink', 3, true);
        varBomber.name = nameBomber;
        return varBomber;

    },
    launchBomber: function (varBomber) {
        varBomber.health = 1;
        // var
        var lr;

        // Determinate if the bomber appear on the Left or on the Right
        lr = game.rnd.integerInRange(1, 100);
        // The starting position of the bomber and consequently his moving direction
        if (lr > 50) {
            varBomber.x = -60;
            varBomber.body.velocity.x = this.bomberVelocityX;
        } else {
            varBomber.x = 560;
            varBomber.body.velocity.x = -this.bomberVelocityX;
        }

    },
    relaunchBomber: function () {

        if (this.bomber1.health === 0) {

            this.launchBomber(this.bomber1);
        }
        if (this.bomber2.health === 0 && this.level > 1) {

            this.launchBomber(this.bomber2);
        }
    },
    updateBomber: function (varBomber) {
        // alive false if varBomber out of game area
        if (varBomber.x < -60 || varBomber.x > 560) {
            varBomber.health = 0;
        }
    },
    createTracker: function () {
        // var
        //var lr;
        //var y;
        //this.game = game;
        // Determinate if the tracker appear on the Left or on the Right
        //lr = this.game.rnd.integerInRange(1, 100);
        // The starting position of the tracker and consquently his moving direction
        //var y = 125;
        /*
         this.moveY = 0;
         if (lr > 50) {
         var x = -60;
         this.moveX = trackerMoveX;
         } else {
         var x = 560;
         this.moveX = -trackerMoveX;
         }
         this.health = 1;
         */

        //this.fireRaysTimer = game.time.now;
        this.tracker = game.add.sprite(520, this.trackerPosY, 'tracker');
        this.tracker.anchor.setTo(0.5, 0.5);
        this.tracker.alive = true;
        this.tracker.health = 0;
        this.game.physics.arcade.enable(this.tracker);
        this.tracker.enableBody = true;
        this.tracker.name = 'tracker';

        this.tracker.heroDetectedByTracker = false;

        //return this.tracker;
    },
    launchTracker: function () {

        this.tracker.body.velocity.y = 0;
        this.tracker.body.y = this.trackerPosY;
        this.tracker.health = 1;
        this.tracker.heroDetectedByTracker = false;


        // var
        var lr;

        // Determinate if the bomber appear on the Left or on the Right
        lr = game.rnd.integerInRange(1, 100);
        // The starting position of the bomber and consequently his moving direction
        if (lr > 50) {
            this.tracker.x = -40;
            this.tracker.body.velocity.x = this.trackerVelocityX;
        } else {
            this.tracker.x = 540;
            this.tracker.body.velocity.x = -this.trackerVelocityX;
        }

    },
    relaunchTracker: function () {

        if (this.tracker.health === 0 && this.level > 2) {
            this.launchTracker();
        }

    },
    updateTracker: function () {
        if (this.tracker.health === 1) {
            var posX = this.tracker.x;
            // Moves the tracker
            if (posX < 25) {
                this.tracker.body.velocity.x = this.trackerVelocityX;
            }
            if (posX > 475) {
                this.tracker.body.velocity.x = -this.trackerVelocityX;
            }

            // Detect if the hero is near below
            if (this.hero.x > posX - 40 && this.hero.x < posX + 120 && !this.tracker.heroDetectedByTracker) {
                var yTrackerGoDownFactor = this.game.rnd.integerInRange(1, 100000);
                if (yTrackerGoDownFactor < 2000) {// Go down
                    this.tracker.body.velocity.x = 0;
                    this.tracker.body.velocity.y = this.trackerVelocityY;
                    this.tracker.heroDetectedByTracker = true;
                }
            }

            // Kill tracker if out of game area
            if (this.tracker.y > 540) {
                this.tracker.health = 0;
            }
            console.log(this.tracker.health + '/' + this.tracker.x + '/' + this.tracker.x)
        }
    },
    createBoss: function () {
        // var
        /*
         var lr;
         var y;
         this.game = game;
         // Determinate if the bomber appear on the Left or on the Right
         lr = this.game.rnd.integerInRange(1, 100);
         // The starting position of the bomber and consquently his moving direction
         y = 25;
         if (lr > 50) {
         var x = -60;
         this.moveX = boss1Move;
         } else {
         var x = 560;
         this.moveX = -boss1Move;
         }
         */
        this.boss = game.add.sprite(560, 75, 'boss');
        this.boss.anchor.setTo(0.5, 0.5);
        this.boss.health = 0;
        this.boss.alive = true;
        game.physics.arcade.enable(this.boss);
        //boss.fireRayTimer = game.time.now;

        //this.game.physics.arcade.enable(this.boss1);
        this.boss.name = 'boss';
        //return this.boss;
    },
    launchBoss: function () {
        this.boss.health = 5;
        // var
        var lr;

        // Determinate if the bomber appear on the Left or on the Right
        lr = game.rnd.integerInRange(1, 100);
        // The starting position of the bomber and consequently his moving direction
        if (lr > 50) {
            this.boss.x = -60;
            this.boss.body.velocity.x = this.bossVelocityX;
        } else {
            this.boss.x = 560;
            this.boss.body.velocity.x = -this.bossVelocityX;
        }

    },
    updateBoss: function () {

        var posX = this.boss.x;
        // Moves the boss
        if (posX < 65) {
            this.boss.body.velocity.x = this.bossVelocityX;
        }
        if (posX > 435) {
            this.boss.body.velocity.x = -this.bossVelocityX;
        }
    },
    countDown: function () {
        this.countdownDisplay -= 1;
        this.countdownText.setText(this.countdownString + this.countdownDisplay);
        switch (this.countdownDisplay) {
            case 45:
                this.level = 2;
                break;
            case 30:
                this.level = 3;
                break;
            case 15:
                this.level = 4;
                break;
        }
        this.levelText.setText(this.levelString + this.level);
    },
    gameCompleted: function () {
        game.state.start('gamerOver');
    },
    shutdown: function () {
        this.hero.destroy();
        this.timerGameCompleted.timer.removeAll();
        this.timerHeroFlashes.timer.removeAll();
        this.timerCountDownGame.timer.removeAll();
        this.timerBombersGenerator.timer.removeAll();
        this.timerTrackerGenerator.timer.removeAll();

    }

};
