<template>
  <swiper
    class="swiper"
    :indicator-dots="false"
    easing-function="easeInCubic"
    :circular="true"
    :vertical="true"
    duration="1000"
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
  flex-direction: row-reverse;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  box-sizing: border-box;
  padding:15px 0;
}
.chapter {
  font-size: 26px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  letter-spacing: 4px;
  writing-mode: vertical-rl;
}
.author {
  color: #999;
  font-size: 14px;
  line-height: 22px;
  padding-left: 6px;
  padding-right: 6px;
  writing-mode: vertical-rl;
}
.paragraphs {
  letter-spacing: 4px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}
.paragraph {
  writing-mode: vertical-rl;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 4px;
  line-height: 60px;
}
</style>
