<template>
	<div class="m-history">
		<ul class="list">
			<li class="item" v-for="(item,i) in list" :key="i" @click="removeHis(item)">
				<i class="u-svg u-svg-histy"></i>
				<div class="histyr f-bd f-bd-btm">
					<span class="link f-thide">{{item}}</span>
					<figure class="close">
						<i class="u-svg u-svg-close"></i>
					</figure>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { hisSave, getHis } from "@/util";
export default {
	data() {
		return {
			list: []
		};
	},
	props: {
		query: {
			type: String,
			default: ""
		}
	},
	created() {
		this.list = getHis() ? getHis().split(",") : [];
	},
	watch: {
		query(newValue) {
			if (!newValue || this.list.includes(newValue)) {
				return;
			}
			this.list.unshift(newValue);
			hisSave(this.list);
		}
	},
	methods: {
		removeHis(item) {
			this.list.splice(this.list.indexOf(item), 1);
			hisSave(this.list);
		}
	}
};
</script>

<style lang="scss" scoped>
.m-history .item,
.m-history .item .histyr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	height: 45px;
}
.u-svg-histy {
	width: 15px;
	height: 15px;
	background-image: url("../assets/his.svg");
}
.m-history .u-svg-histy {
	margin: 0 10px;
}
.m-history .item,
.m-history .item .histyr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	height: 45px;
}
.m-history .item .histyr {
	position: relative;
}
.m-history .item .histyr,
.m-history .item .link {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	width: 1%;
}

.m-history .item .histyr,
.m-history .item .link {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	width: 1%;
}
.m-history .item .link {
	margin-right: 10px;
}
.m-history .item .close {
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 auto;
	-ms-flex: 0 0 auto;
	flex: 0 0 auto;
	width: 32px;
	height: 32px;
	line-height: 32px;
	text-align: center;
}
.u-svg-close {
	width: 12px;
	height: 12px;
	background-image: url("../assets/close.svg");
}
.m-history .u-svg-close {
	margin-left: 2px;
}
</style>