<template>
  <div class="detail">
    <h3>{{list.title}}</h3>
    <p>{{list.author}}·{{list.tags}}</p>
    <ul>
      <li v-for="(value, key) in list.paragraphs" :key="key">{{value}}</li>
    </ul>
  </div>
</template>

<script>
import { getPoemDetail } from "@utils/db";
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
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getPoemDetail(this.id).then(data => {
        const l = data[0];
        console.log("TCL: getData -> l", l);
        l && (this.list = { ...l });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
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
