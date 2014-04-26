// GameObject class (all things are this)

function GameObject(){
	this.x = 0;
	this.y = 0;
	this.radius = 0;
};

GameObject.prototype.update = function(delta){};

GameObject.prototype.draw = function(ctx){
	// Debug draw a circle for this position
	ctx.strokeStyle = "rgb(255,0,255)";
	ctx.beginPath();
	var hRad = 2;
	ctx.arc(this.x - hRad, this.y - hRad, hRad, 0, 2 * Math.PI);
	ctx.stroke();
};

GameObject.prototype.collidesWith = function(other) 
{
	return 
};