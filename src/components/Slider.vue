<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,i) in dots"
        :key="i.toString()"
        :class="{'active' : currentIndex === i ? true : false}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
BScroll.use(Slide);
import { addClass } from "@/util";
export default {
  data() {
    return {
      slide: null,
      dots: [],
      currentIndex: 0,
      playtimer: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  beforeDestroy() {
    clearTimeout(this.playtimer);
    this.slider.destroy();
  },
  mounted() {
    setTimeout(() => {
      this._initSliderWidth();
      this._initDots();
      this._initSlider();
    }, 20);

    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._initSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    _initSliderWidth(isResize) {
      this.chidlren = this.$refs.sliderGroup.children;
      let wid = this.$refs.slider.clientWidth;
      let width = 0;
      for (let i = 0; i < this.chidlren.length; i++) {
        let child = this.chidlren[i];
        child.style.width = wid + "px";
        width += wid;
        addClass(child, "slider-item");
      }
      if (this.loop ** !isResize) {
        width += wid * 2;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = Array(this.$refs.sliderGroup.children.length);
    },
    _initSlider() {
      clearTimeout(this.playtimer);
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: this.loop,
          threshold: 100,
          probeType: 2
          // disableSetWidth: true //自动轮播如果不自己设置，resize时会出现兼容问题
        },
        click: true
      });

      this.slider.on("slideWillChange", page => {
        this.currentIndex = page.pageX;
      });

      this.slider.on("beforeScrollStart", () => {
        clearTimeout(this.playtimer);
      });
      this.slider.on("scrollEnd", () => {
        this._autoGoNext();
      });

      if (this.loop) {
        this._autoGoNext();
      }
    },
    _autoGoNext() {
      clearTimeout(this.playtimer);
      this.playtimer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #000;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: rgb(201, 198, 39);
      }
    }
  }
}
</style>