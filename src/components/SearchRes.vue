<template>
	<div class="m-searchresult">
		<div class="m-matchlist">
			<h3 class="title">最佳匹酝</h3>
			<ul>
				<li class="matchitem artist" v-for="item in bestMatch" :key="item.id" :class="item.type">
					<router-link :to="`/${item.type}?id=${item.id}`">
						<div class="linkcover f-bd f-bd-btm">
							<figure class="piccover" v-if="item.type !== 'mv'">
								<img class="pic" :src="`${item.picUrl}?param=50y50`" />
							</figure>
							<figure class="piccover" v-if="item.type === 'mv'">
								<img class="pic" :src="`${item.cv.coverUrl}?param=50y50`" />
							</figure>
							<article class="describe">
								<h4 class="maindes f-thide">
									{{item.tyn}}
									<p class="hcover">
										<span>
											<span class="highlight">{{item.name}}</span>
										</span>
									</p>
								</h4>
								<p class="hcover addtional">{{item.addart}}</p>
							</article>
							<i class="u-svg u-svg-arr"></i>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<RemdNewsg :result="ngList" />
	</div>
</template>

<script>
import RemdNewsg from "@/components/RemdNewsg";
import { mapGetters } from "vuex";

export default {
	name: "recom",
	components: {
		RemdNewsg
	},
	computed: {
		...mapGetters(["bestMatch", "ngList"])
	}
};
</script>

<style lang="scss" scoped>
.m-searchresult {
	background: #fcfcfd;
}
.m-matchlist .piccover,
.m-matchlist .u-svg-arr {
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 auto;
	-ms-flex: 0 0 auto;
	flex: 0 0 auto;
	display: inline-block;
}
.m-matchlist {
	padding: 8px 0 4px;
	.title {
		margin-left: 10px;
		font-size: 12px;
		line-height: 16px;
		color: #666;
	}
	.matchitem {
		position: relative;
		height: 66px;
	}
	.linkcover {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		height: 66px;
		margin-left: 10px;
		padding: 8px 10px 8px 0;
		box-sizing: border-box;
	}
	.piccover {
		position: relative;
		width: 50px;
		height: 50px;
		margin-right: 15px;
		line-height: 0;
	}
	.pic {
		display: block;
		width: 100%;
	}
	.describe {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		display: inline-block;
		width: 1%;
		.maindes {
			font-size: 17px;
			line-height: 30px;
			color: #333;
		}
		.addtional {
			font-size: 12px;
			line-height: 15px;
			color: #999;
		}
	}
	.u-svg-arr {
		margin-right: 8px;
		margin-left: 10px;
	}
}

.m-matchlist .piccover,
.m-matchlist .u-svg-arr {
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 auto;
	-ms-flex: 0 0 auto;
	flex: 0 0 auto;
	display: inline-block;
}

.m-matchlist .mv .pic,
.m-matchlist .mv .piccover,
.m-matchlist .video .pic,
.m-matchlist .video .piccover {
	width: 89px;
	height: 50px;
}

.m-matchlist .mv .piccover:after,
.m-matchlist .video .piccover:after {
	content: "";
	position: absolute;
	z-index: 3;
	top: 50%;
	left: 50%;
	width: 20px;
	height: 20px;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background: url("../assets/play.svg") 0 0 / contain no-repeat;
}
</style>