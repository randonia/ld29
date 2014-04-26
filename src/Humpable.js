// Humpable

// Inheritance!
Humpable.prototype = new GameObject();
function Humpable(){
	this.prototype = GameObject.prototype;
	this._draw = GameObject.prototype.draw
	this._update = GameObject.prototype.update
	// Default "radius" of 10
	this.radius = 10;
}

Humpable.prototype.draw = function(ctx) 
{
	this._draw(ctx);
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.strokeRect(this.x - this.radius, this.y - this.radius, 
				 this.radius*2, this.radius*2);
};

Humpable.prototype.update = function(delta) {this._update(delta)};