NinjaGame.Game = function(game) {
    this.map = null;
    this.tank = null;
    this.layer = null;
};

NinjaGame.Game.prototype = {
	init: function() {
    	//Called as soon as we enter this state
    },

    preload: function() {
    	//Assets to be loaded before create() is called
        
    	
    },

    create: function() {
    	//Adding sprites, sounds, etc...
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.stage.backgroundColor = '#6574A6';

        this.map = this.add.tilemap('map', 32, 32);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld()

        NinjaGame.globals.player.sprite = this.add.sprite(NinjaGame.globals.player.x, NinjaGame.globals.player.y, NinjaGame.globals.player.spriteName);
        NinjaGame.globals.player.sprite.anchor.setTo(.5, .5);
        
        this.tank = this.add.sprite(400, 200, "labby");
        
        this.physics.enable(NinjaGame.globals.player.sprite, Phaser.Physics.ARCADE);
        this.physics.enable(this.tank, Phaser.Physics.ARCADE);
        NinjaGame.globals.player.sprite.body.velocity.setTo(NinjaGame.globals.player.x, NinjaGame.globals.player.y);
        this.tank.body.velocity.setTo(400, 200);
    },

    update: function() {
    	//Game logic, collision, movement, etc...

        NinjaGame.globals.player.sprite.body.velocity.x = 0;
        NinjaGame.globals.player.sprite.body.velocity.y = 0;

        this.tank.body.velocity.x = 0.01;
        this.tank.body.velocity.y = 0.01;

        
        this.map.setCollisionBetween(0, 2);
        this.physics.arcade.collide(this.tank, this.layer)
        if (this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.layer)) {
            console.log("Hit wall");
        };
        if (this.physics.arcade.collide(NinjaGame.globals.player.sprite, this.tank)) {
            console.log("you hit a tank.")
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