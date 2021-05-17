import axios from 'axios'

export function request(config) {
	//  创建axios实例
	const instance = axios.create({
		baseURL: 'http://127.0.0.1:8888/api/private/v1/',
		timeout: 5000
	})
	
	// axios的拦截器
	// 请求拦截的作用
	instance.interceptors.request.use(config => {
		 // console.log(config.header);
		  config.header.Authorization = window.sessionStorage.getItem('token')
		// config中的一些信息不符合服务器的要求
		// 每次发送网络请求时，都希望在界面显示一个请求的图标
		// 某些网络请求比如登录 必须携带一些特殊的信息
		return config 
	},err =>{
		// console.log(err);
	})
	
	// 响应拦截
	instance.interceptors.response.use(res =>{
		return res.data
	},err =>{
		console.log(err);
	})
	
	// 发送真正的网络请求
	return instance(config)
}
