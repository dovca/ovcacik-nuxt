import * as PIXI from 'pixi.js';

PIXI.Point.prototype.distance = function distance(point) {
	const x = this.x - (point?.x || 0);
	const y = this.y - (point?.y || 0);

	return Math.sqrt(x * x + y * y);
};

PIXI.Point.prototype.add = function add(point) {
	return new PIXI.Point(this.x + point.x, this.y + point.y);
};

PIXI.Point.prototype.subtract = function subtract(point) {
	return new PIXI.Point(this.x - point.x, this.y - point.y);
};

PIXI.Point.prototype.multiply = function multiply(a) {
	return new PIXI.Point(this.x * a, this.y * a);
};

PIXI.Point.prototype.divide = function divide(a) {
	return new PIXI.Point(this.x / a, this.y / a);
};

PIXI.Point.prototype.unit = function unit() {
	return this.divide(this.distance());
};
