// Humpable

// Inheritance!
Humpable.prototype = new GameObject();
function Humpable(){
	this.prototype = GameObject.prototype;
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
	// Default "radius" of 10
	this.width = 50;
	this.height = 50;
}

Humpable.prototype.draw = function(ctx) 
{
	this._draw(ctx);
	/*
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, 
				 this.width, this.height);
	*/
};

Humpable.prototype.update = function(delta) 
{
	this._update(delta);
};