<template>
  <div class="about">
    <div class="content">
      <image class="banner-image" src="/static/images/gy_bg.png" />
      <div class="text">
        <div class="title">泱泱华夏上千载，盛衰更迭数百朝。</div>
        <div
          class="desc"
        >五千载日月沉浮，五千年累聚积淀，诗词文化之所以流芳至今，不是它生而不灭，而是有着无数文人墨客投身于诗词的涓涓细流，百川汇集后方化作了诗词文化的汪洋大海。可是如若没有小河的不断滋润，再浩瀚无际的海洋也终有干涸之日。为了传承下中华民族瑰丽的诗词文化，我真切希望，希望大家能和我一起，化作一条诗词的小河，品味诗词之美时也传承下这令人陶醉的诗词古韵。无论你在哪里，我都在诗情画意里等你。</div>
      </div>
      <div class="btns">
        <button :plain="true" class="btn" open-type="feedback">
          <image class="img" src="/static/images/fk.png" />
        </button>
        <button :plain="true" class="btn" open-type="share">
          <image class="img" src="/static/images/fx.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onShareAppMessage(res) {
    return {
      title: "无论你在哪里，我都在诗情画意里等你。",
      path: "pages/home/main",
      imageUrl: "./../../static/images/gy_bg.png",
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    };
  }
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .banner-image {
    width: 100%;
    height: 186px;
  }
  .text {
    height: 220px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row-reverse;
    overflow-x: scroll;
    overflow-y: hidden;
    .title {
      writing-mode: vertical-rl;
      font-size: 18px;
      line-height: 33px;
      letter-spacing: 4px;
    }
    .desc {
      writing-mode: vertical-rl;
      margin-right: 14px;
      font-size: 14px;
      color: #fff;
      line-height: 33px;
      letter-spacing: 4px;
    }
  }
  .btns {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 50px;
    .btn {
      width: 50px;
      height: 50px;
      padding: 0;
      border: none;
      .img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
