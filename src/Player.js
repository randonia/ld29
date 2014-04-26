// Player.js

// Some Consts
// Player delta x/y (for movement velocities)
var pDX = 3;
var pDY = pDX;

// Inheritance!
Player.prototype = new GameObject();

function Player(){
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
	this._handleCollision = GameObject.prototype.handleCollision;
	this.vX = 0;
	this.vY = 0;
	this.width = 32;
	this.height = 32;
	this.radius = 20;
	this.collisionModel = new CollisionModel(this);
	this.collisionModel.staticObj = false;
	this.name = "Player";
	this.nearestHumpable = undefined;

	this.flickStart;
	this.flickEnd;
}

Player.prototype.draw = function(ctx){
	this._draw(ctx);
 	// Draw box for the player
	ctx.strokeStyle = "rgb(0,255,0)";
	ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5,
				   this.width, this.height);
	
	if (Mouse.down)
	{
		ctx.beginPath();
		ctx.strokeStyle = 'rgb(255,255,0)';
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(Mouse.x, Mouse.y);
		ctx.stroke();
		ctx.closePath();
	}
}

Player.prototype.update = function(delta){
	this._update(delta);
	this.handleInput();
	// Movement
	this.x = Math.clamp(this.x + this.vX, BOUNDLEFT, BOUNDRIGHT);
	this.y = Math.clamp(this.y + this.vY, BOUNDTOP, BOUNDBOTTOM);


}

Player.prototype.handleInput = function(){
	if (isKeyDown('a')){
		this.vX = -pDX;
	}
	if (isKeyDown('d')){
		this.vX = pDX
	}
	if(isKeyUp('a') && isKeyUp('d')){
		this.vX = 0;
	}
	if (isKeyDown('w')){
		this.vY = -pDY
	}
	if (isKeyDown('s')){
		this.vY = pDY
	}
	if(isKeyUp('w') && isKeyUp('s')){
		this.vY = 0;
	}
	if (this.vX != 0 && this.vY != 0){
		this.vX = this.vX / SQRT2;
		this.vY = this.vY / SQRT2;
	}
}

Player.prototype.handleCollision = function(other) 
{
	switch(other.name)
	{
		case "Humpable":
			this.nearestHumpable = other
			break;
	}
};
