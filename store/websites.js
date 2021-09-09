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
					url: null
				},
				{
					title: 'Henrik the artist',
					url: 'https://henrikandfriends.club'
				},
				{
					title: 'J&T Art Index',
					url: 'https://artindexpopup.cz'
				},
				{
					title: 'Josefina Bakošová',
					url: 'https://josefinabakosova.com'
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
					title: 'Punkkilive',
					url: 'https://punkkilive.fi'
				},
				{
					title: 'Sazka Poslední lístek',
					url: null
				},
				{
					title: 'Sazka Stírací losy',
					url: null,
				},
				{
					title: 'Sunar CZ/SK',
					url: null
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
