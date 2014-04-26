// Player.js

// Some Consts
// Max velocities in x/y
var pMAXvX = 10;
var pMAXvY = 10;
// Player delta x/y (for movement velocities)
var pDX = 5;
var pDY = pDX;

// Inheritance!
Player.prototype = new GameObject();
function Player(){
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
	this.vX = 0;
	this.vY = 0;
	this.radius = 20;
}

Player.prototype.draw = function(ctx){
	this._draw(ctx);
	// Draw box for the player
	ctx.strokeStyle = "rgb(0,255,0)";
	var hWid = 20;
	ctx.strokeRect(this.x - hWid, this.y - hWid, hWid*2, hWid*2);
}

Player.prototype.update = function(delta){
	this._update(delta);
	this.handleInput();

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
