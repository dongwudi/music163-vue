<template>
  <div class="m-homeremd">
    <BannerCom />
    <RemdTl>推荐歌单</RemdTl>
    <RemdSongs />
    <RemdTl>最新音乐</RemdTl>
    <RemdNewsg :result="_result" />
  </div>
</template>

<script>
import { remdNewSongs, RES_OK } from "@/axios/api";

import RemdTl from "@/components/RemdTl";
import RemdSongs from "@/components/RemdSongs";
import RemdNewsg from "@/components/RemdNewsg";
import BannerCom from "@/components/BannerCom";
import { setTimeout } from "timers";

export default {
  components: {
    RemdTl,
    RemdSongs,
    RemdNewsg,
    BannerCom
  },
  data() {
    return {
      result: []
    };
  },
  created() {
    window.scrollTo(0, 0);
    this._getSongs();
  },
  mounted() {
    setTimeout(() => {
      new BScroll(this.$refs.s, {});
    }, 20);
  },
  methods: {
    _getSongs() {
      remdNewSongs().then(res => {
        if (res.code === RES_OK) {
          this.result = res.result;
        }
      });
    }
  },
  computed: {
    _result() {
      let result = this.result;
      return result.map(item => {
        return Object.assign({}, item, {
          infoart: item.song.artists.map((art, i) => art.name).join(" / ")
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.m-homeremd {
  padding-top: 0px;
}
</style>
