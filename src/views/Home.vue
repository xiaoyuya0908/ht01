<template>
	<el-container class="home-container">
		<!-- 头部 -->
		<el-header>
			<div class="logowrapper" :class="[this.iscollapse?'class1':'class2']"><img :src="iscollapse?'':img"class="logo" /></div>
			<el-button icon="el-icon-s-fold" class="collapse" @click="collapsemenus":class="[this.iscollapse ? 'class3' : 'class4']"></el-button>
			<span class="username">{{username}}</span>
			<el-button type="success" @click="layout" class="layoutbutton">退出</el-button>
		</el-header>
		<!-- 主体 -->
		<el-container class="container">
			<!-- 左侧侧边栏 -->
			<el-aside :width="scollapse">
				<el-menu :default-active="activepath" class="el-menu-vertical-demo" background-color="#545c64"
					text-color="#fff" active-text-color="#A1C20A" unique-opened router :collapse="iscollapse"
					:collapse-transition="false">
					<el-submenu :index="item.id|numToString" v-for="item in menusList" :key="item.id">
						<template slot="title">
							<i :class="iconsObj[item.id]"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="'/'+child.path" v-for="child in item.children" :key="child.id"
								@click="saveMenusList('/'+child.path)">
								<i :class="iconsObj2[child.id]"></i>
								<span>{{child.authName}}</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<bread-crumb :Bran='bran'></bread-crumb>
				<!-- 路由占位符 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	import common from "../common/mixin/common.js"
	import BreadCrumb from '../components/BreadCrumb/BreadCrumb.vue'
	export default {
		mixins: [common],
		name: 'Home',
		data() {
			return {
				img: require('../assets/images/kgc.png'),
				menusList: [],
				iconsObj: {
					'125': 'iconfont icon-user',
					'103': 'iconfont icon-tijikongjian',
					'101': 'iconfont icon-shangpin',
					'102': 'iconfont icon-danju',
					'145': 'iconfont icon-baobiao'
				},
				iconsObj2: {
					'110': 'el-icon-s-grid',
					'111': 'el-icon-s-data',
					'112': 'el-icon-s-opportunity',
					'115': 'el-icon-s-platform',
					'121': 'el-icon-s-management',
					'104': 'el-icon-s-order',
					'107': 'el-icon-platform-eleme',
					'146': 'el-icon-s-cooperation',
				},
				activepath: '',
				iscollapse: false,
				bran: []
			}
		},
		components: {
			BreadCrumb
		},
		created() {
			this.getMenuList()
			this.getBranRoute()
			this.activepath = window.sessionStorage.getItem('activepath')
		},
		methods: {
			async getMenuList() {
				const {
					data: res
				} = await this.$http({
					url: 'menus',
					method: 'get',
				})
				//console.log(res);
				this.menusList = res.data
				//console.log(this.menusList);
			},
			layout() {
				window.sessionStorage.removeItem('token')
				this.$store.state.token = false
				this.$router.push('/login')
				this.$message.success('退出成功')
			},
			saveMenusList(activepath) {
				window.sessionStorage.setItem('activepath', activepath)
				/* 	this.activepath = activepath */
			},
			collapsemenus() {
				this.iscollapse = !this.iscollapse
			},
			getBranRoute() {
				//console.log(this.$route);
				const routeName = this.$route.matched.filter(v => v.name)
				//console.log(routeName);
				let arr = [];
				routeName.forEach((v, k) => {
					//console.log(v);
					//console.log(k);
					if (v.name === 'Home' || v.name === 'Welcome'){
						return
					}else{
						arr.push({
							name: v.name,
							path: v.path,
							title: v.meta.title
						})
					}
					//console.log(arr);
					if(arr.length > 0) {
						arr.unshift({
							name: 'Home',
							path: '/home',
							title: '后台首页'
						})
					}
					// console.log(arr);
					this.bran = arr
				})
				//console.log(this.bran);
			},
			
			
			
		},
		watch: {
			$route(to, from) {
				//console.log(to);
				//console.log(from);
				this.getBranRoute()
			}
		},
		computed: {
			...mapState(['username']),
			scollapse() {
				return this.iscollapse ? '64px' : '200px'
			}

		}
	}
</script>

<style scoped>
	
	.home-container {
		width: 100%;
		height: 100%;
	}
	
	.el-header {
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	
	.el-submenu__title {
		padding: 0 30px 0 0 !important;
	}

	.el-aside {
		background-color: #545c64;
		color: #333;
		height: 100%;
		line-height: 200px;
	}

	.class2 {
		width: 200px;
	}

	.class1 {
		width: 64px !important;
	}

	.class3 {
		margin-left: 60px !important;
	}

	.class4 {
		margin-left: 200px;
	}

	.collapse {
		float: left;
		border: none;
		font-size: 18px;
		margin-top: 10px;
	}

	.collapse:hover {
		background-color: #fff;
		color: #A1C20A;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
	}

	/* .el-submenu .el-menu-item {
		min-width: 199px;
	} */
	.el-menu {
		border: 0px;
	}

	.logo {
		height: 40px;
		margin-top: 10px;
		float: left;
	}

	.el-header .logowrapper {
		background: #333;
		width: 200px;
		height: 60px;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
	}

	.layoutbutton {
		float: right;
		margin-top: 10px;
	}

	.username {
		position: absolute;
		right: 100px;
	}

	.iconfont {
		margin-right: 10px;
	}
</style>
