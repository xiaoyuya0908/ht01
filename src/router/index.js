import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/rights/Rights.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/home',
		name: 'Home',
		meta: {
			title: '首页'
		},
		component: Home,
		redirect: '/welcome',
		children: [{
				path: '/welcome',
				component: Welcome,
				name: "Welcome"
			},
			{
				path: '/users',
				name: 'Users',
				meta: {
					title: '用户列表'
				},
				component: Users
			},
			{
				path:'/rights',
				name:'Rights',
				component:Rights,
				meta:{
					title:'权限列表'
				}
			}
		]
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next()
	}
	const token = window.sessionStorage.getItem('token')
	if (!token) {
		next('/login')
	} else {
		next()
	}

})

export default router
