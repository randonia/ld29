// CollisionModel

function CollisionModel(gameObject)
{
	this.gameObject = gameObject;
	this.width = gameObject.width;
	this.height = gameObject.height;
	this.correctionX = 0;
	this.correctionY = 0;
	this.enabled = true;
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
	return ((this.staticObj)?0:res);
};

CollisionModel.prototype.getCorrectionY = function()
{
	var res = this.correctionY;
	this.correctionY = 0;
	return ((this.staticObj)?0:res);
};


// Other is a collisionModel
CollisionModel.prototype.collidesWith = function(other) 
{
	// Via SAP!
	if(this == other) return false;
	if(!this.enabled || !other.enabled) return false;

	var len_x = Math.abs(other.x - this.x);
	var half_width_this = this.width*0.5;
	var half_width_other = other.width*0.5;

	var gap_x = len_x - half_width_this - half_width_other;

	var len_y = Math.abs(other.y - this.y);
	var half_height_this = this.height*0.5;
	var half_height_other = other.height*0.5;

	var gap_y = len_y - half_height_this - half_height_other;
	
	if (gap_x < 0 && gap_y < 0)
	{
		var gModX = 1;
		var gModY = 1;
		if (this.x > other.x) gModX = -1;
		if (this.y > other.y) gModY = -1;

		if (gap_y > gap_x)
		{
			this.correctionX = 0;
			this.correctionY = gap_y * gModY;
		}
		else if (gap_x > gap_y)
		{
			this.correctionX = gap_x * gModX;
			this.correctionY = 0;
		}
	}

	return (gap_x < 0 && gap_y < 0);
};