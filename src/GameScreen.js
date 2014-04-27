// Game Screen object

// 600 wide x 400 tall
var BOUNDLEFT = 100;
var BOUNDRIGHT = 700;
var BOUNDTOP = 100;
var BOUNDBOTTOM = 500;
var BOUNDWIDTH = BOUNDRIGHT - BOUNDLEFT;
var BOUNDHEIGHT = BOUNDBOTTOM - BOUNDTOP;

var MAPS = [
		[
		 "000000000000",
		 "0P0001000000",
		 "000000000000",
		 "001000001000",
		 "000010000000",
		 "000000100000",
		 "000000000100",
		 "000000000000"
		],
		[
		 "000000000001",
		 "0P0000000000",
		 "000000100000",
		 "000000000000",
		 "000000000000",
		 "000010000100",
		 "000000000000",
		 "100101101001"
		],
		[
		 "000000000000",
		 "000100000000",
		 "000000001000",
		 "000000000000",
		 "0P0000000000",
		 "000000010000",
		 "000100000000",
		 "000000000000"
		],

	]

var gameObjects = [];
var deadObjects = [];
var UIObjects = [];
var player;
var collisionManager = new CollisionManager();

var levelTimer = 0;

function GameScreen(){
	this.init();
};

function createPlayer(x, y)
{
	var plr = new Player();
	var frogSprite = new Sprite('assets/sprites/frog.png', [3,1], [20,24],
								10, [0,1,2,3,4,5,6], 'horizontal', false);
	plr.x = x;
	plr.y = y;
	plr.sprite = frogSprite;
	plr.spriteOffset = [(.5 * plr.width), (.5 * plr.height)];
	gameObjects.push(plr);
	return plr;
}

function createHumpable(x, y)
{
	var hu = new Humpable();
	var humpSprite = new Sprite('assets/sprites/omega.png', [0,0], [33,22],
								5, [0, 1, 2, 3], 'horizontal', false);
	hu.x = x;
	hu.y = y;
	hu.sprite = humpSprite;
	hu.spriteOffset = [(.5 * hu.width), (.5 * hu.height)];
	gameObjects.push(hu);
	return hu;
}

function createUI()
{
	var progressBar = new UIObject();
	var borderSprite = new Sprite('assets/sprites/border2.png', [0,0], [50,400]);
	var basePos = [50, 100];
	var baseScale = [50,400];

	var fillSprite = new Sprite('assets/sprites/fill.png', [0,0], [2,2]);
	var fillPos = [55, 495];
	var fillScale = [40,-390];
	
	progressBar.UIType = UIObject_TYPES.PROGRESS_BAR;
	progressBar.createProgressBar(
		borderSprite, fillSprite, 
		basePos, fillPos, 
		baseScale, fillScale
	);
	UIObjects.push(progressBar);
}

GameScreen.prototype.buildWorld = function() 
{
	// createPlayer();
	// createHumpable();
	var world_index = Math.round(Math.random() * (MAPS.length-1));
	var world_arrays = MAPS[world_index];
	for(var i = 0; i < world_arrays.length; ++i)
	{
		var row = world_arrays[i];
		for(var j = 0; j < row.length; ++j)
		{
			var key = row[j];
			coords = worldGridToCoords(j,i);
			switch(key)
			{
				case "P":
					console.log("FOUND P");
					var plr = createPlayer(coords.x, coords.y);
					break;
				case "1":
					console.log("FOUND 1");
					var hu = createHumpable(coords.x, coords.y);
					break;

			}
		}
	}
};
function worldGridToCoords(x, y)
{
	var worldWidth = 600;
	var worldHeight = 400;
	var numCol = 12;
	var numRow = 8;
	var thingWidth = worldWidth / numCol;
	var thingHeight = worldHeight / numRow;
	11*50 - (50*.5)
	var xCoord = x * thingWidth + thingWidth * 0.5;
	var yCoord = y * thingHeight + thingHeight * 0.5;

	return {'x':xCoord + BOUNDLEFT, 'y':yCoord + BOUNDTOP}
}

GameScreen.prototype.init = function()
{
	this.buildWorld()
	createUI();

	this.levelTimer = 150000;
	this.startTime = Date.now();
	this.state = 'playing';

};

GameScreen.prototype.update = function(delta){
	switch (this.state)
	{
		case 'playing':
			this.statePlaying(delta);
			break;
		case 'paused':
			break;
		case 'lose':
			this.stateLose(delta);
			break;
	}

	for (var index = 0; index < UIObjects.length; ++index)
	{
		var ui = UIObjects[index];
		ui.update(delta);
	};

};

GameScreen.prototype.statePlaying = function(delta) 
{
	this.timeRemaining = this.levelTimer - (Date.now() - this.startTime);
	// Endgame check
	var now = Date.now();
	if (this.timeRemaining < 0)
	{
		console.log("ENDGAME");
		this.state = 'lose';
	}

	for (var index = 0; index < gameObjects.length; ++index) 
	{
		var go = gameObjects[index];
		go.update(delta);
		if (!go.alive)
		{
			deadObjects.push(go);
		}
	};

	while (deadObjects.length > 0)
	{
		var deadObj = deadObjects.pop();
		deadObj.handleDeath();
		gameObjects.splice(gameObjects.indexOf(deadObj),1);
		delete deadObj;
	}
	collisionManager.checkCollisions(gameObjects);
	collisionManager.resolveCollisions();
};

GameScreen.prototype.stateLose = function(delta) 
{
	// Do some shit
};

GameScreen.prototype.draw = function(ctx){
	ctx.save();
	ctx.clearRect(0,0, GAMEWIDTH, GAMEHEIGHT);
	
	// Gameplay boundaries (for testing)
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.strokeRect(BOUNDLEFT, BOUNDTOP, BOUNDWIDTH, BOUNDHEIGHT);

	for(var index = 0; index < gameObjects.length; ++index)
	{
		var go = gameObjects[index];
		go.draw(ctx);
	};

	for (var index = 0; index < UIObjects.length; ++index)
	{
		var ui = UIObjects[index];
		ui.draw(ctx);
	};

	// Draw time remaining
	ctx.fillStyle = 'rgb(0,255,0)';
	ctx.strokeStyle = 'rgb(15,15,15)';
	ctx.strokeText(this.timeRemaining, 10, 50);
	ctx.fillText(this.timeRemaining, 10, 50);

	ctx.restore();
};

GameScreen.prototype.unload = function(){};
