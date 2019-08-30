<template>
	<form action="#" class="m-input f-bd f-bd-btm" method="get">
		<div class="inputcover">
			<i class="u-svg u-svg-srch"></i>
			<input
				type="search"
				name="search"
				class="input"
				autocomplete="off"
				:placeholder="palceHolder"
				v-model="query"
				v-focus
			/>
			<figure class="close">
				<i class="u-svg u-svg-empty" v-show="query" @click="clearQuery"></i>
			</figure>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			query: ""
		};
	},
	props: {
		palceHolder: {
			type: String,
			default: "搜索歌曲、歌手、专辑"
		}
	},
	methods: {
		clearQuery() {
			this.query = "";
		},
		addQuery(newQuery) {
			this.query = newQuery;
		}
	},
	created() {
		this.$watch("query", newQuery => {
			this.$emit("query", newQuery);
		});
	}
};
</script>

<style lang="scss" scoped>
.inputcover {
	padding: 0 16px;
}
.inputcover,
.u-input-login {
	width: 100%;
	box-sizing: border-box;
}

.m-input {
	padding: 15px 10px;
	.inputcover {
		position: relative;
		width: 100%;
		height: 30px;
		padding: 0 30px;
		box-sizing: border-box;
		background: #ebecec;
		border-radius: 30px;
	}
	.u-svg-srch {
		position: absolute;
		left: 0;
		top: 9px;
		margin: 0 8px;
		vertical-align: middle;
	}
	.input {
		width: 100%;
		height: 30px;
		line-height: 18px;
		background: transparent;
		font-size: 14px;
		color: #333;
	}
	.holder {
		position: absolute;
		left: 30px;
		top: 5px;
		font-size: 14px;
		color: #c9c9c9;
		background: transparent;
		pointer-events: none;
	}
	.close {
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 30px;
		line-height: 28px;
		text-align: center;
	}
	.u-svg-empty {
		display: inline-block;
		vertical-align: middle;
	}
}

.m-input:after {
	border-color: rgba(0, 0, 0, 0.1);
}
</style>