
const plugin = requirePlugin("WechatSI")
// 获取**全局唯一**的语音识别管理器**recordRecoManager**
const manager = plugin.getRecordRecognitionManager()

export default {
  methods: {
    Random(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    onReading(content = "您好，我的祖国，我为您自豪！") {
      console.log("TCL: onReading -> content", content)
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
