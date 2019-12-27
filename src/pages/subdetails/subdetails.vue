<template>
  <div class="subdetails" :style="{backgroundImage:'url('+bgImage+')'}">
    <div class="bg-color">
      <Swiper :list="list" />
    </div>
  </div>
</template>

<script>
import { getPoemSubDetails } from "@utils/db";
import Swiper from "@/components/swiper";
export default {
  data() {
    return {
      id: "",
      bgImage: "",
      contentId: "",
      list: {}
    };
  },
  components: {
    Swiper
  },
  onLoad(options) {
    this.id = options.id;
    this.contentId = options.contentId;
  },
  onUnload() {
    this.id = "";
    this.contentId = "";
    this.list = {};
  },
  mounted() {
    this.getBackgroundImage();
    this.getList();
  },
  methods: {
    getList() {
      wx.showLoading({
        title: "加载中"
      });
      getPoemSubDetails(this.id, this.contentId)
        .then(data => {
          wx.hideLoading();
          let _poemlist, title;
          if (data.list) {
            let _list = data.list[0].content[0];
            _poemlist = _list.content;
            title = _poemlist.type || _poemlist.title;
          } else {
            let _list = data.data[0];
            _poemlist = _list.section;
            title = _list.title;
          }
          wx.setNavigationBarTitle({
            title
          });
          _poemlist && (this.list = { ..._poemlist });
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
.subdetails {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
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
  .head {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
  }
  .desc {
    color: #999;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
