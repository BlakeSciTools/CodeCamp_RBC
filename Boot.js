// Declar the initial game object (I am 93% sure we don't re-declare this in js every file.)
var NinjaGame = {};

// Create a list of globals that will persist through ALL states.
NinjaGame.globals = {
	// globals yoooo
	player: {
		energy: 100,
		energyCap: 100,
		energyRR: 4,
		speed: 2,
		x: 20,
		y: 200,
		sprite: null,
		imageDirectory: "Assets/free/PNG/Retina/tankBody_red.png",
		spriteName: "tank",
		moveUp: function() {
			this.y -= this.speed;
			this.sprite.centerY = this.y;
		},
		moveDown: function() {
			this.y += this.speed;
			this.sprite.centerY = this.y;
		},
		moveRight: function() {
			this.x += this.speed; 
			this.sprite.centerX = this.x;
		},
		moveLeft: function() {
			this.x -= this.speed;
			this.sprite.centerX = this.x;
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
}; 


// Create a prototype for 'Boot' that it will inherit from.
NinjaGame.Boot.prototype = {
	init: function() {
    	//Called as soon as we enter this state
    },

    preload: function() {
    	//Assets to be loaded before create() is called
    },

    create: function() {
    	//Adding sprites, sounds, etc...
    },

    update: function() {
    	//Game logic, collision, movement, etc...

    },
};
