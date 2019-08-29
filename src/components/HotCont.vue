<template>
	<div class="hotcont">
		<div class="m-sglst">
			<router-link
				:to="`/song?id=${item.id}`"
				class="m-sgitem"
				v-for="(item,i) in coList"
				:key="item.id"
			>
				<div :class="i &lt; 3 ? 'sgfl sgfl-cred' : 'sgfl'">{{ (i &lt; 9) ? `0${i+1}` :i+1 }}</div>
				<div class="sgfr f-bd f-bd-btm">
					<div class="sgchfl">
						<div class="f-thide sgtl">{{item.name}}</div>
						<div class="f-thide sginfo">
							<i class="u-hmsprt sghot"></i>
							{{item.sginfo}}
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
	name: "hotcont",
	props: ["list"],
	computed: {
		coList() {
			let list = this.list;
			if (!list) return null;
			return list.map(item => {
				let sginfo =
					item.ar.map(ari => ari.name).join(" / ") + "-" + item.al.name;
				return {
					id: item.id,
					name: item.name,
					sginfo: sginfo
				};
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.hotcont {
	position: relative;
}
.m-sgitem,
.m-sgitem .sgfl {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
.m-sgitem {
	padding-left: 10px;
}

.m-sgitem .sgfl {
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	width: 40px;
	font-size: 17px;
	color: #999;
	margin-left: -10px;
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
.m-sgitem .sgfr {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	position: relative;
}
.m-sgitem .sgfl-cred {
	color: #df3436;
}
.m-sgitem .sgtl {
	font-size: 17px;
}
.m-sgitem .sginfo {
	font-size: 12px;
	color: #888;
}
.m-sgitem .sghot {
	display: inline-block;
	width: 12px;
	height: 8px;
	margin-right: 4px;
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
.m-sgitem .sgchply {
	display: inline-block;
	width: 22px;
	height: 22px;
	background-position: -24px 0;
}
</style>