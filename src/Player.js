// Player.js

function Player(){
	this.prototype = GameObject.prototype;
	this._draw = GameObject.prototype.draw;
	this._update = GameObject.prototype.update;
}

Player.prototype.draw = function(ctx){
	this._draw(ctx);
}

Player.prototype.update = function(delta){
	this._update(delta);
}