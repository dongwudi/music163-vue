<template>
	<div class="m-song">

	</div>
</template>

<script>
export default {
	name: "song",
	data() {
		return {
			id: this.$route.query.id
		};
	},
	mounted() {
		document.getElementsByTagName('title')[0].innerHTML = this.id
	}
};
</script>

<style lang="scss" scoped>
</style>