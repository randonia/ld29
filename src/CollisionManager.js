// Collision System

function CollisionManager()
{
	this.collisions = []
}

CollisionManager.prototype.checkCollisions = function(gameObjects)
{
	// Clear the detected collisions
	while(this.collisions.length > 0) this.collisions.pop();

	// Hooray naive!
	for(var n = 0; n < gameObjects.length; ++n)
	{
		var left = gameObjects[n];
		for(var m = 0; m < gameObjects.length; ++m)
		{
			if (n == m) continue;
			var right = gameObjects[m];
			if (left.collidesWith(right))
			{
				this.addCollision(left,right);
			}
		}
	}
}

CollisionManager.prototype.resolveCollisions = function()
{
	for(var curr = this.collisions.pop(); curr != undefined; curr = this.collisions.pop())
	{
		curr['left'].handleCollision(curr['right']);
	}
};

CollisionManager.prototype.addCollision = function(left, right) 
{
	this.collisions.push({
		'left':left,
		'right':right
	});
};