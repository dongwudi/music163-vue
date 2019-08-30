<template>
  <div class="m-song">
    <div class="m-newsong">
      <transition
        appear
        appear-class="fade"
        appear-to-class="fade-to"
        appear-active-class="fade-active"
      >
        <div class="m-song-bg"></div>
      </transition>
      <div class="m-scroll_wrapper m-song_nor j-songsrl">
        <div class="m-scroll_scroller m-scroll_scroller_vertical">
          <div class="m-song_newfst">
            <div class="m-song-wrap">
              <div class="m-song-disc">
                <div class="m-song-turn">
                  <div class="m-song-rollwrap" :class="{'turn':playing}">
                    <div class="m-song-img">
                      <img class="u-img" alt="song-img" :src="cursong ? cursong.al.picUrl : ''" />
                    </div>
                  </div>
                  <div class="m-song-lgour">
                    <div class="m-song-light"></div>
                  </div>
                </div>
                <span class="m-song-plybtn" v-show="!playing"></span>
              </div>
              <div class="m-song-clickarea" @click="changePlayingState"></div>
            </div>
            <div>
              <div class="m-song-info">
                <h2 class="m-song-h2">
                  <span class="m-song-sname">{{cursong ? cursong.name : ''}}</span>
                  <span class="m-song-gap">-</span>
                  <b class="m-song-autr">{{cursong ? cursong.ar[0].name : ''}}</b>
                </h2>
                <div class="m-song-lrc f-pr">
                  <Scroll
                    class="m-song-scroll"
                    :data="curlyric && curlyric.lines"
                    ref="reflyric"
                    style="height: 67px;"
                  >
                    <div>
                      <div class="m-song-iner" v-if="curlyric">
                        <p
                          ref="lyr"
                          class="m-song-lritem j-lritem"
                          :class="currentLineNum === i ?'cur': ''"
                          v-for="(item,i) in curlyric.lines"
                          :key="i"
                        >{{item.txt}}</p>
                      </div>
                    </div>
                  </Scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audio"
      :src="url"
      @canplaythrough="startplay"
      @play="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import Scroll from "@/components/Scroll";
import Lyric from "lyric-parser";
import { songDetail, wordsDetail, RES_OK } from "@/axios/api";
import { mapState, mapMutations } from "vuex";
import { SET_PLAYING } from "../store/mutation-types";
export default {
  data() {
    return {
      id: this.$route.query.id,
      url: null,
      cursong: null,
      curlyric: null,
      currentLineNum: 0
    };
  },
  created() {
    this.url = `https://music.163.com/song/media/outer/url?id=${this.id}.mp3`;
    songDetail(this.id).then(res => {
      if (res.code === RES_OK) {
        document.getElementsByTagName("title")[0].innerHTML = res.songs[0].name;
        this.cursong = res.songs[0];
      }
    });
    wordsDetail(this.id).then(res => {
      if (res.code === RES_OK) {
        let lyric = res.lrc.lyric;
        this.curlyric = new Lyric(lyric, this.handlelyric);
        if (this.playing) {
          this.curlyric.play();
        }
      }
    });
  },
  methods: {
    ...mapMutations({
      setPlaying: SET_PLAYING
    }),
    handlelyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 1) {
        let lineEl = this.$refs.lyr[lineNum - 1];
        if (lineEl) {
          this.$refs.reflyric.scrollToElement(lineEl, 1000);
        }
      } else {
        this.$refs.reflyric.scrollTo(0, 0, 1000);
      }
    },
    startplay() {
      this.setPlaying(true);
      this.$refs.audio.play();
      if (this.curlyric) {
        this.curlyric.play();
      }
    },
    changePlayingState() {
      this.setPlaying(!this.playing);
      this.$nextTick(() => {
        if (this.playing) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
        this.curlyric.togglePlay();
      });
    },
    ready() {
      console.log("play");
    },
    error() {},
    updateTime() {
      console.log("updating");
    },
    end() {}
  },
  computed: {
    ...mapState(["playing"])
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.m-song {
  .m-newsong {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 320px;
    overflow: hidden;
  }
  .m-song-bg {
    &.fade {
      opacity: 0;
    }
    &.fade-to {
      opacity: 0.5;
    }
    &.fade-active {
      transition: all 0.4s ease-in;
    }
    background-image: url("../assets/blur.jpg");
    opacity: 1;
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-transform-origin: center top;
    -ms-transform-origin: center top;
    transform-origin: center top;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    -webkit-transition: opacity 0.3s linear;
    transition: opacity 0.3s linear;
    z-index: 1;
    &:before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .m-scroll_wrapper {
    overflow: hidden;
    height: auto;
  }
  .m-scroll_scroller {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
  }
  .m-scroll_scroller_vertical {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    width: 100%;
  }
  .m-song_nor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow: hidden;
    z-index: 21;
  }
  .m-song_newfst {
    position: relative;
    padding-bottom: 12px;
    box-sizing: border-box;
  }
  .m-song-wrap {
    padding-top: 63px;
  }
  .m-song-disc {
    position: relative;
    width: 248px;
    height: 248px;
    margin: 0 auto;
    &:after {
      content: " ";
      position: absolute;
      top: -63px;
      left: 107px;
      z-index: 5;
      width: 84px;
      height: 122px;
      background: url("../assets/needle.png") no-repeat;
      background-size: contain;
    }
  }
  .m-song-turn {
    width: 100%;
    height: 100%;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 2;
      background: url("../assets/disc.png") no-repeat;
      background-size: contain;
    }
  }
  .m-song-rollwrap {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin: -75px 0 0 -75px;
    &.turn {
      animation: turn 5s linear infinite;
    }
  }
  .m-song-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background: url("../assets/disc_default.png") no-repeat;
    background-size: contain;
  }
  .m-song-lgour,
  .m-song-light {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
  }
  .m-song-light {
    background: url("../assets/disc_light.png") no-repeat;
    background-size: contain;
  }
  .m-song-plybtn {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10;
    background: url("../assets/play_.png") 0 0 no-repeat;
    background-size: contain;
    &::after {
      content: "";
      display: block;
      position: absolute;
    }
  }
  .m-song-clickarea {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 52px;
    z-index: 10;
  }
  .m-song-info {
    padding: 0 35px;
    margin-top: 25px;
  }
  .m-song-h2 {
    text-align: center;
    font-size: 15px;
    line-height: 1.1;
    color: #fefefe;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .m-song-gap {
    margin: 0 4px;
  }
  .m-song-autr {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.6);
  }
  .m-song-lrc {
    position: relative;
    margin-top: 14px;
  }
  .m-song-lremp,
  .m-song-scroll {
    text-align: center;
    color: hsla(0, 0%, 100%, 0.6);
  }
  .m-song-scroll {
    line-height: 1.5;
    font-size: 13px;
    height: 72px;
    overflow: hidden;
  }
  .m-song-scroll {
    line-height: 1.5;
    font-size: 13px;
    height: 72px;
    overflow: hidden;
  }
  .m-song-iner {
    -webkit-transition: -webkit-transform 0.3s ease-out;
    transition: -webkit-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
  }
  .m-song-lritem {
    padding-bottom: 5px;
    &.cur {
      color: #c1d83e;
    }
  }
}

@keyframes turn {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (min-width: 360px) {
  .m-song {
    .m-song-wrap {
      padding-top: 70px;
    }
    .m-song-disc {
      width: 296px;
      height: 296px;
    }
    .m-song-turn:before {
      background-image: url("../assets/disc-ip6.png");
    }
    .m-song-disc:after {
      width: 96px;
      height: 137px;
      top: -70px;
      left: 133px;
      background-image: url("../assets/needle-ip6.png");
    }
    .m-song-rollwrap {
      width: 184px;
      height: 184px;
      margin: -92px 0 0 -92px;
    }
    .m-song-light {
      background-image: url("../assets/disc_light-ip6.png");
    }
    .m-song-plybtn {
      width: 56px;
      height: 56px;
    }
    .m-song-h2 {
      font-size: 18px;
    }
    .m-song-autr,
    .m-song-pure {
      font-size: 16px;
    }
    .m-song-scroll {
      font-size: 16px;
    }
  }
}
</style>