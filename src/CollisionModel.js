// CollisionModel

function CollisionModel(gameObject)
{
	this.gameObject = gameObject;
	this.width = gameObject.width;
	this.height = gameObject.height;
	this.correctionX = 0;
	this.correctionY = 0;
	this.staticObj = true;
	Object.defineProperty(this, 'x',
	{
		get: function()
		{
			return this.gameObject.x;
		},
		set: function(val){ this.gameObject.x = val;}
	});
	Object.defineProperty(this, 'y',
	{
		get: function()
		{
			return this.gameObject.y;
		},
		set: function(val){ this.gameObject.y = val;}
	});
}

CollisionModel.prototype.getCorrectionX = function()
{
	var res = this.correctionX;
	this.correctionX = 0;
	return res;
};

CollisionModel.prototype.getCorrectionY = function()
{
	var res = this.correctionY;
	this.correctionY = 0;
	return res;
};


// Other is a collisionModel
CollisionModel.prototype.collidesWith = function(other) 
{
	if(this == other) return false;
	var dX = 0;
	var dY = 0;
	// Check if it's left or right
	if (this.x < other.x)
	{
		dX = other.x - (this.x + this.width);
		if (dX > 0) dX = 0;
	}
	else
	{
		dX = (other.x + other.width) - this.x;
		if (dX < 0) dX = 0;
	}
	// Check if it's above or below
	if (this.y < other.y)
	{
		dY = other.y - (this.y + this.height);
		if (dY > 0) dY = 0;
	}
	else
	{
		dY = (other.y + other.height) - this.y;
		if (dY < 0) dY = 0;
	}

	// Check if there's a real intersection
	if (dX == 0 || dY == 0)
	{
		dX = dY = 0;
	}
	if (!this.staticObj)
	{
		if(Math.abs(dX) < Math.abs(dY))
		{
			this.correctionX = dX;
			this.correctionY = 0;
		}
		else if(Math.abs(dX) > Math.abs(dY))
		{
			this.correctionX = 0;
			this.correctionY = dY;
		}
	}
	return dX != 0 && dY != 0;
};