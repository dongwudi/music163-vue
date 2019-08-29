<template>
	<div class="m-hmhot">
		<HotTop :time="time" />
		<HotCont :list="list" />
	</div>
</template>

<script>
import HotTop from "@/components/HotTop";
import HotCont from "@/components/HotCont";
export default {
	name: "hmhot",
	data() {
		return {
			time: 1566436104305,
			list: null
		};
	},
	components: {
		HotTop,
		HotCont
	},
	created() {
		window.scrollTo(0, 0);
		this.$axios
			.get("/api/top/list?idx=1")
			.then(res => {
				let data = JSON.parse(res).playlist;
				this.list = data.tracks;
				this.time = data.updateTime;
			})
			.catch(err => console.log(err));
	}
};
</script>

<style lang="scss" scoped>
</style>