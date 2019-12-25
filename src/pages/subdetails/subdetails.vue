<template>
  <div class="subdetails">
    <h3>{{list.title}}</h3>
    <p>{{list.author}}·{{list.tags}}</p>
    <ul>
      <li v-for="(value, key) in list.paragraphs" :key="key">{{value}}</li>
    </ul>
  </div>
</template>

<script>
import { getPoemSubDetails } from "@utils/db";
export default {
  data() {
    return {
      id: "",
      contentId: "",
      list: {}
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.contentId = options.contentId;
    console.log("TCL: onLoad -> id", this.id);
  },
  onUnload() {
    this.id = "";
    this.contentId = "";
    this.list = {};
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getPoemSubDetails(this.id, this.contentId)
        .then(data => {
          const _list = data.list[0].content[0];
          console.log("TCL: getPoemSubDetails _list", _list);
          _list && (this.list = { ..._list });
        })
        .catch(err => {
          console.log("TCL: getList -> err", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.subdetails {
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
