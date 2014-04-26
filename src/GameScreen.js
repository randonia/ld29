// Game Screen object

var BOUNDLEFT = 100;
var BOUNDRIGHT = 700;
var BOUNDTOP = 100;
var BOUNDBOTTOM = 500;
var BOUNDWIDTH = BOUNDRIGHT - BOUNDLEFT;
var BOUNDHEIGHT = BOUNDBOTTOM - BOUNDTOP;

var gameObjects = []


function GameScreen(){
	var plr = new Player();
	plr.x = 5;
	plr.y = 10;
	gameObjects.push(plr);

	var hu = new Humpable();
	hu.x = 400;
	hu.y = 300;
	gameObjects.push(hu);
};

GameScreen.prototype.init = function(){};

GameScreen.prototype.update = function(delta){
	for (var index = 0; index < gameObjects.length; ++index) {
		var go = gameObjects[index];
		go.update(delta);
	};
};

GameScreen.prototype.draw = function(ctx){
	ctx.save();
	ctx.clearRect(0,0, GAMEWIDTH, GAMEHEIGHT);
	// Gameplay boundaries (for testing)
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.strokeRect(BOUNDLEFT, BOUNDTOP, BOUNDWIDTH, BOUNDHEIGHT);
	
	for(var index = 0; index < gameObjects.length; ++index){
		var go = gameObjects[index];
		go.draw(ctx);
	}

	ctx.restore();
};

GameScreen.prototype.unload = function(){};