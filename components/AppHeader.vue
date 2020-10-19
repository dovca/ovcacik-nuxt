<template>
	<header class="header">
		<nav class="header__nav">
			<nuxt-link
				v-for="link in links"
				:key="link"
				:to="{name: link}"
				:title="link"
				class="header__link link link--subtle"
			>
				<span :class="`icon-${link}`" />
			</nuxt-link>
		</nav>
	</header>
</template>

<script>
	import TweenMax from 'gsap/TweenMax';
	import config from '~/config';

	export default {
		name: 'AppHeader',
		computed: {
			links() {
				return config.routes;
			}
		},

		mounted() {
			const headerLinks = Array.from(this.$el.querySelectorAll('.header__link')).reverse();

			if (!headerLinks.length) {
				return;
			}

			TweenMax.staggerFromTo(
				headerLinks,
				0.6,
				{yPercent: 25, opacity: 0},
				{yPercent: 0, opacity: 1, ease: Power2.easeOut},
				0.2
			);
		}
	};
</script>

<style scoped lang="scss">
	.header {
		text-align: right;
		background-color: $cBackground;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: $sHeaderHeight;
		z-index: 10;

		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			height: $sPageShadowHeight;
			background: linear-gradient(to bottom, $cBlack, transparent);
		}

		&.header-fade-leave-active {
			transition: opacity 0.5s ease-out;
		}

		&.header-fade-leave-to {
			opacity: 0;
		}
	}

	.header__nav {
		display: flex;
		justify-content: flex-end;
		padding: 0 1rem;
		width: 100%;
	}

	.header__link {
		font-size: 1.5rem;
		padding: $sPageGutter 0.5em;
		position: relative;
		opacity: 0;
	}

	.link {
		&--active {
			color: $cText;
			@include glow();
		}
	}

	@media screen and (max-width: $dTablet) {
		.header__nav {
			justify-content: center;
		}
	}

	@media print {
		.header {
			display: none;
		}
	}
</style>
