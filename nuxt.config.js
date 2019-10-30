export default {
	mode: 'spa',
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
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
	plugins: [],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module'
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

		extend(config, ctx) {
		}
	},

	router: {
		linkExactActiveClass: 'link--active',
	}
};
