<template>
	<div class>{{id}}</div>
</template>

<script>
export default {
	name: "artist",
	data() {
		return {
			id: this.$route.query.id
		};
	}
};
</script>

<style lang="scss" scoped>
</style>