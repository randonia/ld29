var HUMPABLE_TYPES = 
{
	DRESSER: 0,
	LAMP: 1,
	TV: 2,
	TABLE: 3
};

var HUMPABLE_TYPES_LENGTH = 3;

var DRESSER_SPRITE = new Sprite('assets/sprites/humpable_dresser.png', [0,0], [32, 16], 0, [0], 'horizontal', false);
var LAMP_SPRITE = new Sprite('assets/sprites/humpable_lamp.png', [0,0], [16, 32], 0, [0], 'horizontal', false);
var TV_SPRITE = new Sprite('assets/sprites/humpable_television.png', [0,0], [64, 64], 2, [0, 1], 'horizontal', false);
var TABLE_SPRITE = new Sprite('assets/sprites/humpable_table.png', [0,0], [64, 24], 3, [0, 1], 'horizontal', false);

// Humpable

// Inheritance!
Humpable.prototype = new GameObject();
function Humpable(humpableType){
	this.prototype = GameObject.prototype;
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
	this.width = 1;
	this.height = 1;
	this.name = "Humpable";
	this.collisionModel = new CollisionModel(this);
	this.humpPoints = Math.random() * 5 + 5;
	this.state = 'idle';

	switch (humpableType)
	{
		case HUMPABLE_TYPES.DRESSER:
			this.sprite = DRESSER_SPRITE;
			this.width = 32;
			this.height = 16;
			break;
		case HUMPABLE_TYPES.LAMP:
			this.sprite = LAMP_SPRITE;
			this.width = 16;
			this.height = 32;
			break;
		case HUMPABLE_TYPES.TV:
			this.sprite = TV_SPRITE;
			this.width = 64;
			this.height = 64;
			break;
		case HUMPABLE_TYPES.TABLE:
			this.sprite = TABLE_SPRITE;
			this.width = 64;
			this.height = 24;
			break;
	}
}

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

Humpable.prototype.draw = function(ctx) 
{
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, 
				 this.width, this.height);

	this._draw(ctx);
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