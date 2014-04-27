// Player.js

// Some Consts
// Player delta x/y (for movement velocities)
var pDX = 150;
var pDY = pDX;

var Player_states =
{
	'idle':0,
	'flicking':1,
	'moving':2
}

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
	this.state = Player_states.idle;
	this.flickStart = {'x':0,'y':0};
	this.flickEnd = {'x':0,'y':0};
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
		ctx.moveTo(this.flickStart.x, this.flickStart.y);
		ctx.lineTo(Mouse.x, Mouse.y);
		ctx.stroke();
		ctx.closePath();
	}
}

Player.prototype.update = function(delta){
	this._update(delta);
	this.handleInput();
	
	switch(this.state)
	{
		case Player_states['idle']:
			this.stateIdle(delta);
			break;
		case Player_states['moving']:
			this.stateMoving(delta);
			break;
	}
}

Player.prototype.stateIdle = function(delta) 
{
	switch(Mouse.state)
	{
		case 'down':
			this.flickStart.x = Mouse.x;
			this.flickStart.y = Mouse.y;
			break;
		case 'dragged':
			this.flickStart.x = mouseDragStart.x;
			this.flickStart.y = mouseDragStart.y;
			this.flickEnd.x = Mouse.x;
			this.flickEnd.y = Mouse.y;

			var max_flick = 2500;
			var dirX = this.flickEnd.x - this.flickStart.x;
			var dirY = this.flickEnd.y - this.flickStart.y;
			var mag_sqr = (dirX*dirX + dirY*dirY);
			if (mag_sqr > max_flick)
			{
				this.doFlick(dirX, dirY);
			}
		case 'up':
			this.flickEnd.x = Mouse.x;
			this.flickEnd.y = Mouse.y;
			break;
	}
};

Player.prototype.stateMoving = function(delta) 
{
	// Movement
	var now = Date.now();
	var dT = now - this.moveTimeStart;
	this.x = Math.clamp(Math.easeOutQuint(dT, 
										  this.moveStartX, 
										  this.moveDirX,
										  this.moveTimeDuration), 
						BOUNDLEFT, BOUNDRIGHT);
	this.y = Math.clamp(Math.easeOutQuint(dT, 
										  this.moveStartY, 
										  this.moveDirY,
										  this.moveTimeDuration), 
						BOUNDTOP, BOUNDBOTTOM);
	if (this.moveTimeStart + this.moveTimeDuration < now)
	{
		this.state = Player_states['idle'];

	}
};


Player.prototype.doFlick = function(dirX, dirY)
{
	var magnitude = Math.sqrt(dirX*dirX+dirY*dirY);
	this.vX = dirX / magnitude;
	this.vY = dirY / magnitude;
	this.state = Player_states['moving'];

	this.moveStartX = this.x;
	this.moveStartY = this.y;

	var distance = 300;
	this.moveDirX = this.vX * distance;
	this.moveDirY = this.vY * distance;

	this.moveTimeStart = Date.now();
	this.moveTimeDuration = 500;

}

Player.prototype.handleInput = function(){
	if (isKeyDown('a')){
		this.vX = -pDX;
	}
	if (isKeyDown('d')){
		this.vX = pDX
	}
	if (isKeyDown('w')){
		this.vY = -pDY
	}
	if (isKeyDown('s')){
		this.vY = pDY
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
