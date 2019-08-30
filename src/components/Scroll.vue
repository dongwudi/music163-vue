<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  data() {
    return {
      bs: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    poll_up: {
      type: Boolean,
      default: false
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
        scrollY: true,
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: true
      });
      //上拉到底部
      if (this.poll_up) {
        this.bs.on("scrollEnd", () => {
          if (this.bs.y <= this.bs.maxScrollY + 50) {
            this.$emit("pollup");
          }
        });
      }
    },
    enable() {
      this.bs && this.bs.enable();
    },
    disable() {
      this.bs && this.bs.disable();
    },
    refresh() {
      this.bs && this.bs.refresh();
    },
    scrollTo(x, y, time = 1000) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    scrollToElement(el, time) {
      this.bs && this.bs.scrollToElement(el, time);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>