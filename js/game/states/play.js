/**************************************************
 * Variables
 *************************************************/
// Input
var pad;

// texts
var countdownDisplay = 60;
var countdownString = 'Countdown : ';
var countdownText;
var scoreString = 'Score : ';
var scoreText;
var levelString = 'Level : ';
var level = 1;
var levelText;

// Hero
var hero;

// Enemies
var bomber1;
var bomber2;
var tracker;
var boss;

// VelocityX
var bomberVelocityX = 75;

var playState = {

    create: function () {

        // Global Variables
        game.global.score = 0;

        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from pad1
        pad = game.input.gamepad.pad1;
        // To detect the pressed buttons
        pad.getButton(Phaser.Gamepad.XBOX360_A).onDown.add(this.onDown360Play, this);

        // The countdown and the level
        game.time.events.repeat(Phaser.Timer.SECOND, 60, this.countDown, this);
        countdownText = game.add.text(200, 0, countdownString + countdownDisplay, {fontSize: '18px', fill: '#fff'});
        levelText = game.add.text(420, 0, levelString + level, {fontSize: '18px', fill: '#fff'});

        // The score
        scoreText = game.add.text(5, 0, scoreString + game.global.score, {fontSize: '18px', fill: '#fff'});


        // Hero
        hero = game.add.sprite(game.world.centerX, 470, 'hero');
        hero.anchor.setTo(0.5, 0.5);
        hero.frame = 1;
        game.time.events.repeat(Phaser.Timer.SECOND * 0.18, 3, this.heroFlashes, this);

        // Create the hero-bullet group
        this.heroBullets = game.add.group();
        this.heroBullets.enableBody = true;
        this.heroBullets.createMultiple(18, 'hero-bullet');

        // Create Bomber 1
        bomber1 = this.createBomber(bomber1, bomber1, 250);
        // Create Bomber 2
        bomber2 = this.createBomber(bomber2, bomber2, 175);
        // Hide Bomber 2;
        bomber2.x = 560;

        // Create Tracker
        this.createTracker();
        // Create Boss
        this.createBoss();

        // Launch Bomber 1
        this.launchBomber(bomber1);
        game.time.events.repeat(Phaser.Timer.SECOND / 4, 240, this.relaunchBomber, this);

    },

    update: function () {

        // Moves the Hero
        if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
            if (hero.x > 25) {
                hero.x -= 3;
            }
        }
        else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
            if (hero.x < 475) {
                hero.x += 3;
            }
        }

        this.updateBomber(bomber1);

        if (level > 1) {
            this.updateBomber(bomber2);
        }


    },
    heroFlashes: function () {

        if (hero.frame === 0) {
            hero.frame = 1;
        } else {
            hero.frame = 0;
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
        bullet.reset(hero.x, hero.y - hero.height / 2);
        bullet.body.velocity.y = -400;

        // Kill the bullet when out of the world
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;
    },
    onDown360Play: function (button) {
        console.log('onDown360 Play');
        if (button.buttonCode === Phaser.Gamepad.XBOX360_A) {
            this.heroFireBullet();
        }
    },
    createBomber: function (varBomber, nameBomber, YPosBomber) {
        varBomber = game.add.sprite(game.world.centerX, YPosBomber, 'bomber');
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
            varBomber.body.velocity.x = bomberVelocityX;
        } else {
            varBomber.x = 560;
            varBomber.body.velocity.x = -bomberVelocityX;
        }

    },
    relaunchBomber: function () {

        if (bomber1.health === 0) {

            this.launchBomber(bomber1);
        }
        if (bomber2.health === 0 && level > 1) {

            this.launchBomber(bomber2);
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
        tracker = game.add.sprite(game.world.centerX, 125, 'tracker');
        tracker.anchor.setTo(0.5, 0.5);
        tracker.alive = true;
        //this.game.physics.arcade.enable(this.tracker);
        tracker.name = 'tracker';
        //this.tracker.heroDetectedByTracker = false;
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
        boss = game.add.sprite(game.world.centerX, 75, 'boss');
        boss.anchor.setTo(0.5, 0.5);
        boss.health = 5;
        boss.alive = true;
        //boss.fireRayTimer = game.time.now;

        //this.game.physics.arcade.enable(this.boss1);
        boss.name = 'boss';
    },
    countDown: function () {
        countdownDisplay -= 1;
        countdownText.setText(countdownString + countdownDisplay);
        switch (countdownDisplay) {
            case 45:
                level = 2;
                break;
            case 30:
                level = 3;
                break;
            case 15:
                level = 4;
                break;
        }
        levelText.setText(levelString + level);
    }

};
