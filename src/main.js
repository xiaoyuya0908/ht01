import Vue from 'vue'

// import './plugins/axios.js'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// import {request} from './network/request.js'

import './assets/fonts/iconfont.css'
import './assets/css/global.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios  //request
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

axios.interceptors.request.use(config => {
	/* console.log(config) */
	config.headers.Authorization = window.sessionStorage.getItem('token')
	// console.log(config)
	// 在最后必须 return config
	return config
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
