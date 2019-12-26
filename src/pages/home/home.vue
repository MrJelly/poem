<template>
  <div class="home">
    <div class="poem-list">
      <div class="grid-item" v-for="(value,key) in poemList" :key="key">
        <div
          class="item"
          :style="{backgroundImage:'url('+value.bgImg+')'}"
          @click="onDetails(value._id)"
        >{{value.title}}</div>
      </div>
    </div>
  </div>
</template>



<script>
import { getPoemList, judgeToPage } from "@utils/db";
export default {
  data() {
    return {
      bgList: [
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg1%403x.png?sign=a048b9512bf35d38978de5825d45d9b9&t=1577348712",
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg2%403x.png?sign=c28bbc884d071b8d7f5338181acfbf49&t=1577348742",
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg3%403x.png?sign=7743311cb86f67aeb779100633760761&t=1577348771",
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg4%403x.png?sign=d8a2d6af9f4811a6b60751e9e0165982&t=1577348897",
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg5%403x.png?sign=ca5bfa2e9aa0fc016144ee35e52e591b&t=1577348915",
        "https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg6%403x.png?sign=72fa8534dd3d308da51c69aa0056785c&t=1577348927"
      ],
      poemList: [
        {
          _id: "G2t7vekU40ZYLJ6XkZv3nhQTEO5Tucj1vvnQZwqORuag0641",
          title: "百家姓",
          bgImg:"https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg1%403x.png?sign=a048b9512bf35d38978de5825d45d9b9&t=1577348712"
        },
        {
          _id: "5OSgstHdRcUrSvkopTDFPtH49PHodVSt9pxqh3B9BJPYIjSD",
          title: "弟子規"
        },
        {
          _id: "hESK2tzXaHTSUXmgrcddaaBfYfMCEzRyr8ECsIyxnsoeVZ9q",
          title: "古文觀止"
        },
        {
          _id: "YAjtH2fxecbD0dPJDTmTxZiqTA3ofR1di5pCpV56l6yPfgSl",
          title: "千家詩"
        },
        {
          _id: "zI9i2mFoEWw0wGhqlri4Kt9bpm4IwS1DTA8OqxMYH8yOUXQn",
          title: "千字文"
        },
        {
          _id: "QmROEzVE3uG9dt4iE8HPORKt0mgTsg6QQurMDxsRlHIumq6h",
          title: "三字經"
        },
        {
          _id: "E5idFTR5YbdoZ89GwDq2ZWMhNGXdFQ9DlAWVsP00NUqXVFpY",
          title: "三字經"
        },
        {
          _id: "q7QuaX7aRAyqPiDzwfXOdZNOeNH2OnTVsyGjyyrH0Elsc6W7",
          title: "聲律啓蒙"
        },
        {
          _id: "WD0xKk8mjzk3f9lPVF3b6OnBmqkanPKutbscX0NjUnV6LgCm",
          title: "唐詩三百首"
        },
        {
          _id: "D8Xc6vsChv3mbjVBaSSCwiz2umn7u8KORj2UZeYVkb3hMWLu",
          title: "文字蒙求"
        },
        {
          _id: "i1GWC7F39Mx1qccpUFtCnvMuBOcMQsdJHM1vHposkotgHevL",
          title: "幼學瓊林"
        },
        {
          _id: "cJ6lGZpVJioKol4wSwgNM8h7ucWJ3CLo8CM1nSmmBiVrLjyD",
          title: "增廣賢文"
        },
        {
          _id: "wbr8ZsXjZoetwdZdMHcwvIircJG5P6vslUNMbi1J8H3hoi7Q",
          title: "朱子家訓"
        }
      ]
    };
  },
  mounted() {
    // this.getPoemList();
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
            const url = "../directory/main?id=" + _id;
            wx.navigateTo({ url });
          } else {
            const url = "../details/main?id=" + _id;
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
  height: 100%;
  background-color: #fefefe;
  background: url(https://706f-poemtest-1300983977.tcb.qcloud.la/static/bg_img%403x.png?sign=75dacdc42dd7b6b6350570b8c7392652&t=1577347347)
    center center no-repeat fixed;
  background-size: cover;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .poem-list {
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
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 210px;
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      padding-top: 10px;
      padding-bottom: 10px;
      writing-mode: vertical-rl;
      font-size: 30px;
      letter-spacing: 12px;
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>
