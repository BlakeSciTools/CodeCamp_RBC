// Declar the initial game object (I am 93% sure we don't re-declare this in js every file.)
var NinjaGame = {};

// Create a list of globals that will persist through ALL states.
NinjaGame.globals = {
	// globals
	player: {
		energy: 100,
		energyCap: 100,
		energyRR: 0.5,
		baseSpeed: 150,
		x: 300,
		y: 200,
		sprite: null,
		sprint: false,
		imageDirectory: "Assets/Sprites/Blue/characterBlue (1).png",
		spriteName: "player",
		getSpeed: function() {
			if (this.sprint) {
				if (this.energy >= 1) {
					this.energy -= 1;
					return this.baseSpeed * 2
				} else {
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

    labbies: {
        baseSpeed: 150,
        sprite: null,
        sprint: false,
        imageDirectory: "Assets/Sprites/Blue/characterBlue (1).png",
        spriteName: "player",
    },


};

// Create a game state 'Boot' on NinjaGame.
NinjaGame.Boot = function(game) {
	// Local globals can go here?

};


// Create a prototype for 'Boot' that it will inherit from.
NinjaGame.Boot.prototype = {
	init: function() {
    	//Called as soon as we enter this state
    },

    preload: function() {
    	//Assets to be loaded before create() is called
        this.load.tilemap('MainMap', "Assets/Maps/newMapIdea/tmpMap.csv");
        this.load.tilemap('CollisionMap', "Assets/Maps/newMapIdea/collisionMap.csv");
        this.load.image('tileset','Assets/Maps/newMapIdea/finalPicture.png');
        this.load.image(NinjaGame.globals.player.spriteName, NinjaGame.globals.player.imageDirectory);
        this.load.image("labby", "Assets/Sprites/Red/characterRed (1).png");
    },

    create: function() {
    	//Adding sprites, sounds, etc...
        this.state.start('Game');

    },

    update: function() {
    	//Game logic, collision, movement, etc...
    },


};
