<template>
	<div class="m-recom">
		<ul>
			<li
				class="recomitem"
				v-for="(item,i) in result"
				:key="i.toString()"
				@click="clickHandle(item.keyword)"
			>
				<i class="u-svg u-svg-search"></i>
				<span class="f-bd f-bd-btm f-thide">{{item.keyword}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { SET_SEARCH_VALUE, SET_ISSEARCH } from "@/store/mutation-types";

export default {
	name: "recom",
	props: ["value", "result"],
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
.m-recom {
	margin: 0 auto;
	.title {
		height: 50px;
		margin-left: 10px;
		padding-right: 10px;
		font-size: 15px;
		line-height: 50px;
		color: #507daf;
	}
	.recomitem {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		height: 45px;
		padding-left: 10px;
	}
	i {
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
		margin-right: 7px;
	}
	span {
		display: inline-block;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 1%;
		padding-right: 10px;
		font-size: 15px;
		line-height: 45px;
		color: #333;
	}
}
</style>