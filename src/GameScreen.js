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

	var rabite = new GameObject();
	rabite.x = 400;
	rabite.y = 300;
	rabite.sprite = new Sprite('assets/sprites/frog.png', [5,1], [16, 24]);
	gameObjects.push(rabite);
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
	ctx.strokeRect(BOUNDLEFT, BOUNDTOP, BOUNDRIGHT - BOUNDLEFT, BOUNDBOTTOM - BOUNDTOP);
	
	for(var index = 0; index < gameObjects.length; ++index){
		var go = gameObjects[index];
		go.draw(ctx);
	}

	ctx.restore();
};

GameScreen.prototype.unload = function(){};