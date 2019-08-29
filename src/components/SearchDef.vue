<template>
	<div class="m-default">
		<section class="m-hotlist">
			<h3 class="title">热门搜索</h3>
			<ul class="list">
				<li class="item f-bd f-bd-full" v-for="(item,i) in result" :key="i.toString()">
					<a
						class="link"
						href="javascript:void(0);"
						@click.stop.prevent="clickHandle(item.first)"
					>{{item.first}}</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_SEARCH_VALUE, SET_ISSEARCH } from "@/store/mutation-types";
export default {
	name: "default",
	data() {
		return {
			result: null
		};
	},
	created() {
		this.$axios
			.get("/api/search/hot")
			.then(res => (this.result = JSON.parse(res).result.hots))
			.catch(err => console.log(err));
	},
	methods: {
		...mapMutations({
			setvalue: SET_SEARCH_VALUE,
			setsearch: SET_ISSEARCH
		}),
		clickHandle(value) {
			this.setvalue(value);
			this.setsearch(false);
		}
	}
};
</script>

<style lang="scss" scoped>
.m-hotlist {
	padding: 15px 10px 0;
	.title {
		font-size: 12px;
		line-height: 12px;
		color: #666;
	}
	.list {
		margin: 10px 0 7px;
	}
	.item {
		display: inline-block;
		height: 32px;
		margin-right: 8px;
		margin-bottom: 8px;
		padding: 0 14px;
		font-size: 14px;
		line-height: 32px;
		color: #333;
		&:after {
			border-color: #d3d4da;
			border-radius: 32px;
		}
	}
}
</style>