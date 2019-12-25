<template>
  <div class="home">
    <ul class="poem-list">
      <li
        @click="onDetails(value._id)"
        class="item"
        v-for="(value,key) in poemList"
        :key="key"
      >{{value.title}}</li>
    </ul>
  </div>
</template>

<script>
import { getPoemList, judgeToPage } from "@utils/db";
console.log("TCL: getPoemList", getPoemList);
export default {
  data() {
    return {
      poemList: []
    };
  },
  mounted() {
    this.getPoemList();
  },
  methods: {
    getPoemList() {
      wx.showLoading({
        title: "加载中"
      });
      getPoemList().then(data => {
        console.log("TCL: getPoemList -> data", data);
        wx.hideLoading();
        this.poemList = data;
      });
    },

    onDetails(_id) {
      wx.showLoading({
        title: "加载中"
      });
      judgeToPage(_id)
        .then(data => {
          wx.hideLoading();
          if (data == 0) {
            const url = "../directory/main?id=" + _id
            wx.navigateTo({ url });
          } else {
            const url = "../details/main?id=" + _id
            wx.navigateTo({ url });
          }
        })
        .catch(err => {
          console.log("TCL: onDetails -> err", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  background: #f9e4ed;
  height: 100vh;
  .poem-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      border-bottom: 1px solid #f8b9e4;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
