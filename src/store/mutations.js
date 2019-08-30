import * as types from "./mutation-types";

const mutations = {
  [types.SET_PLAYING](state, playing) {
    state.playing = playing;
  }
};

export default mutations;
