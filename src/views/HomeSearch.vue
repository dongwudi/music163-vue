<template>
	<div class="m-hmsrch">
		<SearchBox palceHolder="搜索歌曲、歌手、专辑" ref="searchbox" @query="queryChange" />
		<div class="hots">
			<div class="m-default">
				<section class="m-hotlist" v-show="!query">
					<h3 class="title">热门搜索</h3>
					<ul class="list">
						<li
							class="item f-bd f-bd-full"
							@click="addQuery(item.first)"
							v-for="(item,i) in hotSearchList"
							:key="i"
						>
							<a class="link" href="javascript:void(0);">{{item.first}}</a>
						</li>
					</ul>
				</section>
			</div>
			<SearchHistory v-show="!query" :query="query" />
		</div>
		<SearchRes :query="query" v-show="query" />
	</div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import SearchRes from "@/components/SearchRes";
import SearchHistory from "@/components/SearchHistory";

import { hotSearch, RES_OK } from "@/axios/api";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
	data() {
		return {
			query: "",
			hotSearchList: []
		};
	},
	components: {
		SearchBox,
		SearchRes,
		SearchHistory
	},
	created() {
		this._getHotSearchList();
	},
	methods: {
		_getHotSearchList() {
			hotSearch().then(res => {
				if (res.code === RES_OK) {
					this.hotSearchList = res.result.hots;
				}
			});
		},
		addQuery(newQuery) {
			this.$refs.searchbox.addQuery(newQuery);
		},
		queryChange(query) {
			this.query = query;
		}
	}
};
</script>

<style lang="scss" scoped>
.m-hmsrch {
	position: relative;
	top: 0;
	left: 0;
	background: #fbfcfd;
	height: 100%;
}
.hots {
	position: absolute;
	top: 60px;
	width: 100%;
	left: 0;
	right: 0;
	bottom: 0;
	height: auto;
	overflow: auto;
}

.u-svg-empty.z-show {
	display: inline-block;
}

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