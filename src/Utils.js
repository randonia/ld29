// Utils class

var SQRT2 = 1.4142135623730951;

Math.clamp = function(val, left, right){
	return Math.min(Math.max(val, left), right);
}