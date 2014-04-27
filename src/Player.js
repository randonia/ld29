// Player.js

/* Color pallete
 *
 * Skin: 		0xE3C58D
 * Jacket: 		0x4DA3FF
 * Pants: 		0xDBDBDB
 * Dark gray: 	0xB8B8B8
 * 
 */
// Some Consts
// Player delta x/y (for movement velocities)
var pDX = 150;
var pDY = pDX;

var Player_states =
{
	'idle':0,
	'sticking':1,
	'moving':2
}

var PLAYER_IDLE_SPRITE = new Sprite('assets/sprites/hero_idle.png', [0,0], [32,32], 3, [0,1], 'horizontal', false);;
var PLAYER_IDLE_LEFT_SPRITE = new Sprite('assets/sprites/hero_facing_left.png', [0,0], [32,32], 3, [0,1], 'horizontal', false);
var PLAYER_IDLE_RIGHT_SPRITE = new Sprite('assets/sprites/hero_facing_right.png', [0,0], [32,32], 3, [0,1], 'horizontal', false);
var PLAYER_FLING_LEFT_SPRITE = new Sprite('assets/sprites/hero_fling_left.png', [0,0], [32,32], 3, [0,1], 'horizontal', false);
var PLAYER_FLING_RIGHT_SPRITE = new Sprite('assets/sprites/hero_fling_right.png', [0,0], [32,32], 3, [0,1], 'horizontal', false);

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
	this.numHumps = 0;
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

	if (this.timer != undefined)
	{
		this.timer.draw(ctx);
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
		case Player_states['sticking']:
			this.stateSticking(delta);
			break;
	}

	if (this.timer != undefined)
	{
		this.timer.update(delta);
		if (this.timer.progress >= 1)
		{
			this.killTimer();
			this.bounceFail();
		}
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
				this.doFlick(dirX, dirY, 'flick');
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

Player.prototype.stateSticking = function(delta) 
{
	if (isKeyDown('space') && !this.isSpaceDown)
	{
		this.nearestHumpable.humpPoints -= 1;
		this.timer.addTime(500);
		if (this.nearestHumpable.humpPoints <= 0)
		{
			console.log("Kill it");
			this.numHumps += 1;
			this.bounceWin();
			this.nearestHumpable.collisionModel.enabled = false;
			this.nearestHumpable.explode();
			delete this.timer;
			this.timer = undefined;
		}
	}
	this.isSpaceDown = isKeyDown('space');
};

Player.prototype.doFlick = function(dirX, dirY, bType)
{
	var magnitude = Math.sqrt(dirX*dirX+dirY*dirY);
	this.vX = dirX / magnitude;
	this.vY = dirY / magnitude;
	this.state = Player_states['moving'];

	this.moveStartX = this.x;
	this.moveStartY = this.y;

	var distance;
	var duration;
	switch(bType)
	{
		case 'flick':
			distance = 300;
			duration = 500;
			break;
		case 'fail':
			distance = 100;
			duration = 200;
			break;
		case 'kill':
			distance = 10;
			duration = 100;
	} 
	this.moveDirX = this.vX * distance;
	this.moveDirY = this.vY * distance;

	this.moveTimeStart = Date.now();
	this.moveTimeDuration = duration;

}

Player.prototype.handleInput = function(){
	if (isKeyDown('a'))
	{
		this.vX = -pDX;
	}
	if (isKeyDown('d'))
	{
		this.vX = pDX
	}
	if (isKeyDown('w'))
	{
		this.vY = -pDY
	}
	if (isKeyDown('s'))
	{
		this.vY = pDY
	}
}

Player.prototype.startHumpTimer = function() 
{
	this.timer = new TimerCircle();
	this.timer.x = this.x;
	this.timer.y = this.y;
	this.timer.start(254, this.killTimer)
};

Player.prototype.killTimer = function()
{
	delete this.timer;
}

Player.prototype.bounceWin = function() 
{
	var dirX = this.x - this.nearestHumpable.x;
	var dirY = this.y - this.nearestHumpable.y;

	this.doFlick(dirX, dirY, 'kill');
};

Player.prototype.bounceFail = function() 
{
	var dirX = this.x - this.nearestHumpable.x;
	var dirY = this.y - this.nearestHumpable.y;

	this.doFlick(dirX, dirY, 'fail');
};

Player.prototype.handleCollision = function(other) 
{
	console.log("Player handling collision with " + other.name);
	switch(other.name)
	{
		case "Humpable":
			this.nearestHumpable = other;
			this.state = Player_states['sticking'];
			this.startHumpTimer();
			break;
	}
};
