<template>
  <div class="details">
    <image class="bg-iamge" :src="bgImage" />
    <div class="bg-color">
      <div class="content">
        <div class="title">{{list.title}}</div>
        <div class="tags">{{list.author}}·{{list.tags}}</div>
        <ul class="paragraphs">
          <li class="paragraph" v-for="(value, key) in list.paragraphs" :key="key">{{value}}</li>
        </ul>
      </div>
      <Reading v-if="false" :text="readingText" />
    </div>
  </div>
</template>

<script>
import Reading from "@/components/reading";
export default {
  data() {
    return {
      id: "",
      isReading: false,
      list: {}
    };
  },
  computed: {
    bgImage() {
      return this.$store.getters.bgImage || "/static/images/bg_img.png";
    },
    readingText() {
      const t = this.list;
      if (JSON.stringify(t) === "{}") return "";
      return t.title + "," + t.author + "," + "趙錢孫李，周吳鄭王。";
    }
  },
  components: {
    Reading
  },
  onLoad(options) {
    this.id = options.id;
  },
  onUnload() {
    this.id = "";
    this.bgImage = "";
    this.list = {};
  },
  mounted() {
    this.$store.dispatch("attempt_bgimage");
    this.getList();
  },
  methods: {
    getList() {
      this.$store.dispatch("attempt_list_type1", this.id).then(data => {
        wx.setNavigationBarTitle({
          title: data.title
        });
        data && (this.list = { ...data });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.details {
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
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
  .play {
    position: fixed;
    top: 20px;
    right: 20px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    padding: 50px 0;
    -webkit-overflow-scrolling: touch;
  }
  .title {
    font-size: 30px;
    line-height: 60px;
    width: 60px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 10px;
    writing-mode: vertical-rl;
  }
  .tags {
    color: #fefefe;
    font-size: 14px;
    line-height: 20px;
    padding-left: 12px;
    text-align: center;
    letter-spacing: 4px;
    writing-mode: vertical-rl;
  }
  .paragraphs {
    writing-mode: vertical-rl;
    .paragraph {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 40px;
      letter-spacing: 4px;
    }
  }
}
</style>
