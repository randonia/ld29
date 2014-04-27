var DRESSER_SPRITE = new Sprite('assets/sprites/humpable_dresser.png', [0,0], [32, 16], 0, [0], 'horizontal', false);
var LAMP_SPRITE = new Sprite('assets/sprites/humpable_lamp.png', [0,0], [16, 32], 0, [0], 'horizontal', false);
var TV_SPRITE = new Sprite('assets/sprites/humpable_television.png', [0,0], [128, 64], 0, [0], 'horizontal', false);


// Humpable

// Inheritance!
Humpable.prototype = new GameObject();
function Humpable(){
	this.prototype = GameObject.prototype;
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
	this.width = 50;
	this.height = 50;
	this.name = "Humpable";
	this.collisionModel = new CollisionModel(this);
	this.humpPoints = Math.random() * 5 + 5;
	this.state = 'idle';
}

Humpable.prototype.draw = function(ctx) 
{
	this._draw(ctx);
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, 
				 this.width, this.height);
	
};

Humpable.prototype.update = function(delta) 
{
	this._update(delta);
	switch(this.state)
	{
		case 'idle':
			break;
		case 'exploding':
			this.stateExploding(delta);
			break;
	}
};

Humpable.prototype.explode = function() 
{
	this.state = 'exploding';
	this.explodeStartTime = Date.now();
	this.explodeDuration = 750;
};

Humpable.prototype.stateExploding = function(delta) 
{
	var now = Date.now();
	if (this.explodeStartTime + this.explodeDuration < now)
	{
		this.alive = false;
		console.log("Dead!");
	}
};