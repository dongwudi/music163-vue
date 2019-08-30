<template>
	<Scroll :data="_result">
		<div class="m-homeremd">
			<BannerCom />
			<RemdTl>推荐歌单</RemdTl>
			<RemdSongs />
			<RemdTl>最新音乐</RemdTl>
			<RemdNewsg :result="_result" />
		</div>
	</Scroll>
</template>

<script>
import { remdNewSongs, RES_OK } from "@/axios/api";
import Scroll from "@/components/Scroll";
import RemdTl from "@/components/RemdTl";
import RemdSongs from "@/components/RemdSongs";
import RemdNewsg from "@/components/RemdNewsg";
import BannerCom from "@/components/BannerCom";
import { setTimeout } from "timers";

export default {
	components: {
		RemdTl,
		RemdSongs,
		RemdNewsg,
		BannerCom,
		Scroll
	},
	data() {
		return {
			result: []
		};
	},
	mounted() {
		this._getSongs();
	},
	methods: {
		_getSongs() {
			remdNewSongs().then(res => {
				if (res.code === RES_OK) {
					this.result = res.result;
				}
			});
		}
	},
	computed: {
		_result() {
			let result = this.result;
			return result.map(item => {
				return Object.assign({}, item, {
					sginfo: item.song.artists.map((art, i) => art.name).join(" / ") +
						"-" +
						item.song.album.name
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.m-homeremd {
	padding-top: 0px;
}
</style>
