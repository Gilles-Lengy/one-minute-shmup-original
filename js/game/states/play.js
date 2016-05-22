// Variables
var pad;
var hero;
var bomber1;
var bomber2;
var tracker;
var boss;

var playState = {

    create: function () {

        // Start gamepad
        game.input.gamepad.start();

        // To listen to buttons from pad1
        pad = game.input.gamepad.pad1;
        // To detect the pressed buttons
        pad.getButton(Phaser.Gamepad.XBOX360_A).onDown.add(this.onDown360Play, this);


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
        this.createBomber(bomber1, bomber1, 250);
        // Create Bomber 2
        this.createBomber(bomber2, bomber2, 175);
        // Create Tracker
        this.createTracker();
        // Create Boss
        this.createBoss();


    },

    update: function () {
        // Moves the Hero
        // Controls
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
        //this.dropBombTimer = game.time.now;
        //this.fireRayTimer = game.time.now;
        //this.game.physics.arcade.enable(this);
        varBomber.animations.add('blink');
        varBomber.animations.play('blink', 3, true);
        varBomber.name = nameBomber;

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
    }

};
