// Declar the initial game object (I am 93% sure we don't re-declare this in js every file.)
var NinjaGame = {};

// Create a list of globals that will persist through ALL states.

NingaGame.globals = {
	// globals yoooo
}

// Create a game state 'Boot' on NinjaGame.
NinjaGame.Boot = function(game) {
	// Local globals can go here?
	this.ms = 2;


}; 


// Create a prototype for 'Boot' that it will inherit from.
NinjaGame.Boot.prototype = {
	init: function() {
    	//Called as soon as we enter this state
    	
    },

    preload: function() {
    	//Assets to be loaded before create() is called
    	this.load.image("tank", 'Assets/free/PNG/Retina/tankBody_red.png');
		this.arrow = this.input.keyboard.createCursorKeys();
		this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// this.load.audio('song', 'Assets/8bit/8-bit-Arcade4.mp3');
    	
    },

    create: function() {
    	//Adding sprites, sounds, etc...
    	this.physics.startSystem(Phaser.Physics.ARCADE);
	

		this.tank = this.add.sprite(40, 200, 'tank');
		this.tank.anchor.setTo(.5,.5);
		
		this.tank2 = this.add.sprite(80, 300, 'tank');
		this.tank2.anchor.setTo(.5,.5);

		this.physics.enable(this.tank, Phaser.Physics.ARCADE);
		this.physics.enable(this.tank2, Phaser.Physics.ARCADE);
		//game.add.tween(tank).to({x:500}, 10000).start();

		var music = this.add.audio('song', 1, true);
	    music.loop = true;
	    music.play();


		var style = { font: "65px Arial", fill: "#FC1D27", align: "center" };
		var text  = this.add.text(this.world.centerX, this.world.centerY, "Cruzzzzz!!!", style);

	    text.anchor.set(0.5, 0.5);
    },

    update: function() {
    	//Game logic, collision, movement, etc...
    	this.ms = 2;

		if (this.space.isDown) {
			this.ms *= 2;
		}

		if (this.arrow.up.isDown & this.arrow.left.isDown) {
			this.tank.centerY = this.tank.centerY - this.ms;
			this.tank.centerX = this.tank.centerX - this.ms;
			this.tank.angle = 315;
		} else if (this.arrow.up.isDown & this.arrow.right.isDown) {
			this.tank.centerY = this.tank.centerY - this.ms;
			this.tank.centerX = this.tank.centerX + this.ms;
			this.tank.angle = 45;
		} else if (this.arrow.down.isDown & this.arrow.left.isDown) {
			this.tank.centerY = this.tank.centerY + this.ms;
			this.tank.centerX = this.tank.centerX - this.ms;
			this.tank.angle = 225;
		} else if (this.arrow.down.isDown & this.arrow.right.isDown) {
			this.tank.centerY = this.tank.centerY + this.ms;
			this.tank.centerX = this.tank.centerX + this.ms;
			this.tank.angle = 135;
		} else if (this.arrow.up.isDown) {
			this.tank.centerY = this.tank.centerY - this.ms;
			this.tank.angle = 0;
		} else if (this.arrow.down.isDown) {
			this.tank.centerY = this.tank.centerY + this.ms;
			this.tank.angle = 180;
		} else if (this.arrow.left.isDown) {
			this.tank.centerX = this.tank.centerX - this.ms;
			this.tank.angle = 270;
			
		} else if (this.arrow.right.isDown) {
			this.tank.centerX = this.tank.centerX + this.ms;
			this.tank.angle = 90;
		}

    },
};
