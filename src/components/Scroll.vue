<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
    },
    enable() {
      this.bs && this.bs.enable();
    },
    disable() {
      this.bs && this.bs.disable();
    },
    refresh() {
      this.bs && this.bs.refresh();
    }
  },
  watch: {
    data() {
      console.log(this.data)
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>