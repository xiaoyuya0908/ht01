<template>
	<div class="Login">
		<div class="container">
			<h1 class="title">UNADMIN</h1>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户" prop="username" size="small">
					<el-input v-model="ruleForm.username" placeholder="请输入账号" prefix-icon="iconfont icon-user">
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password" size="small">
					<el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"
						prefix-icon="iconfont icon-3702mima"></el-input>
				</el-form-item>
				<el-row class="el-row">
					<el-button type="primary" size="small" @click="submitForm('ruleForm')">登录</el-button>
					<el-button type="info" size="small" @click="resetForm('ruleForm')">重置</el-button>
				</el-row>
			</el-form>

		</div>
		<svg class="editorial" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 24 150 28" preserveAspectRatio="none">
			<defs>
				<path id="gentle-wave" d="M-160 44c30 0 
	     58-18 88-18s
	     58 18 88 18 
	     58-18 88-18 
	     58 18 88 18
	     v44h-352z" />
			</defs>
			<g class="parallax">
				<use xlink:href="#gentle-wave" x="50" y="0" fill="#4579e2" />
				<use xlink:href="#gentle-wave" x="50" y="3" fill="#3461c1" />
				<use xlink:href="#gentle-wave" x="50" y="6" fill="#2d55aa" />
			</g>
		</svg>
	</div>
</template>

<script>
	// @ is an alias to /src
	export default {
		name: 'Login',
		data() {
			return {
				ruleForm: {
					username: 'admin',
					password: '123456'
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 0 个字符',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			// request 封装方法
			// submitForm(ruleForm) {
			//   this.$refs[ruleForm].validate(async (valid) => {
			//     if (valid) {
			//       const res = await this.$http({
			//         url: "login",
			//         method: "post",
			//         params: this.ruleForm,
			//       });
			//       console.log(res);
			//       if (res.meta.status !== 200) return this.$message.error("登录失败！");
			//       this.$message.success("登录成功");
			//       this.$router.push({ name: "Home" });
			//       window.sessionStorage.setItem("token", res.data.token);
			//       console.log(res);
			//     } else {
			//       console.log("error submit!!");
			//       return false;
			//     }
			//   });
			// },

			// 封装方法简写
			// submitForm(ruleForm) {
			// 	this.$refs[ruleForm].validate((valid) => {
			// 		if (valid) {
			// 			this.$http({
			// 				url: "login",
			// 				method: "post",
			// 				params: this.ruleForm,
			// 			}).then(res => {
			// 				console.log(res);
			// 			});
			// 		} else {
			// 			console.log("error submit!!");
			// 			return false;
			// 		}
			// 	});
			// },

			//插件方法
			submitForm(ruleForm) {
				this.$refs[ruleForm].validate(async valid => {
					if (valid) {
						// console.log(this.$http);
						const {
							data: res
						} = await this.$http.post('login', this.ruleForm)
						if (res.meta.status !== 200) return this.$message.error('登录失败！')
						this.$message.success('登录成功')
						this.$store.commit('login', res.data)
						this.$router.push('/home')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(ruleForm) {
				this.$refs[ruleForm].resetFields();
			}
		}
	}
</script>
<style scoped>
	.Login {
		background-color: #2B4B6B;
		height: 100%;
		overflow: hidden;
	}

	.container {
		width: 400px;
		height: 260px;
		background-color: #fff;
		margin: 140px auto 0 auto;
		position: relative;
	}

	.demo-ruleForm {
		width: 90%;
		/* position: absolute; */
		/* top: 90px; */
	}

	.el-row {
		float: right;
	}

	.title {
		color: #333;
		text-align: center;
		padding: 30px 0 10px 0;
	}

	::selection {
		background-color: salmon;
		color: white;
	}

	.parallax>use {
		animation: move-forever 12s linear infinite;
	}

	.parallax>use:nth-child(1) {
		animation-delay: -2s;
	}

	.parallax>use:nth-child(2) {
		animation-delay: -2s;
		animation-duration: 5s;
	}

	.parallax>use:nth-child(3) {
		animation-delay: -4s;
		animation-duration: 3s;
	}

	@keyframes move-forever {
		0% {
			transform: translate(-90px, 0%);
		}

		100% {
			transform: translate(85px, 0%);
		}
	}

	.editorial {
		position: absolute;
		bottom: 0;
		display: block;
		width: 100%;
		height: 10em;
		max-height: 100vh;
		margin: 0;
	}
</style>
