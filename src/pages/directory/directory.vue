<template>
  <div class="directory">
    <div class="bg-color">
      <div class="content">
        <h3>{{list.title}}</h3>
        <p v-if="list.author">{{list.author}}</p>
        <ul>
          <li
            v-for="(value, key) in list.content"
            :key="key"
            @click="onSubDetails(key)"
          >{{value.title || value.type || value.chapter}}</li>
        </ul>
      </div>
      <p v-if="list.abstract" class="abstract">{{list.abstract}}</p>
      <Reading v-if="false" :text="readingText" />
    </div>
  </div>
</template>

<script>
import { getDirectory, getRandomImage } from "@utils/db";
export default {
  data() {
    return {
      id: "",
      bgImage: "",
      list: {}
    };
  },
  onLoad(options) {
    this.id = options.id;
    console.log("TCL: onLoad -> id", this.id);
  },
  onUnload() {
    this.id = "";
    this.list = {};
  },
  mounted() {
    // this.getBackgroundImage();
    this.getContent();
  },
  methods: {
    getContent() {
      getDirectory(this.id).then(data => {
        const _list = data[0];
        console.log("TCL: getContent -> _list", _list);
        _list && (this.list = { ..._list });
      });
    },
    onSubDetails(contentId) {
      const url =
        "../subdetails/main?id=" + this.id + "&contentId=" + contentId;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="less" scoped>
.directory {
  position: relative;
  background: url(https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg_img%403x.png?sign=75dacdc42dd7b6b6350570b8c7392652&t=1577347347)
    center center no-repeat fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 15px;
  .bg-color {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
  .abstract {
    color: #fefefe;
    font-size: 24px;
    line-height: 36px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    padding: 50px 0;
    -webkit-overflow-scrolling: touch;
    h3 {
      font-size: 28px;
      font-weight: bold;
      line-height: 60px;
      width: 60px;
      text-align: center;
      letter-spacing: 4px;
      writing-mode: vertical-rl;
    }
    p {
      color: #fefefe;
      font-size: 16px;
      line-height: 22px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      letter-spacing: 4px;
      writing-mode: vertical-rl;
    }
    ul {
      writing-mode: vertical-rl;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        line-height: 40px;
        letter-spacing: 4px;
        width: 40px;
      }
    }
  }
}
</style>
