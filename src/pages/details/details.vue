<template>
  <div class="details" :style="{backgroundImage:'url('+bgImage+')'}">
    <h3>{{list.title}}</h3>
    <p>{{list.author}}·{{list.tags}}</p>
    <ul>
      <li v-for="(value, key) in list.paragraphs" :key="key">{{value}}</li>
    </ul>
  </div>
</template>

<script>
import { getPoemDetails, getRandomImage } from "@utils/db";
export default {
  data() {
    return {
      bgImage:"",
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
    this.getBackgroundImage();
    this.getList();
  },
  methods: {
    getBackgroundImage() {
      getRandomImage()
        .then(data => {
          this.bgImage = data.fileList[0].tempFileURL
        })
        .catch(err => {
          console.log("TCL: getBackgroundImage err", err);
        });
    },
    getList() {
      getPoemDetails(this.id).then(data => {
        const _list = data[0];
        console.log("TCL: getData -> _list", _list);
        _list && (this.list = { ..._list });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  background-color: #999;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
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
      line-height: 22px;
    }
  }
}
</style>
