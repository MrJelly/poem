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
      poemList: [
        // {
        //   _id: "G2t7vekU40ZYLJ6XkZv3nhQTEO5Tucj1vvnQZwqORuag0641",
        //   title: "百家姓",
        //   bgImg:"https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg1%403x.png?sign=a048b9512bf35d38978de5825d45d9b9&t=1577348712"
        // },
        // {
        //   _id: "5OSgstHdRcUrSvkopTDFPtH49PHodVSt9pxqh3B9BJPYIjSD",
        //   title: "弟子規"
        // },
        // {
        //   _id: "hESK2tzXaHTSUXmgrcddaaBfYfMCEzRyr8ECsIyxnsoeVZ9q",
        //   title: "古文觀止"
        // },
        // {
        //   _id: "YAjtH2fxecbD0dPJDTmTxZiqTA3ofR1di5pCpV56l6yPfgSl",
        //   title: "千家詩"
        // },
        // {
        //   _id: "zI9i2mFoEWw0wGhqlri4Kt9bpm4IwS1DTA8OqxMYH8yOUXQn",
        //   title: "千字文"
        // },
        // {
        //   _id: "QmROEzVE3uG9dt4iE8HPORKt0mgTsg6QQurMDxsRlHIumq6h",
        //   title: "三字經"
        // },
        // {
        //   _id: "E5idFTR5YbdoZ89GwDq2ZWMhNGXdFQ9DlAWVsP00NUqXVFpY",
        //   title: "三字經"
        // },
        // {
        //   _id: "q7QuaX7aRAyqPiDzwfXOdZNOeNH2OnTVsyGjyyrH0Elsc6W7",
        //   title: "聲律啓蒙"
        // },
        // {
        //   _id: "WD0xKk8mjzk3f9lPVF3b6OnBmqkanPKutbscX0NjUnV6LgCm",
        //   title: "唐詩三百首"
        // },
        // {
        //   _id: "D8Xc6vsChv3mbjVBaSSCwiz2umn7u8KORj2UZeYVkb3hMWLu",
        //   title: "文字蒙求"
        // },
        // {
        //   _id: "i1GWC7F39Mx1qccpUFtCnvMuBOcMQsdJHM1vHposkotgHevL",
        //   title: "幼學瓊林"
        // },
        // {
        //   _id: "cJ6lGZpVJioKol4wSwgNM8h7ucWJ3CLo8CM1nSmmBiVrLjyD",
        //   title: "增廣賢文"
        // },
        // {
        //   _id: "wbr8ZsXjZoetwdZdMHcwvIircJG5P6vslUNMbi1J8H3hoi7Q",
        //   title: "朱子家訓"
        // }
      ]
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
