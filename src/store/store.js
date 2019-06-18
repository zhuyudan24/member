import Vuex from "vuex";
import Vue from "vue";
import * as types from "./types";
import url from "../components/axios/url";
import { doFetch } from "../components/axios/api";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    title: "",
    isShowFoot: true,
    slideShow: false,
    forzenList: false,
    storeImageUrl: ""
  },
  mutations: {
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    isShowFoot(state, data) {
      state.showfoot = data;
    },
    ["mutations-slide"](state, data) {
      state.slideShow = data;
    },
    ["forzen-list"](state, visible) {
      state.forzenList = visible;
    },
    ["saveStoreImage"](state, url) {
      state.storeImageUrl = url;
    }
  },
  actions: {
    getStorePicture({ commit }) {
      doFetch(url.getStorePicture).then(res => {
        let ret;
        if (res.data.errorCode === 0) {
          ret = res.data.result;
          commit("saveStoreImage", ret.enterpriseInfo.enterpriseUrl);
        }
      });
    }
  }
});
