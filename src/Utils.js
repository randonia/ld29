// Utils class

var SQRT2 = 1.4142135623730951;

Math.clamp = function(val, left, right){
	return Math.min(Math.max(val, left), right);
}

// http://www.gizma.com/easing/#quint2
// t - current time (frames, seconds, milliseconds)
// b - start value
// c - change in value
// d - duration
Math.easeOutQuint = function (t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
};