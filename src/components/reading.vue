<template>
  <van-button class="reading" @click="onReading(text)">{{isReading?'暂停':'朗读'}}</van-button>
</template>

<script>
export default {
  data() {
    return {
      isReading: false
    };
  },
  props: {
    text: {
      type: String,
      default: "啊哦"
    }
  }
};
</script>

<style lang="less" scoped>
.reading {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
