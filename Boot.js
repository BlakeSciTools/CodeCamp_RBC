// Declar the initial game object (I am 93% sure we don't re-declare this in js every file.)
var NinjaGame = {};

// Create a list of globals that will persist through ALL states.
NinjaGame.globals = {
	// globals
	player: {
		energy: 100,
		energyCap: 100,
		energyRR: 5,
		baseSpeed: 150,
		x: 300,
		y: 200,
		sprite: null,
		sprint: false,
		imageDirectory: "Assets/free/PNG/Retina/tankBody_red.png",
		spriteName: "player",
		getSpeed: function() {
			if (this.sprint) {
				if (this.energy >= 5) {
					energy -= 5;
					return this.baseSpeed * 2
				} else {
					this.sprint = false;
					return this.baseSpeed;
				}
			} else {
				return this.baseSpeed;
			}
		},
		moveUp: function() {
			this.sprite.body.velocity.y = -1 * this.getSpeed();
		},
		moveDown: function() {
			this.sprite.body.velocity.y = this.getSpeed();
		},
		moveRight: function() {
			this.sprite.body.velocity.x = this.getSpeed();
		},
		moveLeft: function() {
			this.sprite.body.velocity.x = -1 * this.getSpeed();
		},
		setAngle: function(value) {
			this.sprite.angle = value;
		},
		regenerate: function() {
			if (this.energy + this.energyRR < this.energyCap) {
				this.energy += this.energyRR;
			};
		},
	},


};

// Create a game state 'Boot' on NinjaGame.
NinjaGame.Boot = function(game) {
	// Local globals can go here?
	this.map = null;
	this.tank = null;
	this.layer = null;
}; 


// Create a prototype for 'Boot' that it will inherit from.
NinjaGame.Boot.prototype = {
	init: function() {
    	//Called as soon as we enter this state
    },

    preload: function() {
    	//Assets to be loaded before create() is called

    	this.load.tilemap('map', "Assets/Maps/tmpMap..csv");
    	this.load.image('tileset','Assets/Maps/sampleImage.png');
    	this.load.image(NinjaGame.globals.player.spriteName, NinjaGame.globals.player.imageDirectory);
    	this.arrow = this.input.keyboard.createCursorKeys();
    },

    create: function() {
    	//Adding sprites, sounds, etc...
    	this.physics.startSystem(Phaser.Physics.ARCADE);

    	this.stage.backgroundColor = '#A9009C';

    	this.map = this.add.tilemap('map', 32, 32);
    	this.map.addTilesetImage('tileset');
    	this.layer = this.map.createLayer(0);
    	this.layer.resizeWorld()

    	NinjaGame.globals.player.sprite = this.add.sprite(NinjaGame.globals.player.x, NinjaGame.globals.player.y, NinjaGame.globals.player.spriteName);
    	NinjaGame.globals.player.sprite.anchor.setTo(.5, .5);
    	
    	this.tank = this.add.sprite(400, 200, NinjaGame.globals.player.spriteName);
    	

    	this.physics.enable(NinjaGame.globals.player.sprite, Phaser.Physics.ARCADE);
    	this.physics.enable(this.tank, Phaser.Physics.ARCADE);
    	NinjaGame.globals.player.sprite.body.velocity.setTo(NinjaGame.globals.player.x, NinjaGame.globals.player.y);
    	this.tank.body.velocity.setTo(400, 200);
    },

    update: function() {
    	//Game logic, collision, movement, etc...
    	NinjaGame.globals.player.sprite.body.velocity.x = 0;
	    NinjaGame.globals.player.sprite.body.velocity.y = 0;

	    this.tank.body.velocity.x = 0;
	    this.tank.body.velocity.y = 0;

    	this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.tank);
    	this.map.setCollisionBetween(0, 2);
    	if (this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.layer)) {
    		console.log("Hit wall");
    	};
    	if (this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.tank)) {
    		console.log("you hit a tank.")
    	}

		if (this.arrow.up.isDown & this.arrow.left.isDown) {
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.setAngle(315);
        } else if (this.arrow.up.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(45);
        } else if (this.arrow.down.isDown & this.arrow.left.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.setAngle(225);
        } else if (this.arrow.down.isDown & this.arrow.right.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(135);
        } else if (this.arrow.up.isDown) {
            NinjaGame.globals.player.moveUp();
            NinjaGame.globals.player.setAngle(0);
        } else if (this.arrow.down.isDown) {
            NinjaGame.globals.player.moveDown();
            NinjaGame.globals.player.setAngle(180);
        } else if (this.arrow.left.isDown) {
            NinjaGame.globals.player.moveLeft();
            NinjaGame.globals.player.setAngle(270);
        } else if (this.arrow.right.isDown) {
            NinjaGame.globals.player.moveRight();
            NinjaGame.globals.player.setAngle(90);
        }

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
