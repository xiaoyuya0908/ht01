<template>
	<div>
		<el-card>
			<el-row :gutter="20">
				<!-- 搜索框 -->
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='getUserInfo'>
							<el-button slot="append" icon="el-icon-search" @click='getUserInfo'></el-button>
						</el-input>
					</div>
				</el-col>
				<!-- 添加用户按钮 -->
				<el-col :span="2">
					<div class="grid-content bg-purple">
						<el-button type="success" @click="addClick">添加用户</el-button>
					</div>
				</el-col>
			</el-row>
			<!-- 账户数据表格展示 -->
			<el-table :data="tableData" style="width: 100%" border height='450' class='table'>
				<!-- 序号 -->
				<el-table-column label="#" type="index"></el-table-column>
				<!-- 用户名 -->
				<el-table-column prop="username" label="用户名" width="180"></el-table-column>
				<!-- 邮箱 -->
				<el-table-column prop="email" label="邮箱" width="180"></el-table-column>
				<!-- 电话 -->
				<el-table-column prop="mobile" label="电话"></el-table-column>
				<!-- 角色 -->
				<el-table-column prop="role_name" label="角色" width="180"></el-table-column>
				<!-- 状态 -->
				<el-table-column label="状态" width="180">
					<template v-slot="scope">
						<el-switch v-model="scope.row.mg_state" @change="changeState(scope.row.id,scope.row.mg_state)"
							inactive-color="#999999" active-color="#13ce66">
						</el-switch>
					</template>
				</el-table-column>
				<!-- 操作 -->
				<el-table-column label="操作">
					<template v-slot="scope">
						<!-- 编辑 -->
						<el-button type="success" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)">
						</el-button>
						<!-- 删除 -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click='del(scope.row.id)'>
						</el-button>
						<el-button type="warning" icon="el-icon-share" size="mini"></el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页栏 -->
			<Pagination :queryinfo='queryInfo' :total='total' @getInfo='getUserInfo'></Pagination>

			<!-- 添加用户弹框 -->
			<el-dialog title="添加用户" :visible.sync="userTableVisible">
				<el-form :model="addUserForm" :rules="addrules" ref="addUserForm" label-width="100px"
					class="demo-ruleForm">
					<el-form-item label="姓名" prop="username">
						<el-input v-model="addUserForm.username"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="addUserForm.email"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="addUserForm.password" show-password></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="mobile">
						<el-input v-model="addUserForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click='cancelClick'>取 消</el-button>
					<el-button type="primary" @click='submitClick'>确 定</el-button>
				</span>
			</el-dialog>

			<el-dialog title="修改用户信息" :visible.sync="editTableVisible">
				<el-form :model='editUserForm' :rules="editrules" ref="editUserForm" label-width="100px"
					class="demo-ruleForm">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="editUserForm.username" disabled></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="editUserForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机" prop="mobile">
						<el-input v-model="editUserForm.mobile"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click='cancelClick'>取 消</el-button>
					<el-button type="primary" @click='editSubmit(editUserId)'>确 定</el-button>
				</span>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	import Pagination from '../pagination/Pagination.vue'
	export default {
		name: 'Users',
		data() {
			// 定义邮箱验证规则
			var checkEmail = (rule, value, cb) => {
				const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if (regEmail.test(value)) {
					return cb()
				}
				cb(new Error('请输入合法的邮箱'))
			}
			// 定义手机号码验证规则
			var checkMobile = (rule, value, cb) => {


				const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
				if (regMobile.test(value)) {
					return cb()
				}
				cb(new Error('请输入合法手机号码'))
			}

			return {
				// 账户数据列表
				tableData: [],

				queryInfo: {
					query: '',
					// 当前的页数
					pagenum: 1,
					// 当前每页显示多少条数据
					pagesize: 8,
				},

				total: 0,
				// 用户id
				userId: 0,


				// 添加用户弹框是否显示
				userTableVisible: false,
				// 修改用户弹框是否显示
				editTableVisible: false,


				// 添加用户表单
				addUserForm: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				editUserForm: {
					username: '',
					email: '',
					mobile: ''
				},
				// 添加用户的表单验证
				addrules: {
					// 用户名验证
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 10,
							message: '长度在2到10个字符',
							trigger: 'blur'
						}
					],
					// 密码验证
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15,
							message: '长度在3到15个字符',
							trigger: 'blur'
						}
					],
					// 邮箱验证
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							validator: checkEmail,
							trigger: 'blur'
						}
					],
					// 手机验证
					mobile: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					]
				},
				editrules: {
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}, {
						validator: checkEmail,
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					]
				},


			}
		},
		components: {
			Pagination,

		},
		created() {
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			async getUserInfo() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryInfo
				})
				//	console.log(res);
				this.tableData = res.data.users
				this.total = res.data.total
			},

			// 状态修改
			async changeState(id, state) {
				await this.$http.put("users/" + id + "/state/" + state)
				this.$message.success('状态修改成功')
			},

			// 添加用户点击事件
			addClick() {
				this.userTableVisible = true

			},
			// 添加用户弹出框取消事件
			cancelClick() {
				this.userTableVisible = false
				this.editTableVisible = false
				this.$refs.addUserForm.resetFields()
			},
			// 添加用户弹出框确认事件
			submitClick() {
				this.$refs.addUserForm.validate(async valid => {
					if (valid) {
						const {
							data: res
						} = await this.$http.post('users', this.addUserForm)
						console.log(res);
						this.getUserInfo()
						this.userTableVisible = false
						this.$message.success('添加用户成功')
						this.$refs.addUserForm.resetFields()
					} else {
						this.$message.error('添加失败')
						return false
					}
				})
			},
			// 编辑弹框
			async edit(id) {
				this.editTableVisible = true
				this.userId = id
				const {
					data: res
				} = await this.$http.get('users/' + id)
				console.log(res);
				this.editUserForm = res.data
			},
			// 编辑提交
			editSubmit(id) {
				//console.log(id);
				this.$refs.editUserForm.validate(async valid => {
					if (!valid) return;
					const {
						data: res
					} = await this.$http.put("users/" + id, this.editUserForm)
					//console.log(res);
					if (res.meta.status !== 200) return this.$message.error('修改失败')
					this.$message.success('修改成功')
					this.editTableVisible = false
					this.$refs.editUserForm.resetFields()
					this.getUserInfo()
				})
			},
			// 删除用户操作
			del(id) {
				this.userId = id
				// 弹框
				this.$confirm('此操作将永久删除此用户,是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const {data:res} = await this.$http.delete("users/"+id)
					if(res.meta.status !== 200) {
						return this.$message.error('删除用户失败')
					}
					this.$message({
						type: 'success',
						message: '删除成功！'
					})
					this.getUserInfo()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		}

	}
</script>

<style scoped="scoped">
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
