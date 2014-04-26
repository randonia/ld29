// Game Screen object

var BOUNDLEFT = 100;
var BOUNDRIGHT = 700;
var BOUNDTOP = 100;
var BOUNDBOTTOM = 500;

var gameObjects = []


function GameScreen(){
	go = new GameObject();
	go.x = 50;
	go.y = 100;
	go.radius = 5;
	gameObjects.push(go);

	var plr = new Player();
	plr.x = 5;
	plr.y = 10;
	gameObjects.push(plr);
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
	for(var index = 0; index < gameObjects.length; ++index){
		var go = gameObjects[index];
		go.draw(ctx);
	}

	ctx.restore();
};

GameScreen.prototype.unload = function(){};