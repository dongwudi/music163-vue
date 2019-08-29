<template>
  <div class="hotop">
    <div class="hotopct">
      <div class="u-hmsprt hoticon"></div>
      <div class="hottime">更新日期：{{updateTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hottop",
  props: {
    time: {
      type: Number,
      default: 1566436104305
    }
  },
  computed: {
    updateTime() {
      let time = new Date(this.time).toLocaleDateString().split("/");
      let month = time[1] < 10 ? `0${time[1]}` : time[1];
      let day = time[2] < 10 ? `0${time[2]}` : time[2];
      return `${month}月${day}日`;
    }
  }
};
</script>

<style lang="scss" scoped>
.hotop {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url("../assets/hot_music_bg_2x.jpg") no-repeat;
  background-size: contain;
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .hottime {
    margin-top: 10px;
    color: hsla(0, 0%, 100%, 0.8);
    font-size: 12px;
    -webkit-transform: scale(0.91);
    -ms-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
  }
}
.hotopct {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  padding-left: 20px;
  box-sizing: border-box;
}

.u-hmsprt {
  background: url("../assets/index_icon_2x.png") no-repeat;
  background-size: 166px 97px;
}

.hoticon {
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
}
</style>