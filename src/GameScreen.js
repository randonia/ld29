// Game Screen object

var BOUNDLEFT = 100;
var BOUNDRIGHT = 700;
var BOUNDTOP = 100;
var BOUNDBOTTOM = 500;
var BOUNDWIDTH = BOUNDRIGHT - BOUNDLEFT;
var BOUNDHEIGHT = BOUNDBOTTOM - BOUNDTOP;

var gameObjects = []
var player;
var collisionManager = new CollisionManager();

function GameScreen(){
	var plr = new Player();
	plr.x = 5;
	plr.y = 10;
	plr.sprite = new Sprite
	(
		'assets/sprites/frog.png', 
		[3,1], 
		[20, 24],
		10, 
		[0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0],
		'horizontal', false
	);
	gameObjects.push(plr);
	player = plr;
	
	var hu = new Humpable();
	hu.x = 200;
	hu.y = 200;
	hu.sprite = new Sprite
	(
		'assets/sprites/omega.png',
		[0,0],
		[33,22],
		5,
		[0, 1, 2, 3],
		'horizontal',
		false

	);
	gameObjects.push(hu);
};

GameScreen.prototype.init = function(){};

GameScreen.prototype.update = function(delta){
	for (var index = 0; index < gameObjects.length; ++index) {
		var go = gameObjects[index];
		go.update(delta);
	};
	collisionManager.checkCollisions(gameObjects);
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