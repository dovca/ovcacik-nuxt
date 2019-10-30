export default {
	state() {
		return {
			list: []
		};
	},

	mutations: {
		update(state, data) {
			state.list = data;
		}
	},

	actions: {
		fetch({commit}) {
			commit('update', [
				{
					title: 'Adexpres',
					url: 'https://adexpres.com'
				},
				{
					title: 'Airstop',
					url: 'https://airstop.cz'
				},
				{
					title: 'Avast Technology',
					url: 'https://avast.com/technology'
				},
				{
					title: 'Golem VR',
					url: 'https://golemvr.cz'
				},
				{
					title: 'Henrik the artist',
					url: 'https://henrikandfriends.club'
				},
				{
					title: 'Krušovice MS Hokej 2019',
					url: null
				},
				{
					title: 'Ozvěny budoucnosti',
					url: null
				},
				{
					title: 'Sazka Poslední lístek',
					url: null
				},
				{
					title: 'Sazka Stírací losy',
					url: 'https://stiracilosy.cz'
				},
				{
					title: 'Sunar CZ/SK',
					url: 'https://sunar.cz'
				},
				{
					title: 'Škoda Octavia FL',
					url: null
				},
				{
					title: 'Škoda Rapid FL',
					url: null
				},
			]);
		}
	}
};
