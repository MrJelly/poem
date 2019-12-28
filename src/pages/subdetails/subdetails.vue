<template>
  <div class="subdetails">
    <image class="bg-iamge" :src="bgImage" />
    <div class="bg-color">
      <Swiper :list="list" />
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper";
export default {
  data() {
    return {
      id: "",
      contentId: "",
      list: {}
    };
  },
  computed: {
    bgImage() {
      return this.$store.getters.bgImage || "/static/images/bg_img.png";
    }
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
    this.bgImage = "";
  },
  mounted() {
    this.$store.dispatch("attempt_bgimage");
    this.getList();
  },
  methods: {
    getList() {
      this.$store
        .dispatch("attempt_list_type2", {
          _id: this.id,
          _contentId: this.contentId
        })
        .then(data => {
          wx.setNavigationBarTitle({
            title: data.title
          });
          this.list = { ...data._poemlist };
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
  .bg-iamge {
    width: 100%;
    height: 100%;
  }
  .bg-color {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
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
