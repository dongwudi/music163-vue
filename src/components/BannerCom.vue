<template>
  <div class="slider-wrapper" v-if="banners.length">
    <Slider>
      <div v-for="item in banners" :key="item.bannerId">
        <a :href="item.url">
          <img :src="item.pic" alt />
        </a>
      </div>
    </Slider>
  </div>
</template>

<script>
import Slider from "@/components/Slider";
import { bannerList, RES_OK } from "@/axios/api";
export default {
  data() {
    return {
      banners: []
    };
  },
  created() {
    this._getbanenrs();
  },
  methods: {
    _getbanenrs() {
      bannerList().then(res => {
        if (res.code === RES_OK) {
          this.banners = res.banners;
        }
      });
    }
  },
  components: {
    Slider
  }
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>