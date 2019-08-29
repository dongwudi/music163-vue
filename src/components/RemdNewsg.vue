<template>
	<div class="remd_newsg">
		<div class="m-sglst">
			<router-link :to="`/song?id=${song.id}`" v-for="song in result" :key="song.id" class="m-sgitem">
				<div class="sgfr f-bd f-bd-btm">
					<div class="sgchfl">
						<div class="f-thide sgtl">{{song.name}}</div>
						<div class="f-thide sginfo">
							<i class="u-hmsprt sghot"></i>
							{{song.infoart}} - {{song.song.album.name}}
						</div>
					</div>
					<div class="sgchfr">
						<span class="u-hmsprt sgchply"></span>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		result: {
			type: Array,
			default: function() {
				return null
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.remd_newsg {
	position: relative;
	min-height: 20px;
}

.m-sgitem {
	padding-left: 10px;
}

.m-sgitem,
.m-sgitem .sgfl {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}

.m-sgitem .sgfr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	position: relative;
}

.m-sgitem .sgchfl,
.m-sgitem .sgfr {
	-webkit-box-flex: 1;
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}

.m-sgitem .sgchfl {
	padding: 6px 0;
	width: 0;
}

.m-sgitem .sgtl {
	font-size: 17px;
}

.m-sgitem .sginfo {
	font-size: 12px;
	color: #888;
}
.m-sgitem .sgchply {
	display: inline-block;
	width: 22px;
	height: 22px;
	background-position: -24px 0;
}
.m-sgitem .sgchfr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 0 10px;
}
</style>