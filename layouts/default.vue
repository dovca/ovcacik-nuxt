<template>
	<div class="container">
		<transition name="header-fade">
			<app-header v-if="canShowHeader" />
		</transition>
		<nuxt />
	</div>
</template>

<script>
	import WebFont from 'webfontloader';
	import Flags from '~/libs/Flags';
	import AppHeader from '~/components/AppHeader';

	export default {
		name: 'DefaultLayout',
		components: {AppHeader},

		computed: {
			canShowHeader() {
				return this.$route.name !== 'index';
			}
		},

		created() {
			WebFont.load({
				google: {
					families: ['Raleway:200,400:latin-ext']
				},
				active() {
					Flags.set('webfontsloaded');
				}
			});
		},
	};
</script>

<style lang="scss">
	html {
		width: 100vw;
	}
	body {
		position: relative;
		width: 100vw;
		background-color: $cBackground;
		font-family: 'Raleway', sans-serif;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent;
		overflow-x: hidden;

		::selection {
			color: $cGold;
			background-color: $cDarkGray;
		}
	}

	@media screen and (max-width: $dTablet) {
		html {
			font-size: 87.5%;
		}
	}

	@media screen and (max-width: $dPhone) {
		html {
			font-size: 75%;
		}
	}

	.page {
		display: flex;
		width: 100%;
		min-height: 100vh;
		color: $cText;
		font-weight: $fwLight;
		opacity: 1;

		&:not(&--no-padding) {
			padding: $sHeaderHeight+$sPageShadowHeight $sPageGutter*2 $sPageGutter+$sPageShadowHeight;
		}

		&:not(&--no-bottom-shadow) {
			padding-bottom: $sPageShadowHeight;

			&:after {
				content: '';
				display: block;
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: $sPageShadowHeight;
				background: linear-gradient(to top, $cBlack, transparent);
			}
		}

		&.page-slide-left-enter-active,
		&.page-slide-left-leave-active,
		&.page-slide-right-enter-active,
		&.page-slide-right-leave-active,
		&.page-fade-enter-active,
		&.page-fade-leave-active {
			position: absolute;
		}

		&.page-slide-left-enter-active,
		&.page-slide-left-leave-active,
		&.page-slide-right-enter-active,
		&.page-slide-right-leave-active {
			transition: transform 0.5s ease-in-out;
		}

		&.page-fade-enter-active,
		&.page-fade-leave-active {
			transition: opacity 0.5s ease-in-out;
		}

		&.page-slide-left-enter,
		&.page-slide-right-leave-to {
			transform: translateX(100vw);
		}

		&.page-slide-left-leave-to,
		&.page-slide-right-enter {
			transform: translateX(-100vw);
		}

		&.page-fade-enter,
		&.page-fade-leave-to {
			opacity: 0;
		}
	}

	.page__title {
		@include typo(h1);
		@include line-height(small);
		@include golden-glow;

		color: $cHeading;
	}

	.page__content {
		@include line-height(normal);

		text-align: center;
		margin: auto;
	}

	@media screen and (max-width: $dPhone) {
		.page {
			&:not(&--no-padding) {
				padding: $sHeaderHeight+$sPageShadowHeight $sPageGutter $sPageGutter+$sPageShadowHeight;
			}
		}
	}
</style>
