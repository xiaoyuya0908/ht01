import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Login from '../views/Login.vue'

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
		meta:{
			title:'首页'
		},
		component: () => import('../views/Home.vue'),
		children:[
			{
				path:'/users',
				name:'Users',
				meta:{
					title:'用户列表'
				},
				component:() => import('../components/users/Users.vue')
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
