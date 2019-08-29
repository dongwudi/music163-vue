<template>
	<h2 class="remd_tl">
		<slot></slot>
	</h2>
</template>

<script>
export default {
	name: "remd_tl"
};
</script>

<style lang="scss" scoped>
.remd_tl {
	position: relative;
	padding-left: 9px;
	margin-bottom: 14px;
	font-size: 17px;
	height: 20px;
	line-height: 20px;
	&::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -9px;
		width: 2px;
		height: 16px;
		background-color: #d33a31;
	}
}
</style>