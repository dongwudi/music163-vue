<template>
	<div class="m-hmsrch" ref="search">
		<form action="#" class="m-input f-bd f-bd-btm" method="get">
			<div class="inputcover">
				<i class="u-svg u-svg-srch"></i>
				<input
					type="search"
					name="search"
					class="input"
					autocomplete="off"
					v-model="value"
					@focus="focusHandle"
					v-focus
				/>
				<label class="holder" v-show="!value">搜索歌曲、歌手、专辑</label>
				<figure class="close">
					<i class="u-svg u-svg-empty" @click="showHolderHandle" :class="value ? 'z-show': ''"></i>
				</figure>
			</div>
		</form>
		<SearchDef v-if="!value" />
		<SearchRes v-if="!isSearch && value" />
		<RecomCom :value="value" :result="recomList" v-if="isSearch && value" />
		<SearchLoad v-if="loadShow" />
	</div>
</template>

<script>
import SearchDef from "@/components/SearchDef";
import SearchRes from "@/components/SearchRes";
import SearchLoad from "@/components/SearchLoad";
import RecomCom from "@/components/RecomCom";

import { mapState, mapMutations, mapActions } from "vuex";
import {
	SET_SEARCH_VALUE,
	SET_ISSEARCH,
	SET_RECOMLIST,
	SET_BESTNEW,
	SET_RESFLAG
} from "@/store/mutation-types";
import { setTimeout, clearTimeout } from "timers";
let timer;
export default {
	name: "hmsrch",
	data() {
		return {
			showDef: true,
			offset: 0
		};
	},
	components: {
		SearchDef,
		SearchRes,
		SearchLoad,
		RecomCom
	},
	computed: {
		value: {
			get() {
				return this.$store.state.searchV;
			},
			set(newValue) {
				this.setvalue(newValue);
			}
		},
		...mapState(["isSearch", "loadShow", "recomList", "resflag"])
	},
	methods: {
		...mapMutations({
			setvalue: SET_SEARCH_VALUE,
			setsearch: SET_ISSEARCH,
			setFlag: SET_RESFLAG
		}),
		...mapActions({
			setrecomlist: SET_RECOMLIST,
			setbestnew: SET_BESTNEW
		}),
		focusHandle() {
			this.setsearch(true);
		},
		showHolderHandle(e) {
			this.setvalue("");
		}
	},
	created() {
		window.scrollTo(0, 0);
	},
	beforeDestroy() {
		this.setvalue("");
	},
	watch: {
		value(newValue, oldValue) {
			if (!newValue) {
				this.setrecomlist(null);
				return;
			}
			if (this.isSearch) {
				this.setrecomlist(newValue);
			} else {
				this.setbestnew({
					value: newValue,
					offset: this.offset
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.m-hmsrch {
	background: #fbfcfd;
}
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
		display: none;
		vertical-align: middle;
	}
}

.m-input:after {
	border-color: rgba(0, 0, 0, 0.1);
}

.u-svg-empty.z-show {
	display: inline-block;
}
</style>