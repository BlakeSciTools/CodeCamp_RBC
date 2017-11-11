var RANDOMCHOICES =  [2200, 3050, 4120, 5300, 6000, 7400, 8000];

NinjaGame.Game = function(game) {
};

NinjaGame.Game.prototype = {
	init: function() {
    	//Called as soon as we enter this state
        this.arrow = this.input.keyboard.createCursorKeys();
		this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.labbyCount = 4;
        
    },

    preload: function() {
        //Assets to be loaded before create() is called
        this.load.image("energy", "Assets/Sprites/preload.png");
    },

    create: function() {
        //Adding sprites, sounds, etc...

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#6574A6';

        // Energy bar
        this.energyBar = this.add.sprite(0, 20, "energy");
        this.energyBar.x = this.game.width/2 - this.energyBar.width/2;
        this.energyBar.defaultWidth = this.energyBar.width;

        // Create the collision map
        this.CollisionMap = this.add.tilemap('CollisionMap', 8, 8);
        this.layer = this.CollisionMap.createLayer(0);

        // Create visual main map.
        this.MainMap = this.add.tilemap('MainMap', 8, 8);
        //console.log("MainMap:", this.MainMap);
        this.MainMap.addTilesetImage('tileset');
        this.layer1 = this.MainMap.createLayer(0);
        this.layer1.resizeWorld();

        // Create the player.
        NinjaGame.globals.player.sprite = this.add.sprite(NinjaGame.globals.player.x, NinjaGame.globals.player.y, NinjaGame.globals.player.spriteName);
        NinjaGame.globals.player.sprite.anchor.setTo(.5, .5);

        // Give player physics.
        this.physics.enable(NinjaGame.globals.player.sprite, Phaser.Physics.ARCADE);
        NinjaGame.globals.player.sprite.body.velocity.setTo(NinjaGame.globals.player.x, NinjaGame.globals.player.y);
        NinjaGame.globals.player.sprite.body.collideWorldBounds = true;

        this.camera.follow(NinjaGame.globals.player.sprite);

        // Create labby group.
        NinjaGame.globals.labby.labbyGroup = this.add.physicsGroup();

        // Add labbys. Using the labby object in globals.
        for (i = 0; i < this.labbyCount; i++) {
            var labby = NinjaGame.globals.labby.labbyGroup.create(NinjaGame.globals.labby.xs[i], NinjaGame.globals.labby.ys[i], i.toString());
            labby.anchor.setTo(.5, .5);
            var rChoice = Math.floor(Math.random() * 3);
            var randN   = Math.floor(Math.random() * 2);
            var randN1  = Math.floor(Math.random() * 2) + 2; 
            
            if (rChoice == 0) {
                randN1 = null;
            } else if(rChoice == 1) {
                randN = null;
            } else {
                // nuttin
            };
            // Inserting an object into the labby object on the fly cause im tilted.
            var labbyObject = function(labby, randN, randN1, randD) {      
                var object = {
                    sprite: labby,
                    speed: NinjaGame.globals.labby.baseSpeed,
                    distance: RANDOMCHOICES[Math.floor(Math.random() * 7)],
                    inverseLastHit: 0,
                    waiting: false,
                    upDownDirection: randN,
                    leftRightDirection: randN1,
                    setDistance: function(value) {
                        this.distance = value;
                    },

                    changeDirection: function(random, mDirection, sDirection) {
                        if (random) {
                            var randomNum    = Math.floor(Math.random() * 2);
                            var randomNum2   = Math.floor(Math.random() * 2);
                            var randomChoice = Math.floor(Math.random() * 3);

                            
                            if (randomChoice == 0) {
                                this.upDownDirection = randomNum;
                                this.leftRightDirection = null
                            } else if(randomChoice == 1) {
                                this.upDownDirection = randomNum;
                                this.leftRightDirection = randomNum2 + 2;
                            } else {
                                this.upDownDirection = null;
                                this.leftRightDirection = randomNum2 + 2;
                            };
                        } else {
                            if (sDirection == null) {
                                this.upDownDirection = mDirection;
                                this.leftRightDirection = null;
                            } else if (mDirection == null) {
                                this.upDownDirection = null;
                                this.leftRightDirection = sDirection;
                            } else {
                                this.upDownDirection = mDirection;
                                this.leftRightDirection = sDirection;
                            }
                        }
                    },

                    inverseDirection: function() {
                        if (this.inverseLastHit < 5) {
                            return;
                        }
                        this.inverseLastHit = 0;
                        if (this.upDownDirection != null) {
                            if (this.upDownDirection == 0) {
                                this.upDownDirection = 1;
                            } else {
                                this.upDownDirection = 0;
                            }
                        };
                        if (this.leftRightDirection != null) {
                            if (this.leftRightDirection == 2) {
                                    this.leftRightDirection = 3;
                            } else {
                                this.leftRightDirection = 2;
                            }
                        }
                            
                    },

                    moveUp: function(value) {
                        this.sprite.body.velocity.y = -1 * value;
                    },
                    moveDown: function(value) {
                        this.sprite.body.velocity.y = value;
                    },
                    moveRight: function(value) {
                        this.sprite.body.velocity.x = value;
                    },
                    moveLeft: function(value) {
                        this.sprite.body.velocity.x = -1 * value;
                    },
                    setAngle: function(value) {
                        this.sprite.angle = value;
                    },

                    move: function(ud, lr) {
                        this.inverseLastHit += 1;

                        if (this.waiting == true) {

                            this.distance -= this.speed;
                            if (this.distance <= 0) {
                                this.waiting = false;
                                this.setDistance(0);
                                this.changeDirection(true,null,null);
                            }
                            return;
                        } else {
                            this.distance += this.speed / 4;
                            if (this.distance > 8000) {
                                this.waiting = true;
                                this.setDistance(RANDOMCHOICES[Math.floor(Math.random() * 7)]);
                                
                            }
                        }
                        if (lr == null) {
                            if (ud == 0) {
                                this.moveUp(this.speed);
                                this.setAngle(270);
                            } else {
                                this.moveDown(this.speed);
                                this.setAngle(90);
                            }
                        } else if (ud == null) {
                            if (lr == 2) {
                                this.moveLeft(this.speed);
                                this.setAngle(180);
                            } else {
                                this.moveRight(this.speed);
                                this.setAngle(0);
                            }
                        } else {
                            if (ud == 0) {
                                if (lr == 2) {
                                    this.moveUp(this.speed / 2);
                                    this.moveLeft(this.speed / 2);
                                    this.setAngle(225);
                                } else {
                                    this.moveUp(this.speed / 2);
                                    this.moveRight(this.speed / 2);
                                    this.setAngle(315);
                                }
                            } else {
                                if (lr == 2) {
                                    this.moveDown(this.speed / 2);
                                    this.moveLeft(this.speed / 2);
                                    this.setAngle(135);
                                } else {
                                    this.moveDown(this.speed / 2);
                                    this.moveRight(this.speed / 2);
                                    this.setAngle(45);
                                }
                            }
                        }
                    },
                    
                };
                return object;
            }(labby, randN, randN1);

            
            NinjaGame.globals.labby.labbySprites.push(labbyObject);
            this.physics.enable(labby, Phaser.Physics.ARCADE);
            labby.body.velocity.setTo(.01, .01);
            labby.body.collideWorldBounds = true;
        };
    },

    update: function() {
        var currentLabby = 0;
    	//Game logic, collision, movement, etc...
        this.energyBar.width = this.energyBar.defaultWidth * NinjaGame.globals.player.energy / NinjaGame.globals.player.energyCap;

        NinjaGame.globals.player.sprite.body.velocity.x = 0;
        NinjaGame.globals.player.sprite.body.velocity.y = 0;

        for (var i = 0; i < NinjaGame.globals.labby.labbySprites.length; i++) {
            var _ = function (index) {
                NinjaGame.globals.labby.labbySprites[index].sprite.body.velocity.x = 0;
                NinjaGame.globals.labby.labbySprites[index].sprite.body.velocity.y = 0;
                NinjaGame.globals.labby.labbySprites[index].move(NinjaGame.globals.labby.labbySprites[index].upDownDirection, NinjaGame.globals.labby.labbySprites[index].leftRightDirection);
            }(i);
            
        };


        // What tiles the maps collides with via the CSV file.
        this.CollisionMap.setCollisionBetween(235, 260);

        // Add collision between labbys map and player.
        this.physics.arcade.collide(NinjaGame.globals.player.sprite, NinjaGame.globals.labby.labbyGroup);
        this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.layer);
        this.physics.arcade.collide(NinjaGame.globals.labby.labbyGroup, this.layer, this.labbyHitWall);

        // Check the user input for movement.
        this.checkUserMovement();
    },

    checkUserMovement: function() {
        if (this.space.isDown) {
            NinjaGame.globals.player.sprint = true;
        } else {
            NinjaGame.globals.player.regenerate();
        }
        

        if (this.arrow.up.isDown & this.arrow.left.isDown) {
            NinjaGame.globals.player.moveLeft(.5);
            NinjaGame.globals.player.moveUp(.5);
            NinjaGame.globals.player.setAngle(225); 
        } else if (this.arrow.up.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveUp(.5);
            NinjaGame.globals.player.moveRight(.5);
            NinjaGame.globals.player.setAngle(315);
        } else if (this.arrow.down.isDown & this.arrow.left.isDown) {
            NinjaGame.globals.player.moveDown(.5);
            NinjaGame.globals.player.moveLeft(.5);
            NinjaGame.globals.player.setAngle(135);
        } else if (this.arrow.down.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveDown(.5);
            NinjaGame.globals.player.moveRight(.5);
            NinjaGame.globals.player.setAngle(45);
        } else if (this.arrow.up.isDown) {
            NinjaGame.globals.player.moveUp(1);
            NinjaGame.globals.player.setAngle(270);
        } else if (this.arrow.down.isDown) {
            NinjaGame.globals.player.moveDown(1);
            NinjaGame.globals.player.setAngle(90);
        } else if (this.arrow.left.isDown) {
            NinjaGame.globals.player.moveLeft(1);
            NinjaGame.globals.player.setAngle(180);
        } else if (this.arrow.right.isDown) {
            NinjaGame.globals.player.moveRight(1);
            NinjaGame.globals.player.setAngle(0);
        }

        NinjaGame.globals.player.sprint = false;
    },

    labbyHitWall: function(lh, rh) {
        var index = Number(lh.key);
        NinjaGame.globals.labby.labbySprites[index].inverseDirection();
        return true;
    },

    hitWall: function() {
        console.log("Hit wall function called.")
        return true
    },

    hitTank: function() {
        //console.log("You hit a tank! :D");
        return true
    },

    getRandomNumber: function(min, max) {
        return Math.floor(Math.random() * (max-min)) + min;
    },
};
