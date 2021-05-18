<template>
	<div>
		<!-- 卡片视图 -->
		<el-card>
			<!-- 权限表格 -->
			<el-table :data='rightsList' border style='width: 100%;' height="500">
				<!-- 序号 -->
				<el-table-column type='index' label='#'></el-table-column>
				<!-- 权限名称 -->
				<el-table-column prop='authName' label='权限名称'></el-table-column>
				<!-- 路径 -->
				<el-table-column prop='path' label='路径'></el-table-column>
				<!-- 权限等级 -->
				<el-table-column label='权限等级'>
					<template v-slot="scope">
						<el-button :type='currentType[scope.row.level]' plain>{{scope.row.level | rightsLevelUp}}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import common from '../../common/mixin/common.js'
	export default {
		name: 'Rights',
		mixins: [common],
		data() {
			return {
				// 权限列表
				rightsList: [],
				currentType:['primary','success','warning']
			}
		},
		created() {
			// 获取权限列表
			this.getRightsList()
		},
		computed: {
			
		},
		methods: {
			// 获取权限列表
			getRightsList() {
				this.$http.get('rights/list').then(res => {
					// console.log(res);
					if (res.data.meta.status !== 200) return this.$message.error('获取失败')
					this.$message.success('获取成功')
					this.rightsList = res.data.data


					// 对权限列表中的权限等级进行修饰
					// this.rightsList.forEach(v => {
					// 	if (v.level === '0') {
					// 		return v.level = '一级'
					// 	} else if (v.level === '1') {
					// 		return v.level = '二级'
					// 	} else {
					// 		return v.level = '三级'
					// 	}
					// })
					console.log(this.rightsList);
				})
			},
			
		},

	}
</script>

<style>
</style>
