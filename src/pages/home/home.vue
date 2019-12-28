<template>
  <div class="home">
    <image class="bg-image" src="/static/images/bg_img.png" />
    <div class="poem-list">
      <div class="grid-item" v-for="(value,key) in poemList" :key="key">
        <div class="item" @click="onDetails(value._id)">
          <image class="bg" :src="'/static/images/bg'+value.bgimage+'.png'" />
          <div class="text">{{value.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPoemList, judgeToPage } from "@utils/db";
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
      this.$store.dispatch("attempt_poem_list").then(data => {
        this.poemList = [...data];
      });
    },

    onDetails(_id) {
      wx.showLoading({
        title: "加载中"
      });
      judgeToPage(_id)
        .then(data => {
          wx.hideLoading();
          const judgeId = data.list[0].judgeId;
          console.log("TCL: onDetails -> judgeId", judgeId);
          let url = "";
          if (judgeId == 1) {
            url = "../details/main?id=" + _id;
          } else if (judgeId == 2) {
            url = "../subdetails/main?id=" + _id;
          } else if (judgeId == 3) {
            url = "../directory/main?id=" + _id;
          }
          if (url) {
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
  width: 100%;
  height: 100%;
  .bg-image {
    width: 100%;
    height: 100%;
  }
  .poem-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    padding-left: 18px;
    padding-bottom: 18px;
    .grid-item {
      box-sizing: border-box;
      flex-basis: 50%;
      padding-right: 18px;
      margin-top: 18px;
    }
    .item {
      position: relative;
      height: 230px;
      width: 100%;
      box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.5);
      .bg {
        width: 100%;
        height: 100%;
      }
      .text {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 4px;
        padding-bottom: 4px;
        writing-mode: vertical-rl;
        font-family: "myfont";
        font-size: 35px;
        letter-spacing: -6px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
