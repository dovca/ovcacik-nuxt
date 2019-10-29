<template>
	<main ref="container" class="welcome page page--no-padding page--no-bottom-shadow">
		<canvas id="welcome-canvas" ref="canvas" class="welcome__canvas" />
		<div class="welcome__content page__content">
			<h1 ref="title" class="welcome__title page__title">David Ovčačík</h1>
			<p ref="subtitle" class="welcome__subtitle">
				small programmer, music enthusiast, food lover
			</p>
			<div class="welcome__links">
				<nuxt-link :to="{ name: 'cv' }" class="welcome__link link link--subtle">
					<span class="welcome__link-icon icon-cv" />
				</nuxt-link>
				<nuxt-link
					:to="{ name: 'websites' }"
					class="welcome__link link link--subtle"
				>
					<span class="welcome__link-icon icon-websites" />
				</nuxt-link>
				<nuxt-link
					:to="{ name: 'about' }"
					class="welcome__link link link--subtle"
				>
					<span class="welcome__link-icon icon-about" />
				</nuxt-link>
			</div>
		</div>
	</main>
</template>

<script>
	import Prob from 'prob.js';
	import {ShockwaveFilter} from '@pixi/filter-shockwave';
	import {TimelineMax, ExpoScaleEase, Bounce, Linear, PixiPlugin, _gsScope} from 'gsap/all';
	import PIXI from '@/libs/PIXI';
	import Flags from '@/libs/Flags';

	const plugins = [PixiPlugin];
	_gsScope.PIXI = PIXI;

	PIXI.utils.skipHello();

	export default {
		components: {},

		mounted() {
			const initAnimations = () => {
				const application = new PIXI.Application({
					view: this.$refs.canvas
				});

				let center = null;
				let shockwaveFilter = null;

				const snippets = ['alpha: 0', '() => 0', 'new Error(str)', '.reduce((s, v) => v + s)', 'super(options)', 'const timeout = 40', 'c.filters = [filter]', 'typeof path === \'undefined\'', 'switch (type)', 'x: x_TW - y_TH', 'this.data = data', 'g.destroy()', '0xD1BE85', 'return x1 + y1 < x2 + y2', 'resolve()', 'polygon.close()', '.then(fetchStories)', 'arr[idx - 1]', 'window.innerWidth', '0.01, 2, 2', '(to - from + 1)', '-Math.sin(angle)', 'class TileFactory', 'num <<= 1', '!!flag', 'n % mod', '.pop()', 'while (42)', '/^\\d+\\./', 'void 0', '.indexOf(t)', '1 - time / total', 'extends AbstractService', 'import {config}', 'a = (t < b) & m', 'i = -i', '!true', 'cnt++', 'SyntaxError', '\'not a function\'', '\'data of undefined\'', 'new Promise', 'console.log(val)', '.getContext(\'2d\')', 'let scale;', 'break;', '...args', 't1p && t2p', 'path: \'/:lang\'', 'ENV.server', '\'jquery.min.js\'', '\'js/common.js\'', 'c = s + c', '.catch((error) => {', 'if (!token)', 'return null;', 'this.data.actions.forEach', 'progress *= this.length()', 'w1.distance(w2)', 'this.start().clone()', 'bowser.mobile', 'owner: object', 'name instanceof RegExp', 'match.slice(1)', 'el = el[0]', 'cbQueue.remove(h)', 'fallback()', 'base.height * 1.5', 'onComplete: callback', 'e.preventDefault();', 'enumerable: true', 'Object.keys(obj)', 'other.b - this.b', 'NaN', '.splice(index, 1)', 'throw new Error', '\'deprecated\'', '\'Slow network\'', '!document.hidden', 'c.split(\'=\', 1)[0]', 'd.getTime() + exp', 'd.toGMTString()', 'this._flags.dirty', '(a, b) => a - b', 'isNaN(numeric)', '$(document)', '0xAAAAAAAA', '1e-9', 'await fetchCodes()', 'debugger;'];

				const colors = [
					0xD1BE85,
					0xCCCCCC
				];

				this.isWindowFocused = !document.hidden;

				const prob = Prob.normal(0, 1);
				const randX = () => prob() / 4 * window.innerWidth / 2 + window.innerWidth / 2;
				const randY = () => prob() / 4 * window.innerHeight / 2 + window.innerHeight / 2;
				const randomPosition = () => new PIXI.Point(randX(), randY());
				const randomSnippet = () => snippets[Math.floor(Math.random() * snippets.length)];
				const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
				const randomFontSize = () => (Math.random() * 60 + 80) * (window.innerWidth <= 600 ? 0.5 : 1);

				const getSnippetGraphics = () => {
					const container = new PIXI.Container();
					const text = new PIXI.Text(
						randomSnippet(),
						{
							fontFamily: 'Raleway',
							fontSize: randomFontSize(),
							fill: randomColor()
						}
					);
					text.alpha = 0.1;

					const filter = new PIXI.filters.BlurFilter(0.001, 2, 2);
					filter.padding = 100;

					container.filters = [filter];
					container.addChild(text);
					return container;
				};

				const animateSnippetGraphics = (graphics) => {
					const startPoint = randomPosition();
					graphics.position.copyFrom(startPoint);

					const finishPoint = startPoint.add(
						startPoint.subtract(center).multiply(2)
					);
					const duration = 6;
					const startScale = 0.2;
					const finishScale = Math.random() * 0.5 + 0.5;
					const scaleEase = ExpoScaleEase.config(startScale, finishScale);

					const bounds = graphics.getLocalBounds();
					graphics.pivot.set(
						bounds.width * (1 - finishPoint.x / window.innerWidth),
						bounds.height * (1 - finishPoint.y / window.innerHeight)
					);

					return new TimelineMax({
						onComplete() {
							graphics.filters = null;
							graphics.destroy();
						}
					})
						.set(graphics, {pixi: {scale: startScale}})
						.addLabel('move')
						.from(graphics, 3, {alpha: 0}, 'move')
						.to(graphics, duration, {
							pixi: {
								x: finishPoint.x,
								y: finishPoint.y,
								scale: finishScale,
							},
							ease: scaleEase
						}, 'move')
						.addLabel('fadeOut', '-=3')
						.to(graphics, 3, {alpha: 0}, 'fadeOut')
						.to(graphics.filters[0], 3, {
							blur: 10,
							ease: Linear.easeNone,
							immediateRender: false
						}, 'fadeOut');
				};

				const renderSnippetGraphics = () => {
					if (!this.isWindowFocused) {
						return;
					}

					const graphics = getSnippetGraphics();
					animateSnippetGraphics(graphics);
					application.stage.addChild(graphics);
				};

				const setupFilters = () => {
					let time = 0;
					shockwaveFilter = new ShockwaveFilter(center, {
						amplitude: 10,
						wavelength: 200,
						radius: -1,
						speed: 400
					});

					application.stage.filterArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);
					application.stage.filters = [shockwaveFilter];

					application.ticker.add(() => {
						time += application.ticker.elapsedMS / 1000;
						time %= 4;
						shockwaveFilter.time = time;
					});
				};

				const recalculateWindowSize = () => {
					center = new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2);
					application.renderer.resize(window.innerWidth, window.innerHeight);
					application.stage.filterArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

					if (shockwaveFilter) {
						shockwaveFilter.center = center;
					}
				};

				document.addEventListener('visibilitychange', () => {
					this.isWindowFocused = !document.hidden;
				});

				window.addEventListener('resize', recalculateWindowSize);

				recalculateWindowSize();
				renderSnippetGraphics();
				setInterval(renderSnippetGraphics, 1000);
				setTimeout(setupFilters, 3000);
			};

			const animateTitle = () => {
				const {container, title, subtitle} = this.$refs;
				const links = container.querySelectorAll('.welcome__link');

				const tl = new TimelineMax()
					.fromTo(title, 1, {opacity: 0, y: -60}, {opacity: 1, y: 0, ease: Bounce.easeOut}, 0)
					.fromTo(subtitle, 1, {opacity: 0, y: 100}, {opacity: 1, y: 0, ease: Bounce.easeOut}, 0)
					.staggerFromTo(links, 1, {opacity: 0, yPercent: 50}, {
						opacity: 1,
						yPercent: 0,
						ease: Power2.easeOut
					}, 0.2);

				if (!this.$device.isMobileOrTablet) {
					tl.add(initAnimations);
				}
			};

			Flags.on('webfontsloaded', animateTitle);
		}
	};
</script>

<style scoped lang="scss">
	.welcome {
		&.is-loaded {
			.welcome__title,
			.welcome__subtitle {
				opacity: 1;
			}
		}
	}

	.welcome__canvas {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.welcome__content {
		padding: $sPageGutter * 2 $sPageGutter;
		position: relative;
	}

	.welcome__title {
		opacity: 0;
	}

	.welcome__subtitle {
		@include line-height(small);
		@include golden-glow;

		opacity: 0;
		color: $cHeading;
		font-size: 0.8rem;
	}

	.welcome__links {
		display: flex;
		justify-content: center;
		margin-top: 0.5em;
	}

	.welcome__link {
		padding: 0 0.5em;
		opacity: 0;
	}

	.welcome__link-icon {
		font-size: 2rem;
	}

	.welcome__link-text {
		display: none;
	}
</style>
