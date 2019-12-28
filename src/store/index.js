import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import {
  getRandomImage,
  getPoemList,
  getPoemDetails,
  getPoemSubDetails,
  getDirectory
} from "@utils/db";
import Queue from "@utils/queue";
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const state = {
  bgImage: "",
  poem_list: [],
  list_type1: new Queue(10),
  list_type2: new Queue(10),
  list_type3: new Queue(10)
};
const getters = {
  bgImage: state => state.bgImage
};
const actions = {
  attempt_bgimage({
    commit
  }) {
    let curTick = Date.parse(new Date())
    let lastTick = wx.getStorageSync("refreshTick") || 0
    if (curTick - lastTick < 10 * 60 * 1000) {
      const bg = wx.getStorageSync("bgImage")
      if (bg) {
        commit('set_bgimage', bg)
        return
      }
    }
    getRandomImage()
      .then(data => {
        let img = data.fileList[0].tempFileURL;
        commit('set_bgimage', img)
        wx.setStorageSync("bgImage", img)
        wx.setStorageSync("refreshTick", curTick)
      })
      .catch(err => {
        console.log("TCL: getBackgroundImage err", err);
      });
  },
  attempt_poem_list({
    commit,
    state
  }) {
    let curTick = Date.parse(new Date())
    let lastTick = wx.getStorageSync("poemTick") || 0
    if (curTick - lastTick < 5 * 60 * 1000) {
      if (state.poem_list.length > 0) {
        return Promise.resolve(state.poem_list)
      }
    }
    wx.showLoading({
      title: "加载中"
    });
    return getPoemList().then(data => {
      wx.hideLoading();
      commit("set_poem_list", data)
      return Promise.resolve(data)
    });
  },
  attempt_list_type1({
    commit,
    state
  }, _id) {
    let hasIndex = state.list_type1.has(_id)
    if (hasIndex !== undefined) {
      return Promise.resolve(state.list_type1.queue(hasIndex))
    }
    wx.showLoading({
      title: "加载中"
    });
    return getPoemDetails(_id).then(data => {
      wx.hideLoading();
      const _list = data[0];
      commit("set_list_type1", _list)
      return Promise.resolve(_list)
    });
  },
  attempt_list_type2({
    commit,
    state
  }, obj) {
    if (!obj._contentId) obj._contentId = ""
    let hasIndex = state.list_type2.has(obj._id + obj._contentId)
    if (hasIndex !== undefined) {
      return Promise.resolve(state.list_type2.queue(hasIndex))
    }
    wx.showLoading({
      title: "加载中"
    });
    return getPoemSubDetails(obj._id, obj._contentId)
      .then(data => {
        wx.hideLoading();
        let _poemlist, title, _id;
        if (data.list) {
          let _list = data.list[0];
          _poemlist = _list.content[0].content;
          _id = _list._id
          title = _poemlist.type || _poemlist.title;
        } else {
          let _list = data.data[0]
          _poemlist = _list.section;
          _id = _list._id
          title = _list.title;
        }
        commit("set_list_type2", {
          _id,
          _poemlist,
          title
        })
        return Promise.resolve({
          _id,
          _poemlist,
          title
        })
      });
  },
  attempt_list_type3({
    commit,
    state
  }, _id) {
    let hasIndex = state.list_type3.has(_id)
    if (hasIndex !== undefined) {
      return Promise.resolve(state.list_type3.queue(hasIndex))
    }
    wx.showLoading({
      title: "加载中"
    });
    return getDirectory(_id).then(data => {
      wx.hideLoading();
      const _list = data[0];
      commit("set_list_type3", _list)
      return Promise.resolve(_list)
    });
  },
}
const mutations = {
  set_bgimage(state, img) {
    state.bgImage = img
  },
  set_poem_list(state, list) {
    state.poem_list = list
  },
  set_list_type1(state, list) {
    state.list_type1.push(list)
  },
  set_list_type2(state, list) {
    state.list_type2.push(list)
  },
  set_list_type3(state, list) {
    state.list_type3.push(list)
  }
}


export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
