import config from '~/config';

export default {
	transition(to, from) {
		if (!from) {
			return 'page-none';
		}

		if (from.name === 'index' || to.name === 'index') {
			return 'page-fade';
		}

		return {
			name: config.routes.indexOf(to.name) > config.routes.indexOf(from.name)
				? 'page-slide-left'
				: 'page-slide-right',
			mode: ''
		};
	}
};
