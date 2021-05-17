<template>
	<div>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="queryinfo.pagenum" :page-sizes="[8, 4, 2, 1]" :page-size="queryinfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name:'Pagination',
		props:{
			queryinfo:{
				type:Object
			},
			total:{
				type:[String,Number]
			},
			
		},
		methods:{
			handleSizeChange(val){
				this.queryinfo.pagesize = val
				this.$emit('getInfo')
			},
			handleCurrentChange(val){
				this.queryinfo.pagenum = val
				this.$emit('getInfo')
			}
		}
	}
</script>

<style>
</style>
