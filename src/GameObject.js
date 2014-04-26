// GameObject class (all things are this)

function GameObject(){
	this.x = 0;
	this.y = 0;
	this.width = 1;
	this.height = 1;
	this.radius = 0;
	this.alive = true;
	this.sprite;
	this.collisionModel = undefined;
};

GameObject.prototype.update = function(delta)
{
	if (this.sprite != undefined)
	{
		this.sprite.update(delta);
	}
};

GameObject.prototype.draw = function(ctx){
	/* Debug draw a circle for this position
	ctx.strokeStyle = "rgb(255,0,255)";
	ctx.beginPath();
	var hRad = 1;
	ctx.arc(this.x - hRad * 0.5, this.y - hRad * 0.5, hRad , 0, 2 * Math.PI);
	ctx.stroke();
	*/
	
	if (this.sprite != undefined)
	{
		this.sprite.render(ctx, this.x, this.y, this.width, this.height);
	}
};

GameObject.prototype.collidesWith = function(other) 
{
	return false;
};

GameObject.prototype.handleCollision = function(other){};
