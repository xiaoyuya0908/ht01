import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		username: window.sessionStorage.getItem('username') || '',
		token: false
	},
	mutations: {
		login(state, user) {
			state.token = user.token;
			state.username = user.username;
			window.sessionStorage.setItem('token', user.token)
			window.sessionStorage.setItem('username',user.username)
		}
	},
	actions: {},
	modules: {}
})
