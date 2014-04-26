var x;
var y;
var width;
var height;
var type = {
	PROGRESS_BAR : 0,
	SCROLL_TEXT : 1
};

//For PROGRESS_BAR
var baseSprite;
var fillSprite;

function UIObject()
{
	this.x;
	this.y;
	this.width;
	this.height;
	this.type;
}

UIObject.prototype.createProgressBar = function(baseSprite, fillSprite)
{
	this.type = type.PROGRESS_BAR;
	this.baseSprite = baseSprite;
	this.fillSprite = fillSprite;
}

UIObject.prototype.update = function(delta)
{
	switch (this.type)
	{
		case type.PROGRESS_BAR:
			this.updateProgressBar(delta);
			break;
	}
}

UIObject.prototype.draw = function(ctx)
{
	switch (this.type)
	{
		case type.PROGRESS_BAR:
			this.drawProgressBar(ctx);
			break;
	}
}

UIObject.prototype.updateProgressBar = function(delta)
{
	if (this.baseSprite != undefined)
	{
		this.baseSprite.update(delta);
	}
	if (this.fillSprite != undefined)
	{
		this.fillSprite.update(delta);
	}
}

UIObject.prototype.drawProgressBar = function(ctx)
{
	if (this.baseSprite != undefined)
	{
		this.baseSprite.draw(ctx, x, y, width, height);
	}
	if (this.fillSprite != undefined)
	{
		this.fillSprite.draw(ctx, x, y, width, height);
	}
}