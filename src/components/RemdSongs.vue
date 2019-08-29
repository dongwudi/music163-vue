<template>
	<div class="remd_songs">
		<div class="remd_ul">
			<router-link
				v-for="song in _result"
				:key="song.id"
				:to="`/playlist?id=${song.id}`"
				class="remd_li"
			>
				<div class="remd_img">
					<img v-lazy="song.picUrl" alt class="u-img" />
					<span class="u-earp remd_lnum">{{song.playCount+'万'}}</span>
				</div>
				<p class="remd_text">{{song.name}}</p>
			</router-link>
		</div>
	</div>
</template>

<script>
import { remdSongs, RES_OK } from "@/axios/api";
import { changeCount } from "@/util";
export default {
	data() {
		return {
			result: []
		};
	},
	created() {
		remdSongs().then(res => {
			if (res.code === RES_OK) {
				this.result = res.result;
			}
		});
	},
	computed: {
		_result() {
			let res = this.result;
			return res.map(item => {
				return Object.assign({}, item, {
					playCount: changeCount(item.playCount)
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.remd_songs {
	position: relative;
}
.remd_ul {
	&::after {
		display: block;
		visibility: hidden;
		clear: both;
		height: 0;
		overflow: hidden;
		content: ".";
	}
}
.remd_li {
	display: block;
	margin-bottom: 16px;
	float: left;
	width: 33.3%;
	padding-left: 1px;
	padding-right: 1px;
	box-sizing: border-box;
	&:first-child {
		padding-left: 0;
		padding-right: 2px;
	}
}
.remd_img {
	position: relative;
	padding-bottom: 100%;
	& > .u-img {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}
	&::after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 20px;
		z-index: 2;
		background-image: -webkit-linear-gradient(
			top,
			rgba(0, 0, 0, 0.2),
			transparent
		);
		background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
	}
}
.remd_lnum {
	position: absolute;
	right: 5px;
	top: 2px;
	z-index: 3;
	padding-left: 13px;
	color: #fff;
	font-size: 12px;
	background-position: 0;
	background-repeat: no-repeat;
	background-size: 11px 10px;
	text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
}
.remd_text {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	padding: 6px 2px 0 6px;
	min-height: 30px;
	line-height: 1.2;
	font-size: 13px;
}
</style>