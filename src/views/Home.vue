<template>
	<div class="m-home">
		<nav class="u-tab mrc-tab f-bd f-bd-btm f-bd f-bd-btm">
			<router-link class="tabtitle" to="/remd">
				<div class="tabtxt">
					<span class="tt">
						<em class="tt_word">推荐音乐</em>
					</span>
				</div>
			</router-link>
			<router-link class="tabtitle" to="/hot">
				<div class="tabtxt">
					<span class="tt">
						<em class="tt_word">热歌榜</em>
					</span>
				</div>
			</router-link>
			<router-link class="tabtitle" to="/search">
				<div class="tabtxt">
					<span class="tt">
						<em class="tt_word">搜索</em>
					</span>
				</div>
			</router-link>
		</nav>
		<div class="m-tabarea m-tabarea-index">
			<div class="m-tabct">
				<div class="tabctitem">
					<transition name="slide-fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.3s ease;
}
.slide-fade-enter {
	transform: translateX(-50px);
	opacity: 0;
}
.slide-fade-leave-to {
	transform: translateX(100px);
	opacity: 0;
}
@mixin mu_tab {
	display: -webkit-flex;
	/* display: flex; */
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-align-items: center;
	align-items: center;
	width: 100%;
	height: 40px;
	background: #fff;
}
#j-app {
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: border-box;
}
.root {
	position: relative;
	background-color: #fcfcfd;
	height: 100%;
}
.m-tabarea {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	-webkit-user-select: none;
	position: fixed;
	width: 100%;
	top: 40px;
	bottom: 0;
}
.m-home {
	.u-tab {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		border-bottom: 1px solid #eee;
	}
}

.u-tab,
.mrc-tab {
	@include mu_tab();
	.tabtitle {
		-webkit-flex: 1;
		flex: 1;
		display: block;
		width: 30%;
		height: 100%;
		text-align: center;
		cursor: pointer;
	}
	.tabtxt {
		position: relative;
		display: inline-block;
		max-width: 100%;
		height: 100%;
		padding: 0 5px;
		box-sizing: border-box;
		color: #333;
		font-size: 15px;
		line-height: 40px;
		.tt {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.router-link-active {
		.tabtxt {
			color: #dd001b;
			&::after {
				content: "";
				position: absolute;
				left: 0;
				bottom: -1px;
				z-index: 3;
				width: 100%;
				height: 4px;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				background: #dd001b;
			}
		}
	}
}

.m-tabarea .m-tabct {
	display: block;
}

.m-tabarea .m-tabct,
.m-tabarea .m-tabct .tabctitem {
	width: 100%;
	height: 100%;
}
</style>
