<template>
  <div class="directory">
    <image class="bg-image" src="/static/images/bg_img.png" />
    <div class="bg-color">
      <div class="content">
        <div class="title">{{list.title}}</div>
        <div class="tags" v-if="list.author">{{list.author}}</div>
        <ul class="paragraphs">
          <li
            class="paragraph"
            v-for="(value, key) in list.content"
            :key="key"
            @click="onSubDetails(key)"
          >{{value.title || value.type || value.chapter}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // <div v-if="list.abstract" class="abstract">{{list.abstract}}</div>
  //       <Reading v-if="false" :text="readingText" />
  data() {
    return {
      id: "",
      list: {}
    };
  },
  onLoad(options) {
    this.id = options.id;
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
      this.$store.dispatch("attempt_list_type3", this.id).then(data => {
        wx.setNavigationBarTitle({
          title: data.title
        });
        data && (this.list = { ...data });
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg-image {
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
  .abstract {
    color: #fefefe;
    font-size: 24px;
    line-height: 36px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 50px 0;
    -webkit-overflow-scrolling: touch;
    .title {
      width: 60px;
      font-size: 28px;
      font-weight: bold;
      line-height: 60px;
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
        font-size: 24px;
        line-height: 50px;
        letter-spacing: 8px;
        &::before {
          content: "【";
        }
        &::after {
          content: "】";
        }
      }
    }
  }
}
</style>
