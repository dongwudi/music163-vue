<template>
	<div class="m-playlist u-paddlr u-paddbm">
		<div>
			<section class="u-plhead pylst_header">
				<div class="plhead_bg" :style="`background-image:url(${resultList.backgroundUrl})`"></div>
				<div class="plhead_wrap">
					<div class="plhead_fl lsthd_fl">
						<img class="u-img" :src="resultList.coverImgUrl" />
						<span class="lsthd_icon">歌单</span>
						<i class="u-earp lsthd_num">{{resultList.count}}</i>
					</div>
					<div class="plhead_fr">
						<h2 class="f-thide2 f-brk lsthd_title">{{resultList.name}}</h2>
						<div class="lsthd_auth f-thide">
							<a class="lsthd_link" href="javascript:;">
								<div class="u-avatar lsthd_ava">
									<img class="u-img" :src="resultList.avatarUrl" />
									<span class="ava-icon ava-icon-daren"></span>
								</div>
								{{resultList.nickname}}
							</a>
						</div>
					</div>
				</div>
			</section>
			<!-- 简介 -->
			<section class="pylst_intro">
				<div class="lstit_tags">
					标签：
					<em class="f-bd f-bd-full lstit_tag">华语</em>
					<em class="f-bd f-bd-full lstit_tag">浪漫</em>
					<em class="f-bd f-bd-full lstit_tag">快乐</em>
				</div>
				<div class="u-intro">
					<div class="f-brk" :class="showIntro ? '' : 'f-thide3'" @click="showIntro = !showIntro">
						<span v-for="(dec,i) in resultList.description" :key="i">
							<i v-if="i === 0">简介： {{dec}}</i>
							<i>{{dec}}</i>
							<br />
						</span>
					</div>
					<span class="intro_arrow" :class="showIntro ? 'u-arowup' : 'u-arowdown'"></span>
				</div>
			</section>
		</div>
		<div class="pylst_list">
			<h3 class="u-smtitle">歌曲列表</h3>
			<div class="m-sglst">
				<router-link
					class="m-sgitem"
					:to="{ name: 'song', query: {id: item.id}}"
					v-for="(item,i) in resultList.tracks"
					:key="item.id"
				>
					<div class="sgfl">{{i + 1}}</div>
					<div class="sgfr f-bd f-bd-btm">
						<div class="sgchfl">
							<div class="f-thide sgtl">{{item.name}}</div>
							<div class="f-thide sginfo">{{item.sginfo}}</div>
						</div>
						<div class="sgchfr">
							<span class="u-hmsprt sgchply"></span>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { changeCount } from "@/util";
export default {
	name: "playlist",
	data() {
		return {
			id: this.$route.query.id,
			result: null,
			showIntro: false
		};
	},
	created() {
		this.$axios
			.get(`/api/playlist/detail?id=${this.id}`)
			.then(res => (this.result = JSON.parse(res)));
	},
	computed: {
		resultList() {
			if (!this.result) return {};
			let playlist = this.result.playlist;
			let res = {
				coverImgUrl: playlist.coverImgUrl,
				name: playlist.name,
				count: changeCount(playlist.playCount),
				avatarUrl: playlist.creator.avatarUrl,
				backgroundUrl: playlist.creator.backgroundUrl,
				nickname: playlist.creator.nickname,
				tags: playlist.tags,
				description: playlist.description.split("\n"),
				tracks: playlist.tracks.map(item => ({
					id: item.id,
					name: item.name,
					sginfo: item.ar.map(ar => ar.name).join(" / ") + "-" + item.al.name
				}))
			};
			return res;
		}
	}
};
</script>

<style lang="scss" scoped>
.u-paddbm {
	padding-bottom: env(safe-area-inset-bottom);
}
.u-paddlr {
	padding-left: env(safe-area-inset-left);
	padding-right: env(safe-area-inset-right);
}

.m-playlist {
	background-color: #f8f8f8;
	min-height: 100%;
}

.u-plhead {
	position: relative;
	padding: 30px 10px 30px 15px;
	overflow: hidden;
}
.u-plhead .plhead_bg {
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%;
	-webkit-filter: blur(20px);
	filter: blur(20px);
	-webkit-transform: scale(1.5);
	-ms-transform: scale(1.5);
	transform: scale(1.5);
}
.u-plhead .plhead_bg,
.u-plhead .plhead_bg:after {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
}
.u-plhead .plhead_bg,
.u-plhead .plhead_bg:after {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
}
.u-plhead .plhead_bg:after {
	content: " ";
	background-color: rgba(0, 0, 0, 0.25);
}

.u-plhead .plhead_wrap {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	position: relative;
	z-index: 2;
}
.pylst_header .lsthd_fl {
	position: relative;
}
.u-plhead .plhead_fl {
	position: relative;
	width: 114px;
	height: 114px;
	background-color: #e2e2e3;
}
@media screen and (min-width: 360px) {
	.u-plhead .plhead_fl {
		width: 126px;
		height: 126px;
	}
}
.u-plhead .plhead_fr {
	-webkit-box-flex: 1;
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
	width: 1%;
	margin-left: 16px;
}
.u-img {
	width: 100%;
	vertical-align: middle;
}
.pylst_header .lsthd_icon {
	position: absolute;
	z-index: 3;
	top: 10px;
	left: 0;
	padding: 0 8px;
	height: 17px;
	color: #fff;
	font-size: 9px;
	text-align: center;
	line-height: 17px;
	background-color: rgba(217, 48, 48, 0.8);
	border-top-right-radius: 17px;
	border-bottom-right-radius: 17px;
}
.u-earp {
	background-image: url("../assets/hd.svg");
}
.pylst_header .lsthd_num {
	position: absolute;
	right: 2px;
	top: 0;
	z-index: 3;
	padding-left: 15px;
	color: #fff;
	font-size: 12px;
	background-position: 0;
	background-repeat: no-repeat;
	background-size: 11px 10px;
	text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
}
.pylst_header .lsthd_fl:after {
	content: " ";
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 18px;
	z-index: 2;
	background-image: -webkit-linear-gradient(
		left,
		transparent,
		rgba(0, 0, 0, 0.2)
	);
	background-image: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2));
}
.f-brk {
	word-wrap: break-word;
	white-space: normal;
}

.f-thide2,
.f-thide3,
.f-thide4 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.pylst_header .lsthd_title {
	padding-top: 1px;
	font-size: 17px;
	line-height: 1.3;
	color: #fefefe;
	height: 44px;
	display: -webkit-box;
	-webkit-box-pack: center;
}
.pylst_header .lsthd_auth {
	display: block;
	position: relative;
	margin-top: 20px;
}
.pylst_header .lsthd_link {
	display: inline-block;
	color: hsla(0, 0%, 100%, 0.7);
}
.u-avatar {
	position: relative;
	width: 100%;
}
.u-avatar > .u-img {
	border-radius: 50%;
}
.pylst_header .lsthd_ava {
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 5px;
}

.pylst_intro {
	position: relative;
	margin: 0 10px 0 15px;
	padding-top: 10px;
	line-height: 19px;
	color: #666;
}
.lstit_tags {
	margin-bottom: 10px;
	line-height: 20px;
	margin-right: -10px;
}
.lstit_tag {
	display: inline-block;
	margin-right: 10px;
	padding: 1px 8px;
	font-size: 12px;
}
.u-intro {
	position: relative;
	padding-bottom: 18px;
	line-height: 19px;
	color: #666;
}

.u-intro .intro_arrow {
	position: absolute;
	bottom: 3px;
	right: 0;
	z-index: 3;
	width: 15px;
	height: 15px;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: 12px auto;
}
.f-thide3 {
	-webkit-line-clamp: 3;
}

.u-smtitle {
	height: 23px;
	line-height: 23px;
	padding: 0 10px;
	font-size: 12px;
	color: #666;
	background-color: #eeeff0;
}

.m-sgitem {
	padding-left: 10px;
}

.m-sgitem,
.m-sgitem .sgfl {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
.m-sgitem,
.m-sgitem .sgfl {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
.m-sgitem .sgfl {
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 40px;
	font-size: 17px;
	color: #999;
	margin-left: -10px;
}
.m-sgitem .sgfr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	position: relative;
}
.m-sgitem .sgchfl,
.m-sgitem .sgfr {
	-webkit-box-flex: 1;
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}
.m-sgitem .sgchfl,
.m-sgitem .sgfr {
	-webkit-box-flex: 1;
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}
.m-sgitem .sgchfl {
	padding: 6px 0;
	width: 0;
}
.m-sgitem .sgtl {
	font-size: 17px;
}
.m-sgitem .sginfo {
	font-size: 12px;
	color: #888;
}
.m-sgitem .sgchfr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 0 10px;
}

.m-sgitem .sgchply {
	display: inline-block;
	width: 22px;
	height: 22px;
	background-position: -24px 0;
}
</style>