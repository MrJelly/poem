<template>
  <swiper
    class="swiper"
    :indicator-dots="false"
    easing-function="easeOutCubic"
    :circular="true"
    :vertical="true"
    duration="800"
  >
    <block v-for="(item, index) in list" :index="index" :key="index">
      <swiper-item class="swiper-item">
        <h3 class="chapter">{{item.chapter}}</h3>
        <p class="author">{{item.author}}</p>
        <ul class="paragraphs">
          <li class="paragraph" v-for="(v,k) in item.paragraphs" :key="k">{{v}}</li>
        </ul>
      </swiper-item>
    </block>
  </swiper>
</template>

<script>
export default {
  props: {
    list: {
      type: Array || Object,
      default: []
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  box-sizing: border-box;
  padding:15px 0;
  box-sizing: border-box;
}
.chapter {
  font-size: 30px;
  font-weight: bold;
  line-height: 70px;
  text-align: center;
  letter-spacing: 10px;
  writing-mode: vertical-rl;
}
.author {
  color: #eee;
  font-size: 14px;
  line-height: 22px;
  padding-left: 6px;
  padding-right: 6px;
  writing-mode: vertical-rl;
}
.paragraphs {
  letter-spacing: 4px;
  writing-mode: vertical-rl;
}
.paragraph {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 40px;
}
</style>
