<template>
	<Scroll class="m-searchresult" :data="searchList" @pollup="pollUp" :poll_up="poll_up" ref="sear">
		<div>
			<div class="m-matchlist">
				<h3 class="title">最佳匹酝</h3>
				<ul>
					<li class="matchitem artist" v-for="item in mutiList" :key="item.id" :class="item.type">
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
			<RemdNewsg :result="searchList" />
			<Loading v-show="has_more" />
			<div v-show="!has_more" class="end">已经到底了~~</div>
		</div>
	</Scroll>
</template>

<script>
import RemdNewsg from "@/components/RemdNewsg";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";
import { searchMultimatch, searchkeyWords, RES_OK } from "@/axios/api";
export default {
	data() {
		return {
			offset: 1,
			mutiList: [],
			searchList: [],
			poll_up: true,
			has_more: true
		};
	},
	props: {
		query: {
			type: String,
			default: ""
		}
	},
	watch: {
		query(newQuery) {
			if (!newQuery) {
				this.mutiList = [];
				this.searchList = [];
				return;
			}
			this.search();
		}
	},
	methods: {
		search() {
			let { query, offset } = this;
			this._getMul(query);
			this._getSea(query, offset);
		},
		_getMul(query) {
			searchMultimatch(query).then(res => {
				if (res.code === RES_OK) {
					let result = res.result;
					if (!result.orders) {
						return;
					}
					let len = result.orders.length;
					let arr = Array.from(len);
					let index = 0;
					while (index < len) {
						let type = result.orders[index];
						if (type === "video") {
							index++;
							continue;
						}
						arr[index] = result[result.orders[index]][0];
						arr[index].type = type;
						let adar = result[result.orders[index]][0].artists;
						arr[index].addart = adar
							? adar.map(item => item.name).join(" / ")
							: "";
						switch (type) {
							case "album":
								arr[index].tyn = "专辑";
								break;
							case "artist":
								arr[index].tyn = "歌手";
								break;
							case "mv":
								arr[index].tyn = "MV";
								arr[index].cv = result["video"][0];
								break;
						}
						index++;
					}
					this.mutiList = arr;
				}
			});
		},
		_getSea(query, offset) {
			//初始化
			this.offset = 1;
			this.has_more = true;
			this.$refs.sear.scrollTo(0, 0);

			searchkeyWords(query, offset).then(res => {
				if (res.code === RES_OK) {
					this._check_more(res); //设置更多标志
					this.searchList = res.result.songs.map(item => {
						let obj = {};
						obj.id = item.id + Math.random(); //数据区分
						obj.name = item.name;
						let artists = item.artists;
						let infoart = artists.map((art, i) => art.name).join(" / ");
						obj.infoart = infoart;
						obj.infoname = item.name;
						return obj;
					});
				}
			});
		},
		pollUp() {
			if (!this.has_more) {
				return;
			}
			this.offset++;
			searchkeyWords(this.query, this.offset).then(res => {
				if (res.code === RES_OK) {
					this._check_more(res); //设置更多标志
					this.searchList = this.searchList.concat(
						res.result.songs.map(item => {
							let obj = {};
							obj.id = item.id;
							obj.name = item.name;
							let artists = item.artists;
							let infoart = artists.map((art, i) => art.name).join(" / ");
							obj.infoart = infoart;
							obj.infoname = item.name;
							return obj;
						})
					);
				}
			});
		},
		_check_more(res) {
			this.has_more = res.result.songCount > this.offset * 10;
		}
	},
	components: {
		RemdNewsg,
		Scroll,
		Loading
	}
};
</script>

<style lang="scss" scoped>
.m-searchresult {
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: auto;
	bottom: 0;
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
.end {
	text-align: center;
	height: 50px;
	line-height: 50px;
}
</style>