<template>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item v-for="(item,index) in Bran" :key="index" :to="{ path:item.path }">{{item.title}}
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		name: 'BreadCrumb',
		props: {
			Bran: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
</style>
