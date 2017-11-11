NinjaGame.Game = function(game) {
};

NinjaGame.Game.prototype = {
	init: function() {
    	//Called as soon as we enter this state
        this.arrow = this.input.keyboard.createCursorKeys();
		this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
        console.log("MainMap:", this.MainMap);
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

        // Create labby group.
        NinjaGame.globals.labby.labbyGroup = this.add.physicsGroup();

        // Add labbys. Using the labby object in globals.
        for (i = 0; i < this.labbyCount; i++) {
            var labby = NinjaGame.globals.labby.labbyGroup.create(NinjaGame.globals.labby.xs[i], NinjaGame.globals.labby.ys[i], NinjaGame.globals.labby.spriteName);
            
            var randN = Math.floor(Math.random() * 2);
            // Inserting an object into the labby object on the fly cause im tilted.
            NinjaGame.globals.labby.labbySprites.push({
                sprite: labby,
                x: NinjaGame.globals.labby.xs[i],
                y: NinjaGame.globals.labby.ys[i],
                speed: NinjaGame.globals.labby.baseSpeed,
                distance: 0,
                directions: [
                    "up",
                    "down",
                    "left",
                    "right",
                ],
                upDowndirection: self.directions[randN],
                leftRightDirection: null,
                changeDirection: function(random, mDirection, sDirection) {
                    if (random) {
                        var randomNum    = Math.floor(Math.random() * 2);
                        var randomNum2   = Math.floor(Math.random() * 2);
                        var randomChoice = Math.floor(Math.random() * 3);
                        
                        if (randomChoice == 0) {
                            this.upDowndirection = this.directions[randomNum];
                            this.leftRightDirection = null
                        } else if(randomChoice == 1) {
                            this.upDowndirection = this.directions[randomNum];
                            this.leftRightDirection = this.directions[randomNum2 + 2];
                        } else {
                            this.upDowndirection = null;
                            this.leftRightDirection = this.directions[randomNum2 + 2];
                        };
                    } else {
                        if (typeof(sDirection) === "undefined") {
                            this.upDowndirection = this.directions[mDirection];
                            this.leftRightDirection = null;
                        } else {
                            this.upDowndirection = this.directions[mDirection];
                            this.leftRightDirection = this.directions[sDirection];
                        }
                    }
                    self.distance = 0;
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
                    var speed = this.getSpeed();
                    self.Distance += self.speed;
                    if (lr == -1) {
                        if (ud == 0) {
                            this.moveUp(speed);
                        } else {
                            this.moveDown(speed);
                        }
                    } else if (ud == -1) {
                        this.upDowndirection = this.directions[mDirection];
                        this.leftRightDirection = this.directions[sDirection];
                    } else {

                    }
                },
                
            });
            this.physics.enable(labby, Phaser.Physics.ARCADE);
            labby.body.velocity.setTo(.01, .01);
            labby.body.collideWorldBounds = true;
        };
    },

    update: function() {
    	//Game logic, collision, movement, etc...
        this.energyBar.width = this.energyBar.defaultWidth * NinjaGame.globals.player.energy / NinjaGame.globals.player.energyCap;

        NinjaGame.globals.player.sprite.body.velocity.x = 0;
        NinjaGame.globals.player.sprite.body.velocity.y = 0;

        for (var i = 0; i < NinjaGame.globals.labby.labbySprites.length; i++) {
            NinjaGame.globals.labby.labbySprites[i].sprite.body.velocity.x = 10;
        };

        // What tiles the maps collides with via the CSV file.
        this.CollisionMap.setCollisionBetween(235, 260);

        // Add collision between labbys map and player.
        this.physics.arcade.collide(NinjaGame.globals.player.sprite, NinjaGame.globals.labby.labbyGroup);
        this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.layer);
        this.physics.arcade.collide(NinjaGame.globals.labby.labbyGroup, this.layer);

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
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.setAngle(225);
        } else if (this.arrow.up.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(315);
        } else if (this.arrow.down.isDown & this.arrow.left.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.setAngle(135);
        } else if (this.arrow.down.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(45);
        } else if (this.arrow.up.isDown) {
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.setAngle(270);
        } else if (this.arrow.down.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.setAngle(90);
        } else if (this.arrow.left.isDown) {
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.setAngle(180);
        } else if (this.arrow.right.isDown) {
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(0);
        }

        NinjaGame.globals.player.sprint = false;
    },

    hitWall: function() {
        //console.log("Hit wall function called.")
        return true
    },

    hitTank: function() {
        //console.log("You hit a tank! :D");
        return true
    }
};
