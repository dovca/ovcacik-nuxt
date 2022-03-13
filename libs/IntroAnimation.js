import Prob from 'prob.js';
import {ShockwaveFilter} from '@pixi/filter-shockwave';
import {gsap} from "gsap";
import {ExpoScaleEase} from 'gsap/EasePack';
import {PixiPlugin} from 'gsap/PixiPlugin';
import PIXI from '~/libs/PIXI';
import {sample} from '~/util/helpers';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

class IntroAnimation {
	static createSnippetGraphics() {
		const container = new PIXI.Container();
		const text = new PIXI.Text(
			IntroAnimation.randomSnippet,
			{
				fontFamily: 'Raleway',
				fontSize: IntroAnimation.randomFontSize,
				fill: IntroAnimation.randomColor
			}
		);
		text.alpha = 0.1;

		const filter = new PIXI.filters.BlurFilter(0.001, 2, 2);
		filter.padding = 100;

		container.filters = [filter];
		container.addChild(text);
		return container;
	}

	static get randomPosition() {
		const randX = IntroAnimation.prob() / 4 * window.innerWidth / 2 + window.innerWidth / 2;
		const randY = IntroAnimation.prob() / 4 * window.innerHeight / 2 + window.innerHeight / 2;
		return new PIXI.Point(randX, randY);
	}

	static get randomSnippet() {
		return sample(IntroAnimation.snippets);
	}

	static get randomColor() {
		return sample(IntroAnimation.colors);
	}

	static get randomFontSize() {
		return (Math.random() * 60 + 80) * (window.innerWidth <= 600 ? 0.5 : 1);
	}

	constructor(canvas) {
		this.application = new PIXI.Application({
			view: canvas
		});
		this.center = null;
		this.shockwaveFilter = null;
		this.isWindowFocused = !document.hidden;
		this.listeners = {
			visibilitychange: () => {
				this.isWindowFocused = !document.hidden;
			},
			resize: this.recalculateWindowSize.bind(this)
		};

		document.addEventListener('visibilitychange', this.listeners.visibilitychange);

		window.addEventListener('resize', this.listeners.resize);

		this.recalculateWindowSize();
		this.renderSnippetGraphics();
		this.snippetInterval = setInterval(this.renderSnippetGraphics.bind(this), 2000);
		this.setupFiltersTimeout = setTimeout(this.setupFilters.bind(this), 3000);
	}

	animateSnippetGraphics(graphics) {
		const startPoint = IntroAnimation.randomPosition;
		graphics.position.copyFrom(startPoint);

		const finishPoint = startPoint.add(
			startPoint.subtract(this.center).multiply(2)
		);
		const duration = 10;
		const startScale = 0.2;
		const finishScale = Math.random() * 0.5 + 1.5;
		const scaleEase = ExpoScaleEase.config(startScale, finishScale);

		const bounds = graphics.getLocalBounds();
		graphics.pivot.set(
			bounds.width * (1 - finishPoint.x / window.innerWidth),
			bounds.height * (1 - finishPoint.y / window.innerHeight)
		);

		return gsap.timeline({
			onComplete() {
				graphics.filters = null;
				graphics.destroy();
			}
		})
			.set(graphics, {pixi: {scale: startScale}})
			.addLabel('move')
			.from(graphics, {alpha: 0, duration: 3}, 'move')
			.to(graphics, {
				pixi: {
					x: finishPoint.x,
					y: finishPoint.y,
					scale: finishScale,
				},
				duration,
				ease: scaleEase
			}, 'move')
			.addLabel('fadeOut', '-=3')
			.to(graphics, {alpha: 0, duration: 3}, 'fadeOut')
			.to(graphics.filters[0], {
				blur: 10,
				ease: 'none',
				immediateRender: false,
				duration: 3,
			}, 'fadeOut');
	}

	renderSnippetGraphics() {
		if (!this.isWindowFocused) {
			return;
		}

		const graphics = IntroAnimation.createSnippetGraphics();
		this.animateSnippetGraphics(graphics);
		this.application.stage.addChild(graphics);
	}

	setupFilters() {
		let time = 0;
		this.shockwaveFilter = new ShockwaveFilter(this.center, {
			amplitude: 10,
			wavelength: 200,
			radius: -1,
			speed: 400
		});

		this.application.stage.filterArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);
		this.application.stage.filters = [this.shockwaveFilter];

		this.application.ticker.add(() => {
			time += this.application.ticker.elapsedMS / 1000;
			time %= 4;
			this.shockwaveFilter.time = time;
		});
	}

	recalculateWindowSize() {
		this.center = new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2);
		this.application.renderer.resize(window.innerWidth, window.innerHeight);
		this.application.stage.filterArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

		if (this.shockwaveFilter) {
			this.shockwaveFilter.center = this.center;
		}
	}

	destroy() {
		this.application.destroy();
		clearInterval(this.snippetInterval);
		clearTimeout(this.setupFiltersTimeout);
		document.removeEventListener('visibilitychange', this.listeners.visibilitychange);
		window.removeEventListener('resize', this.listeners.resize);
	}
}

IntroAnimation.instance = null;

IntroAnimation.colors = [
	0xD1BE85,
	0xCCCCCC
];

IntroAnimation.snippets = ['alpha: 0', '() => 0', 'new Error(str)', '.reduce((s, v) => v + s)', 'super(options)', 'const timeout = 40', 'c.filters = [filter]', 'typeof path === \'undefined\'', 'switch (type)', 'x: x_TW - y_TH', 'this.data = data', 'g.destroy()', '0xD1BE85', 'return x1 + y1 < x2 + y2', 'resolve()', 'polygon.close()', '.then(fetchStories)', 'arr[idx - 1]', 'window.innerWidth', '0.01, 2, 2', '(to - from + 1)', '-Math.sin(angle)', 'class TileFactory', 'num <<= 1', '!!flag', 'n % mod', '.pop()', 'while (42)', '/^\\d+\\./', 'void 0', '.indexOf(t)', '1 - time / total', 'extends AbstractService', 'import {config}', 'a = (t < b) & m', 'i = -i', '!true', 'cnt++', 'SyntaxError', '\'not a function\'', '\'data of undefined\'', 'new Promise', 'console.log(val)', '.getContext(\'2d\')', 'let scale;', 'break;', '...args', 't1p && t2p', 'path: \'/:lang\'', 'ENV.server', '\'jquery.min.js\'', '\'js/common.js\'', 'c = s + c', '.catch((error) => {', 'if (!token)', 'return null;', 'this.data.actions.forEach', 'progress *= this.length()', 'w1.distance(w2)', 'this.start().clone()', 'bowser.mobile', 'owner: object', 'name instanceof RegExp', 'match.slice(1)', 'el = el[0]', 'cbQueue.remove(h)', 'fallback()', 'base.height * 1.5', 'onComplete: callback', 'e.preventDefault();', 'enumerable: true', 'Object.keys(obj)', 'other.b - this.b', 'NaN', '.splice(index, 1)', 'throw new Error', '\'deprecated\'', '\'Slow network\'', '!document.hidden', 'c.split(\'=\', 1)[0]', 'd.getTime() + exp', 'd.toGMTString()', 'this._flags.dirty', '(a, b) => a - b', 'isNaN(numeric)', '$(document)', '0xAAAAAAAA', '1e-9', 'await fetchCodes()', 'debugger;'];

IntroAnimation.prob = Prob.normal(0, 1);

export default IntroAnimation;
