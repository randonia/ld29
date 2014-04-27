// Timer circle

// Inheritance yo
TimerCircle.prototype = new GameObject();
function TimerCircle()
{
	this.radius = 15;
}

TimerCircle.prototype.start = function(duration) 
{
	this.duration = duration;
	this.progress = 0;
	this.startTime = Date.now();
};

TimerCircle.prototype.draw = function(ctx) 
{
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, this.progress * 2 * Math.PI)
	ctx.fillStyle = 'rgb(25,25,25)';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0,255,255)';
	ctx.stroke();
	ctx.closePath();
};

TimerCircle.prototype.update = function(delta) 
{
	// 0-1
	this.progress = (Date.now() - this.startTime) / this.duration;
};