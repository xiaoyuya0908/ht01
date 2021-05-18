export default {
	filters: {
		numToString: function(value) {
			return value.toString()
		},
		rightsLevelUp:function(value) {
			if (value === '0') {
				return '一级'
			}else if(value === '1') {
				return '二级'
			}else{
				return '三级'
			}
		}
	}
}
