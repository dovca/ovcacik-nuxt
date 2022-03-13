export default {
	ssr: false,
	target: 'static',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'David Ovčačík',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{
				hid: 'description',
				name: 'description',
				content: 'programmer, music enthusiast, food lover'
			},
			{name: 'msapplication-tap-highlight', content: 'no'},
			{name: 'msapplication-TileColor', content: '#000000'},
			{name: 'msapplication-TileImage', content: '/mstile-144x144.png'},
			{name: 'msapplication-config', content: '/browserconfig.xml'},
			{name: 'theme-color', content: '#000000'}
		],
		link: [
			{rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png'},
			{rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
			{rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
			{rel: 'manifest', href: '/site.webmanifest'},
			{rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#d1be85'},
			{rel: 'shortcut icon', href: '/favicon.ico'},
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: false,
	/*
	 ** Global CSS
	 */
	css: [
		'./assets/scss/common.scss'
	],

	styleResources: {
		scss: './assets/scss/definitions.scss'
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/pixi.js',
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		'@nuxtjs/svg',
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/device',
		'@nuxtjs/style-resources'
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extractCSS: true,

		babel: {
			plugins: ['@babel/plugin-proposal-optional-chaining']
		},

		// https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
		optimization: {
			minimize: process.env.NODE_ENV === 'production',
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module) {
							// get the name. E.g. node_modules/packageName/not/this/part.js
							// or node_modules/packageName
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

							// npm package names are URL-safe, but some servers don't like @ symbols
							return `npm.${packageName.replace('@', '')}`;
						},
					},
				},
			},
		},

		extend(config, ctx) {
			config.performance.maxAssetSize = 300000;
		}
	},

	router: {
		trailingSlash: true,
		linkExactActiveClass: 'link--active',
	},

	vue: {
		config: {
			devtools: process.env.NODE_ENV !== 'production'
		}
	}
};
