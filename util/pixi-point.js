import {Point as PixiPoint} from "@pixi/math";

class Point extends PixiPoint {
	distance(point) {
		const x = this.x - (point?.x || 0);
		const y = this.y - (point?.y || 0);

		return Math.sqrt(x * x + y * y);
	}

	add(point) {
		return new Point(this.x + point.x, this.y + point.y);
	}

	subtract(point) {
		return new Point(this.x - point.x, this.y - point.y);
	}

	multiply(a) {
		return new Point(this.x * a, this.y * a);
	}

	divide(a) {
		return new Point(this.x / a, this.y / a);
	}

	unit() {
		return this.divide(this.distance());
	}
}

export default Point;
