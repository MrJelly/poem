
const plugin = requirePlugin("WechatSI")
// 获取**全局唯一**的语音识别管理器**recordRecoManager**
// const manager = plugin.getRecordRecognitionManager()
import { getRandomImage } from "@utils/db";
export default {
  methods: {
    Random(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    getBackgroundImage() {
      let curTick = Date.now()
      let lastTick = wx.getStorageSync("refreshTick") || 0
      if (curTick - lastTick > 10 * 60) {
        const bg = wx.getStorageSync("bgImage")
        if (bg) {
          this.bgImage = bg
          return
        }
      }
      getRandomImage()
        .then(data => {
          const img = data.fileList[0].tempFileURL;
          this.bgImage = img
          wx.setStorageSync("bgImage", img)
          wx.setStorageSync("refreshTick", curTick)
        })
        .catch(err => {
          console.log("TCL: getBackgroundImage err", err);
        });

    },
    onReading(content = "您好，我的祖国，我为您自豪！") {
      const innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.loop = false;
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content,
        success: function (res) {
          console.log("succ tts", res.filename)
          if (res.retcode === 0) {
            innerAudioContext.src = res.filename; //后端返回的mp3文件地址
            innerAudioContext.onPlay(() => {
              console.log('开始播放啦');
            });
          }
        },
        fail: function (res) {
          console.log("fail tts", res)
        }
      })
    }
  },
}
