<template>
  <div class="m-hmhot">
    <HotTop :time="time" />
    <RemdNewsg :result="_list" :order="true" />
    <Loading v-if="!_list.length" />
  </div>
</template>

<script>
import HotTop from "@/components/HotTop";
import RemdNewsg from "@/components/RemdNewsg";
import Loading from "@/components/Loading";
import { hotList, RES_OK } from "@/axios/api";
export default {
  data() {
    return {
      time: 1566436104305,
      list: []
    };
  },
  components: {
    HotTop,
    RemdNewsg,
    Loading
  },
  created() {
    window.scrollTo(0, 0);
    this._gethot();
  },
  methods: {
    _gethot() {
      hotList().then(res => {
        this.list = res.playlist.tracks;
        this.time = res.playlist.updateTime;
      });
    }
  },
  computed: {
    _list() {
      let list = this.list;
      return list.map(item => {
        let sginfo =
          item.ar.map(ari => ari.name).join(" / ") + "-" + item.al.name;
        return Object.assign({}, item, {
          sginfo: sginfo
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>