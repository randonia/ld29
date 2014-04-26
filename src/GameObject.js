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
	this.name = "GameObject";
};

GameObject.prototype.update = function(delta)
{
	if (this.sprite != undefined)
	{
		this.sprite.update(delta);
	}
};

GameObject.prototype.draw = function(ctx){
	if (this.sprite != undefined)
	{
		this.sprite.render(ctx, this.x, this.y, this.width, this.height);
	}

	// Debug draw a circle for this position
	ctx.fillStyle = "rgb(255,0,255)";
	ctx.fillRect(this.x - 1, this.y - 1, 3,3);
	ctx.stroke();
};

GameObject.prototype.collidesWith = function(other) 
{
	if(this.collisionModel == undefined || other.collisionModel == undefined)
	{
		return false;
	}
	var result = this.collisionModel.collidesWith(other.collisionModel);
	this.x += this.collisionModel.getCorrectionX();
	this.y += this.collisionModel.getCorrectionY();
	return result;
};

// React to the collision appropriately
GameObject.prototype.handleCollision = function(other){};
