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
            // Hero health
            this.health = 6;
            // PosXXXX VelocityYYYYY
            this.heroBulletVelocityY = -400;
            this.bomberVelocityX = 75;
            this.trackerPosY = 260;
            this.trackerVelocityX = 200;
            this.trackerVelocityY = 1111;
            this.bossVelocityX = 125;
            // Bombs variables
            this.dropBombFactorMax = 100;
            this.dropBombFactorRef = 98; // Drop the bomb if 1->dropBombFactorMax > dropBombFactorRef
            this.bombVelocitY = 80;
            // Bombers rays
            this.fireBomberRayTimerDelta = 200;
            this.enemyBomberRayVelocitY = 333;
            this.fireBomberRayFactorMax = 100;
            this.fireBomberRayFactorRef = 95;
            this.fireBomberRayTimerDelta = 200;
            // Tracker rays
            this.fireTrackerRaysFactorMax = 100;
            this.fireTrackerRaysRef = 95;
            this.fireTrackerRaysTimerDelta = 100;
            this.fireTrackerRaysVelocitY = 333;
            // Boss Ray
            this.fireRayBossFactorMax = 100;
            this.fireRayBossFactorRef = 98;
            this.firebossRayTimerDelta = 222;
            this.bossRayMoveY = 200;
            // Scoring
            this.bombScore = 1;
            this.enemyBomberRayScore = 3;
            this.enemyTrackerRayScore = 5;
            this.bomberScore = 10;
            this.trackerScore = 35;
            //this.bossScore = 777;


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
            game.physics.arcade.enable(this.hero);

            // Create the hero-bullet group
            this.heroBullets = this.groupGenerator('heroBullets', 18, 'hero-bullet');


            // Create the bombers's Bombs
            this.enemyBombs = this.groupGenerator('enemyBombs', 30, 'bomb1');

            // Create the bomber's Ray
            this.enemyBomberRays = this.groupGenerator('enemyBomberRays', 30, 'bomberRay');

            // The Tracker's Rays
            this.enemyTrackerRayss = this.groupGenerator('enemyTrackerRayss', 30, 'trackerRay');

            // The Boss's Rays
            this.enemyBossRays = this.groupGenerator('enemyBossRays', 30, 'bossRay');

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
            //this.launchBomber(this.bomber1);

            //this.timerBombersGenerator = game.time.events.repeat(Phaser.Timer.SECOND / 4, 250, this.relaunchBomber, this);
            //this.timerBombersGenerator.start();

            //this.timerTrackerGenerator = game.time.events.repeat(Phaser.Timer.SECOND / 4, 250, this.relaunchTracker, this);
            //this.timerTrackerGenerator.start();

            this.timerGameCompleted = game.time.events.add(Phaser.Timer.MINUTE, this.gameCompleted, this);

            console.log('end create play');
        },

        update: function () {

            // Handle all the collisions
            game.physics.arcade.overlap(this.heroBullets, this.enemyBombs, this.heroBulletHitsEnemyBomb, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.enemyBomberRays, this.heroBulletHitsEnemyBomberRays, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.enemyTrackerRayss, this.heroBulletHitsEnemyTrackerRayss, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.enemyBossRays, this.heroBulletHitsEnemyBossRays, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.bomber1, this.heroBulletHitsBomber, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.bomber2, this.heroBulletHitsBomber, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.tracker, this.heroBulletHitsTracker, null, this);
            game.physics.arcade.overlap(this.heroBullets, this.boss, this.heroBulletHitsBoss, null, this);
            game.physics.arcade.overlap(this.hero, this.enemyBombs, this.bombHitHero, null, this);
            game.physics.arcade.overlap(this.hero, this.enemyBomberRays, this.bomberRayHitsHero, null, this);
            game.physics.arcade.overlap(this.hero, this.enemyTrackerRayss, this.enemyTrackerRaysHitsHero, null, this);
            game.physics.arcade.overlap(this.hero, this.enemyBossRays, this.enemyBossRaysHitsHero, null, this);

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
                this.bomberFiresRay(this.bomber1);
            }
            if (this.level > 2) {
                this.updateTracker();
                this.relaunchTracker();
                this.bomberFiresRay(this.bomber2);
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
        heroHit: function () {

            // The different states of the hero according to his health
            this.hero.animations.add('explode1', [1, 2], 10, false);
            this.hero.animations.add('explode2', [3, 4], 10, false);
            this.hero.animations.add('explode3', [5, 6], 10, false);
            this.hero.animations.add('explode4', [7, 8], 10, false);
            this.hero.animations.add('explode5', [9, 10], 10, false);
            this.hero.animations.add('explode6', [11, 10], 10, true);
            var health = this.health -= 1;
            switch (health) {
                case 5:
                    this.hero.play('explode1');
                    break;
                case 4:
                    this.hero.play('explode2');
                    break;
                case 3:
                    this.hero.play('explode3');
                    break;
                case 2:
                    this.hero.play('explode4');
                    break;
                case 1:
                    this.hero.play('explode5');
                    break;
                case 0:
                    this.hero.play('explode6');
                    this.gameCompleted();
                    break;
                default:
                    this.hero.kill();
                    break;
            }

        }, // Hero hit
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
            varBomber.dropBombTimer = game.time.now;
            varBomber.fireRayTimer = game.time.now;
            game.physics.arcade.enable(varBomber);
            varBomber.enableBody = true;
            varBomber.animations.add('blink');
            varBomber.animations.play('blink', 3, true);
            varBomber.name = nameBomber;
            return varBomber;

        },
        launchBomber: function (varBomber) {
            varBomber.loadTexture('bomber', 0);
            varBomber.animations.add('blink');
            varBomber.animations.play('blink', 3, true);
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
        updateBomber: function (varBomber) {
            // If varBomber out of game area
            if (varBomber.x < -60 || varBomber.x > 560) {
                varBomber.health = 0;
            }
            if (this.bomber1.health === 0) {

                this.launchBomber(this.bomber1);
            }
            if (this.bomber2.health === 0 && this.level > 1) {

                this.launchBomber(this.bomber2);
            }
            if (varBomber.health > 0) {
                this.dropsBomb(varBomber);
            }

        },
        dropsBomb: function (varBomber) {
            /*
             //  To avoid them being allowed to fire too fast we set a time limit
             if (game.time.now > varBomber.dropBombTimer) {
             //  Grab the first bullet we can from the pool
             var enemyBomb = this.enemyBombs.getFirstDead();
             if (!enemyBomb) {
             return;
             }
             // Determinate the dropBombFactor
             var dropBombFactor = this.game.rnd.integerInRange(1, this.dropBombFactorMax);
             if (enemyBomb && dropBombFactor > this.dropBombFactorRef && varBomber.health > 0) {
             //  And fire it
             enemyBomb.anchor.setTo(0.5, 0.5);
             enemyBomb.reset(varBomber.x, varBomber.y + varBomber.width / 2);
             enemyBomb.animations.frame = 0; // Set to the first frame otherwise, the last frame is displayed when the bomb 'respawn'
             enemyBomb.body.velocity.y = this.bombVelocitY;
             enemyBomb.alive = true;
             enemyBomb.health = 1;
             enemyBomb.dropBombTimer = game.time.now + this.fireBomberRayTimerDelta;
             }
             }*/
        }, //dropsBomb
        bomberFiresRay: function (varBomber) {
            /*
             //  To avoid them being allowed to fire too fast we set a time limit
             if (game.time.now > varBomber.fireRayTimer) {
             //  Grab the first bullet we can from the pool
             var enemyBomberRay = this.enemyBomberRays.getFirstDead();
             if (!enemyBomberRay) {
             return;
             }
             // Determinate the fire ray Factor
             var fireBomberRayFactor = this.game.rnd.integerInRange(1, this.fireBomberRayFactorMax);
             if (enemyBomberRay && fireBomberRayFactor > this.fireBomberRayFactorRef) {
             // Determinate if the bomber fires on the Left or on the Right
             var lr = this.game.rnd.integerInRange(1, 100);
             var bomderDeltaRayX;
             if (lr > 50) {
             bomderDeltaRayX = -27;
             } else {
             bomderDeltaRayX = 27;
             }
             // Determinate the color of the ray
             enemyBomberRay.frame = this.game.rnd.integerInRange(0, 2); // the sprite as 3 frames, one for each color
             //  And fire it
             enemyBomberRay.anchor.setTo(0.5, 0.5);
             enemyBomberRay.reset(varBomber.x + bomderDeltaRayX, varBomber.y + 25);
             enemyBomberRay.body.velocity.y = this.enemyBomberRayVelocitY;
             varBomber.fireRayTimer = game.time.now + this.fireBomberRayTimerDelta;
             }
             }
             /**/
        }, //firesRay
        bombHitHero: function (dummyHero, enemyBomb) {
            enemyBomb.kill();
            this.heroHit();
        },// Bomb hits hero
        bomberRayHitsHero: function (dummyHero, enemyRay) {
            enemyRay.kill();
            this.heroHit();
        },// Bomb hits hero
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
            this.fireRaysTimer = game.time.now;
            this.game.physics.arcade.enable(this.tracker);
            this.tracker.enableBody = true;
            this.tracker.name = 'tracker';

            this.tracker.heroDetectedByTracker = false;

            //return this.tracker;
        }
        ,
        launchTracker: function () {

            this.tracker.body.velocity.y = 0;
            this.tracker.body.y = this.trackerPosY;
            this.tracker.health = 1;
            this.tracker.heroDetectedByTracker = false;
            this.tracker.animations.frame = 0;


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

        }
        ,
        relaunchTracker: function () {

            if (this.tracker.health === 0 && this.level > 2) {
                this.launchTracker();
            }

        }
        ,
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
                // console.log(this.tracker.health + '/' + this.tracker.x + '/' + this.tracker.x)
                this.trackerFiresRays();
            }
        }
        ,
        trackerFiresRays: function () {
            /*
            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > this.fireRaysTimer) {
                // Determinate the dropBombFactor
                var fireTrackerRaysFactor = this.game.rnd.integerInRange(1, this.fireTrackerRaysFactorMax);
                //  Grab the first bullet we can from the pool
                var enemyTrackerRay1 = this.enemyTrackerRayss.getFirstDead();
                if (!enemyTrackerRay1) {
                    return;
                }
                if (enemyTrackerRay1 && fireTrackerRaysFactor > this.fireTrackerRaysRef) {
                    //  And fire it
                    enemyTrackerRay1.name = 'enemyTrackerRay';
                    enemyTrackerRay1.reset(this.tracker.x - 18, this.tracker.y + 18);
                    enemyTrackerRay1.body.velocity.y = this.fireTrackerRaysVelocitY;
                }
                var enemyTrackerRay2 = this.enemyTrackerRayss.getFirstExists(false);
                if (enemyTrackerRay2 && fireTrackerRaysFactor > this.fireTrackerRaysRef) {
                    //  And fire it
                    enemyTrackerRay2.name = 'enemyTrackerRay';
                    enemyTrackerRay2.reset(this.tracker.x + 18, this.tracker.y + 18);
                    enemyTrackerRay2.body.velocity.y = this.fireTrackerRaysVelocitY;
                    this.fireRaysTimer = game.time.now + this.fireTrackerRaysTimerDelta;
                }
            }
            /**/
        }
        ,//firesRays
        heroBulletHitsTracker: function (varTracker, heroBullet) {
            heroBullet.kill();

            anim = varTracker.animations.add('explode');
            anim.onComplete.add(this.trackerExploded, this);
            anim.play('explode', 9, false, false);
        }
        , //heroBulletHitsTracker
        trackerExploded: function (varTracker) {
            this.scored(this.trackerScore);
            varTracker.health = 0;
        }
        ,//trackerExploded
        enemyTrackerRaysHitsHero: function (dummyHero, enemyRay) {
            enemyRay.kill();
            this.heroHit();
        },// Track ray hits hero
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
             this.moveX = BossMove;
             } else {
             var x = 560;
             this.moveX = -BossMove;
             }
             */
            this.boss = game.add.sprite(560, 75, 'boss');
            this.boss.anchor.setTo(0.5, 0.5);
            this.boss.health = 5;
            this.boss.alive = true;
            game.physics.arcade.enable(this.boss);
            this.boss.fireRayTimer = game.time.now;

            //this.game.physics.arcade.enable(this.Boss);
            this.boss.name = 'boss';
            //return this.boss;
        }
        ,
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

        }
        ,
        updateBoss: function () {

            var posX = this.boss.x;
            // Moves the boss
            if (posX < 65) {
                this.boss.body.velocity.x = this.bossVelocityX;
            }
            if (posX > 435) {
                this.boss.body.velocity.x = -this.bossVelocityX;
            }
            // Boss fire
            this.firesRayBoss();
        }
        ,
        firesRayBoss: function () {
            //  To avoid them being allowed to fire too fast we set a time limit
            if (game.time.now > this.boss.fireRayTimer) {
                //  Grab the first bullet we can from the pool
                var bossRay = this.enemyBossRays.getFirstDead();
                if (!bossRay) {
                    return;
                }
                // Determinate the fireRayFactor
                var fireRayFactor = this.game.rnd.integerInRange(1, this.fireRayBossFactorMax);
                if (bossRay && fireRayFactor > this.fireRayBossFactorRef) {
                    //  And fire it
                    bossRay.reset(this.boss.x + 4, this.boss.y + 22);
                    bossRay.loadTexture('bossRay', 0);
                    bossRay.animations.add('blink');
                    bossRay.animations.play('blink', 8, true);
                    bossRay.body.velocity.y = this.bossRayMoveY;
                    this.fireRayTimer = game.time.now + this.firebossRayTimerDelta;
                    //console.log(this.fireRayTimer);
                }
            }
        }
        , // firesRayBoss
        enemyBossRaysHitsHero: function (dummyHero, enemyRay) {
            enemyRay.kill();
            this.heroHit();
        },// Boss ray hits hero
        heroBulletHitsBoss: function (varBoss, heroBullet) {
            heroBullet.kill();
            // The different states of the hero according to his health
            varBoss.animations.add('explode1', [0, 1]);
            varBoss.animations.add('explode2', [1, 2]);
            varBoss.animations.add('explode3', [2, 3]);
            varBoss.animations.add('explode4', [3, 4, 5]);
            varBoss.animations.add('explode5', [1, 2, 3, 4]);
            var health = varBoss.health -= 1;
            switch (health) {
                case 4:
                    varBoss.play('explode1', 10, true, false);
                    break;
                case 3:
                    varBoss.play('explode2', 10, true, false);
                    break;
                case 2:
                    varBoss.play('explode3', 10, true, false);
                    break;
                case 1:
                    varBoss.play('explode4', 10, true, false);
                    break;
                case 0:
                    varBoss.play('explode5', 10, true, true);
                    this.gameCompleted();
                    break;
                default:
                    varBoss.kill();
                    varBoss.alive = false;
                    break;
            }


        }
        , // heroBulletHitsBoss
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
        }
        ,
        heroBulletHitsEnemyBomb: function (heroBullet, enemyBomb) {
            heroBullet.kill();


            if (enemyBomb.health > 0) {
                this.scored(this.bombScore);
                enemyBomb.health = 0;
                enemyBomb.animations.add('bomb1Explode1');
                enemyBomb.animations.play('bomb1Explode1', 9, false, true);
            }
        }
        ,
        heroBulletHitsEnemyBomberRays: function (heroBullet, enemyBomberRay) {

            heroBullet.kill();
            enemyBomberRay.kill();
            this.scored(this.enemyBomberRayScore);
            console.log('bomber ray hitted');

        }
        ,//heroBulletHitsEnemyBomberRays
        heroBulletHitsEnemyTrackerRayss: function (heroBullet, enemyTrackerRay) {

            heroBullet.kill();
            enemyTrackerRay.kill();
            this.scored(this.enemyTrackerRayScore);
            console.log('Tracker ray hitted');

        }
        ,//heroBulletHitsEnemyTrackerRayss
        heroBulletHitsEnemyBossRays: function (heroBullet) {

            heroBullet.kill();

            console.log('enemyBossRay hitted');

        }
        ,//heroBulletHitsEnemyBossRays
        heroBulletHitsBomber: function (varBomber, heroBullet) {
            heroBullet.kill();

            varBomber.loadTexture('bomberExplode', 0);
            anim = varBomber.animations.add('explode');
            anim.onComplete.add(this.bomberExploded, this);
            anim.play('explode', 9, false, false);

        }
        ,
        bomberExploded: function (varBomber) {
            this.scored(this.bomberScore);
            varBomber.health = 0;

        }
        ,
        scored: function (score) {
            game.global.score += score;
            this.scoreText.setText(this.scoreString + game.global.score);
        }
        ,
        groupGenerator: function (varGroup, howMany, sprite) {
            varGroup = game.add.group();
            varGroup.enableBody = true;
            varGroup.createMultiple(howMany, sprite);
            varGroup.setAll('checkWorldBounds', true);
            varGroup.setAll('outOfBoundsKill', true);
            return varGroup;

        }
        ,//groupGenerator
        gameCompleted: function () {
            game.state.start('gamerOver');
        }
        ,
        shutdown: function () {

            // Ships
            this.hero.destroy();

            // Timers
            this.timerGameCompleted.timer.removeAll();
            this.timerHeroFlashes.timer.removeAll();
            this.timerCountDownGame.timer.removeAll();

            // Groups
            this.heroBullets.destroy();
            this.enemyBombs.destroy();
            this.enemyBomberRays.destroy();
            this.enemyTrackerRayss.destroy();
            this.enemyBossRays.destroy();

        }

    }
    ;
