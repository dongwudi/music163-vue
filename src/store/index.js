import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";

import {
  SET_SEARCH_VALUE,
  SET_ISSEARCH,
  SET_RECOMLIST,
  SET_BESTMATCH,
  SET_LOADSHOW,
  SET_NEWSLIST,
  SET_BESTNEW,
  SET_RESFLAG,
  SET_OFFSET
} from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchV: "",
    isSearch: true,
    loadShow: false,
    recomList: null,
    bestMatch: null,
    ngList: null,
    resflag: true
  },
  getters: {
    bestMatch: ({ bestMatch }) => {
      if (!bestMatch) {
        return [];
      }
      let len = bestMatch.orders.length;
      if (!len) {
        return [];
      }
      let res = Array.from(len);
      let index = 0;
      while (index < len) {
        let type = bestMatch.orders[index];
        if (type === "video") {
          index++;
          continue;
        }
        res[index] = bestMatch[bestMatch.orders[index]][0];
        res[index].type = type;
        let adar = bestMatch[bestMatch.orders[index]][0].artists;
        res[index].addart = adar ? adar.map(item => item.name).join(" / ") : "";
        switch (type) {
          case "album":
            res[index].tyn = "专辑";
            break;
          case "artist":
            res[index].tyn = "歌手";
            break;
          case "mv":
            res[index].tyn = "MV";
            res[index].cv = bestMatch["video"][0];
            break;
        }
        index++;
      }
      return res;
    },
    ngList: ({ ngList }) => {
      if (!ngList) {
        return [];
      }
      return ngList.map(item => {
        let obj = {};
        obj.id = item.id;
        obj.name = item.name;

        let artists = item.artists;
        let infoart = artists.map((art, i) => art.name).join(" / ");
        obj.infoart = infoart;
        obj.infoname = item.name;
        return obj;
      });
    }
  },
  mutations: {
    [SET_SEARCH_VALUE](state, value) {
      state.searchV = value;
    },
    [SET_ISSEARCH](state, bol) {
      state.isSearch = bol;
    },
    [SET_RECOMLIST](state, value) {
      state.recomList = value;
    },
    [SET_BESTMATCH](state, value) {
      state.bestMatch = value;
    },
    [SET_NEWSLIST](state, value) {
      state.ngList = value;
    },
    [SET_LOADSHOW](state, bol) {
      state.loadShow = bol;
    },
    [SET_RESFLAG](state, bol) {
      state.resflag = bol;
    }
  },
  actions: {
    [SET_RECOMLIST]({ commit }, value) {
      if (!value) {
        commit(SET_RECOMLIST, value);
        return;
      }
      commit(SET_LOADSHOW, true);
      axios
        .get("/api/search/suggest", {
          params: {
            keywords: value,
            type: "mobile"
          }
        })
        .then(data => {
          commit(SET_RECOMLIST, JSON.parse(data).result.allMatch);
          commit(SET_LOADSHOW, false);
        });
    },
    async [SET_BESTNEW]({ commit }, payload) {
      let { value, offset, s = "" } = payload;
      commit(SET_LOADSHOW, true);
      //重置
      commit(SET_BESTMATCH, null);
      commit(SET_NEWSLIST, null);
      await axios
        .get("/api/search/multimatch", {
          params: {
            keywords: value
          }
        })
        .then(data => {
          commit(SET_BESTMATCH, JSON.parse(data).result);
        });

      await axios
        .get("/api/search", {
          params: {
            keywords: value,
            limit: 10,
            offset: offset
          }
        })
        .then(data => {
          commit(SET_NEWSLIST, JSON.parse(data).result.songs);
        });

      commit(SET_LOADSHOW, false);
    }
  }
});
