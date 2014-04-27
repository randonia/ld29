var UIObject_TYPES = {
	PROGRESS_BAR : 0,
	SCROLL_TEXT : 1
};

function UIObject()
{
	this.UIType;
}

UIObject.prototype.createProgressBar = function(baseSprite, fillSprite, 
										basePos, fillPos, baseScale, fillScale)
{
	this.baseSprite = baseSprite;
	this.basePos = basePos;
	this.baseScale = baseScale;

	this.fillSprite = fillSprite;
	this.fillPos = fillPos;
	this.fillScale = fillScale;
}

UIObject.prototype.update = function(delta)
{
	switch (this.UIType)
	{
		case UIObject_TYPES.PROGRESS_BAR:
			this.updateProgressBar(delta);
			break;
	}
}

UIObject.prototype.draw = function(ctx)
{
	switch (this.UIType)
	{
		case UIObject_TYPES.PROGRESS_BAR:
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
		this.baseSprite.draw(ctx, this.basePos, this.baseScale, [0,0]);
	}
	if (this.fillSprite != undefined)
	{
		this.fillSprite.draw(ctx, this.fillPos, this.fillScale, [0,0]);
	}
}