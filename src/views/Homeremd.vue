<template>
	<div class="m-homeremd">
		<div>
			<RemdTl>推荐歌单</RemdTl>
			<RemdSongs />
			<RemdTl>最新音乐</RemdTl>
			<RemdNewsg :result="_result" />
		</div>
	</div>
</template>

<script>
import { remdNewSongs, RES_OK } from "@/axios/api";
import BScroll from "@better-scroll/core";
import RemdTl from "@/components/RemdTl";
import RemdSongs from "@/components/RemdSongs";
import RemdNewsg from "@/components/RemdNewsg";
import { setTimeout } from "timers";

export default {
	components: {
		RemdTl,
		RemdSongs,
		RemdNewsg
	},
	data() {
		return {
			result: []
		};
	},
	created() {
		window.scrollTo(0, 0);
		remdNewSongs().then(res => {
			if (res.code === RES_OK) {
				this.result = res.result;
			}
		});
	},
	mounted() {
		setTimeout(() => {
			this._initScroll();
		}, 20);
	},
	beforeDestroy() {
		this.bs.destroy();
	},
	computed: {
		_result() {
			let result = this.result;
			return result.map(item => {
				return Object.assign({}, item, {
					infoart: item.song.artists.map((art, i) => art.name).join(" / ")
				});
			});
		}
	},
	methods: {
		_initScroll() {
			this.bs = new BScroll(".m-homeremd", {
				scrollY: true,
				click: true,
				probeType: 3 // listening scroll hook
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.m-homeremd {
	padding-top: 20px;
}
</style>
