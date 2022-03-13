<template>
	<main ref="container" class="welcome page page--no-padding page--no-bottom-shadow">
		<canvas id="welcome-canvas" ref="canvas" class="welcome__canvas" />
		<div class="welcome__content page__content">
			<h1 ref="title" class="welcome__title page__title">David Ovčačík</h1>
			<p ref="subtitle" class="welcome__subtitle">
				<small>programmer, music enthusiast, food lover</small>
			</p>
			<div class="welcome__links">
				<nuxt-link
					v-for="link in links"
					:key="link"
					:to="{ name: link }"
					:title="link"
					class="welcome__link link link--subtle"
				>
					<span class="welcome__link-icon" :class="`icon-${link}`" />
				</nuxt-link>
			</div>
		</div>
	</main>
</template>

<script>
	import {gsap} from 'gsap';
	import Flags from '~/libs/Flags';
	import pageTransitions from '~/mixins/pageTransitions';
	import config from '~/config';
	import IntroAnimation from '~/libs/IntroAnimation';

	export default {
		name: 'IndexPage',
		...pageTransitions,

		data() {
			return {
				animation: null,
			};
		},

		computed: {
			links() {
				return config.routes.filter((route) => route !== this.$route.name);
			}
		},

		mounted() {
			Flags.on('webfontsloaded', this.animateTitle.bind(this));
		},

		beforeDestroy() {
			if (this.animation) {
				//Delay the destroy to continue animating when the page is being faded away
				setTimeout(() => {
					this.animation.destroy();
				}, 1000);
			}
		},

		methods: {
			animateTitle() {
				const {container, title, subtitle} = this.$refs;
				const links = container.querySelectorAll('.welcome__link');

				const tl = gsap
					.timeline()
					.fromTo(
						title,
						{opacity: 0, y: -60},
						{opacity: 1, y: 0, ease: 'bounce.out', duration: 1},
					)
					.fromTo(
						subtitle,
						{opacity: 0, y: 100},
						{opacity: 1, y: 0, ease: 'bounce.out', duration: 1},
						'<',
					)
					.fromTo(
						links,
						{opacity: 0, yPercent: 50},
						{opacity: 1, yPercent: 0, ease: 'power2.out', duration: 1, stagger: 0.2},
					);

				if (!this.$device.isMobileOrTablet) {
					tl.add(() => {
						this.animation = new IntroAnimation(this.$refs.canvas);
					});
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.welcome {
		&.page-fade-enter-active {
			transition-duration: 0s;
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
</style>
