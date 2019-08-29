<template>
	<div class="m-homeremd">
		<RemdTl>推荐歌单</RemdTl>
		<RemdSongs />
		<RemdTl>最新音乐</RemdTl>
		<RemdNewsg :result="comResult"/>
	</div>
</template>

<script>
// @ is an alias to /src
import RemdTl from "@/components/RemdTl";
import RemdSongs from "@/components/RemdSongs";
import RemdNewsg from "@/components/RemdNewsg";

export default {
	name: "homeremd",
	components: {
		RemdTl,
		RemdSongs,
		RemdNewsg
	},
	data() {
		return {
			result: null
		};
	},
	created() {
		window.scrollTo(0, 0);
		this.$axios
			.get("/api/personalized/newsong")
			.then(res => {
				this.result = JSON.parse(res).result;
			})
			.catch(err => console.log(err));
	},
	computed: {
		comResult() {
			let result = this.result;
			if (!result) {
				return null;
			}
			return result.map(item => {
				let obj = {};
				obj.id = item.id;
				obj.name = item.name;

				let artists = item.song.artists;
				let infoart = artists.map((art, i) => art.name).join(" / ");
				obj.infoart = infoart;
				obj.infoname = item.song.name;
				return obj;
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
