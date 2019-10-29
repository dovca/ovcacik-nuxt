<template>
	<div>
		<nuxt />
	</div>
</template>

<script>
	import WebFont from 'webfontloader';
	import Flags from '@/libs/Flags';

	export default {
		created() {
			WebFont.load({
				google: {
					families: ['Raleway:200,400,600:latin-ext']
				},
				active() {
					Flags.set('webfontsloaded');
				}
			});
		}
	};
</script>

<style lang="scss">
	body {
		font-family: 'Raleway', sans-serif;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-tap-highlight-color: transparent;

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
		min-height: 100vh;
		background-color: $cBackground;
		color: $cText;
		font-weight: $fwLight;

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
