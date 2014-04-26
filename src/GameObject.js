// GameObject class (all things are this)

function GameObject(){
	this.x = 0;
	this.y = 0;
	this.radius = 0;
};

GameObject.prototype.update = function(delta){};

GameObject.prototype.draw = function(ctx){};

GameObject.prototype.collidesWith = function(other) 
{
	return 
};