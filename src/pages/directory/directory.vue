<template>
  <div class="directory">
    <h3>{{list.title}}</h3>
    <p v-if="list.author">{{list.author}}</p>
    <p v-if="list.abstract">{{list.abstract}}</p>
    <ul>
      <li
        v-for="(value, key) in list.content"
        :key="key"
        @click="onSubDetails(key)"
      >{{value.title || value.type || value.chapter}}</li>
    </ul>
  </div>
</template>

<script>
import { getDirectory } from "@utils/db";
export default {
  data() {
    return {
      id: "",
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
      const url = "../subdetails/main?id=" + this.id + "&contentId=" + contentId;
      wx.navigateTo({ url });
    }
  }
};
</script>

<style lang="less" scoped>
.directory {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
  }
  p {
    color: #999;
    font-size: 14px;
    line-height: 22px;
  }
  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: 14px;
      line-height: 32px;
    }
  }
}
</style>
