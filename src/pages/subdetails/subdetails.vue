<template>
  <div class="subdetails" :style="{backgroundImage:'url('+bgImage+')'}">
    <div class="bg-color">
      <!-- <p class="desc">{{list.chapter}}</p>
      <p>{{list.author}}</p>-->
      <Swiper :list="list" />
    </div>
  </div>
</template>

<script>
import { getPoemSubDetails } from "@utils/db";
import Swiper from "@/components/swiper";
export default {
  data() {
    return {
      id: "",
      bgImage: "",
      contentId: "",
      list: {
        // type: "五言絕句",
        // content: [
        //   {
        //     chapter: "行宮",
        //     subchapter: null,
        //     author: "唐代：元稹 ",
        //     paragraphs: ["寥落古行宮，宮花寂寞紅。", "白頭宮女在，閒坐說玄宗。"]
        //   },
        //   {
        //     chapter: "登鸛雀樓",
        //     subchapter: null,
        //     author: "唐代：王之渙 ",
        //     paragraphs: ["白日依山盡，黃河入海流。", "欲窮千里目，更上一層樓。"]
        //   },
        //   {
        //     chapter: "新嫁娘詞",
        //     subchapter: null,
        //     author: "唐代：王建 ",
        //     paragraphs: ["三日入廚下，洗手作羹湯。", "未諳姑食性，先遣小姑嘗。"]
        //   },
        //   {
        //     chapter: "相思",
        //     subchapter: null,
        //     author: "唐代：王維 ",
        //     paragraphs: ["紅豆生南國，春來發幾枝。", "願君多采擷，此物最相思。"]
        //   },
        //   {
        //     chapter: "雜詩",
        //     subchapter: "雜詩三首·其二",
        //     author: "唐代：王維 ",
        //     paragraphs: ["君自故鄉來，應知故鄉事。", "來日綺窗前，寒梅著花未？"]
        //   },
        //   {
        //     chapter: "鹿柴",
        //     subchapter: null,
        //     author: "唐代：王維 ",
        //     paragraphs: ["空山不見人，但聞人語響。", "返景入深林，復照青苔上。"]
        //   },
        //   {
        //     chapter: "竹裏館",
        //     subchapter: null,
        //     author: "唐代：王維 ",
        //     paragraphs: ["獨坐幽篁裏，彈琴復長嘯。", "深林人不知，明月來相照。"]
        //   },
        //   {
        //     chapter: "山中送別",
        //     subchapter: "送別 / 山中送別",
        //     author: "唐代：王維 ",
        //     paragraphs: [
        //       "山中相送罷，日暮掩柴扉。",
        //       "春草明年綠，王孫歸不歸？(明年 一作：年年)"
        //     ]
        //   },
        //   {
        //     chapter: "問劉十九",
        //     subchapter: null,
        //     author: "唐代：白居易 ",
        //     paragraphs: ["綠蟻新醅酒，紅泥小火爐。", "晚來天欲雪，能飲一杯無？"]
        //   },
        //   {
        //     chapter: "哥舒歌",
        //     subchapter: null,
        //     author: "唐代：西鄙人 ",
        //     paragraphs: ["北斗七星高，哥舒夜帶刀。", "至今窺牧馬，不敢過臨洮。"]
        //   },
        //   {
        //     chapter: "靜夜思",
        //     subchapter: null,
        //     author: "唐代：李白 ",
        //     paragraphs: ["", ""]
        //   },
        //   {
        //     chapter: "怨情",
        //     subchapter: null,
        //     author: "唐代：李白 ",
        //     paragraphs: [
        //       "美人卷珠簾，深坐顰蛾眉。(顰 一作：蹙)",
        //       "但見淚痕溼，不知心恨誰。"
        //     ]
        //   },
        //   {
        //     chapter: "登樂遊原",
        //     subchapter: "樂遊原 / 登樂遊原",
        //     author: "唐代：李商隱 ",
        //     paragraphs: ["向晚意不適，驅車登古原。", "夕陽無限好，只是近黃昏。"]
        //   },
        //   {
        //     chapter: "聽箏",
        //     subchapter: null,
        //     author: "唐代：李端 ",
        //     paragraphs: ["鳴箏金粟柱，素手玉房前。", "欲得周郎顧，時時誤拂弦。"]
        //   },
        //   {
        //     chapter: "渡漢江",
        //     subchapter: null,
        //     author: "唐代：宋之問 ",
        //     paragraphs: ["嶺外音書斷，經冬復歷春。", "近鄉情更怯，不敢問來人。"]
        //   },
        //   {
        //     chapter: "八陣圖",
        //     subchapter: null,
        //     author: "唐代：杜甫 ",
        //     paragraphs: [
        //       "功蓋三分國，名成八陣圖。（名成 一作：名高）",
        //       "江流石不轉，遺恨失吞吳。"
        //     ]
        //   },
        //   {
        //     chapter: "宿建德江",
        //     subchapter: null,
        //     author: "唐代：孟浩然 ",
        //     paragraphs: ["移舟泊煙渚，日暮客愁新。", "野曠天低樹，江清月近人。"]
        //   },
        //   {
        //     chapter: "春曉",
        //     subchapter: null,
        //     author: "唐代：孟浩然 ",
        //     paragraphs: ["春眠不覺曉，處處聞啼鳥。", "夜來風雨聲，花落知多少。"]
        //   },
        //   {
        //     chapter: "春怨",
        //     subchapter: "春怨 / 伊州歌",
        //     author: "唐代：金昌緒 ",
        //     paragraphs: ["打起黃鶯兒，莫教枝上啼。", "啼時驚妾夢，不得到遼西。"]
        //   },
        //   {
        //     chapter: "江雪",
        //     subchapter: null,
        //     author: "唐代：柳宗元 ",
        //     paragraphs: ["千山鳥飛絕，萬徑人蹤滅。", "孤舟蓑笠翁，獨釣寒江雪。"]
        //   },
        //   {
        //     chapter: "秋夜寄邱員外",
        //     subchapter: "秋夜寄邱員外 / 秋夜寄丘二十二員外",
        //     author: "唐代：韋應物 ",
        //     paragraphs: ["懷君屬秋夜，散步詠涼天。", "空山松子落，幽人應未眠。"]
        //   },
        //   {
        //     chapter: "終南望餘雪",
        //     subchapter: null,
        //     author: "唐代：祖詠 ",
        //     paragraphs: ["終南陰嶺秀，積雪浮雲端。", "林表明霽色，城中增暮寒。"]
        //   },
        //   {
        //     chapter: "宮詞",
        //     subchapter: "宮詞二首·其一",
        //     author: "唐代：張祜 ",
        //     paragraphs: ["故國三千里，深宮二十年。", "一聲何滿子，雙淚落君前。"]
        //   },
        //   {
        //     chapter: "尋隱者不遇",
        //     subchapter: "尋隱者不遇 / 孫革訪羊尊師詩",
        //     author: "唐代：賈島 ",
        //     paragraphs: ["松下問童子，言師採藥去。", "只在此山中，雲深不知處。"]
        //   },
        //   {
        //     chapter: "送崔九",
        //     subchapter: "崔九欲往南山馬上口號與別 / 留別王維 / 送崔九",
        //     author: "唐代：裴迪 ",
        //     paragraphs: ["歸山深淺去，須盡丘壑美。", "莫學武陵人，暫遊桃源裏。"]
        //   },
        //   {
        //     chapter: "送靈澈上人",
        //     subchapter: null,
        //     author: "唐代：劉長卿 ",
        //     paragraphs: [
        //       "蒼蒼竹林寺，杳杳鐘聲晚。",
        //       "荷笠帶斜陽，青山獨歸遠。(斜陽 一作：夕陽)"
        //     ]
        //   },
        //   {
        //     chapter: "聽彈琴",
        //     subchapter: null,
        //     author: "唐代：劉長卿 ",
        //     paragraphs: [
        //       "泠泠七絃上，靜聽松風寒。(七絃 一作：七絲)",
        //       "古調雖自愛，今人多不彈。"
        //     ]
        //   },
        //   {
        //     chapter: "送上人",
        //     subchapter: "送方外上人 / 送上人",
        //     author: "唐代：劉長卿 ",
        //     paragraphs: ["孤雲將野鶴，豈向人間住。", "莫買沃洲山，時人已知處。"]
        //   },
        //   {
        //     chapter: "玉臺體",
        //     subchapter: null,
        //     author: "唐代：權德輿 ",
        //     paragraphs: ["昨夜裙帶解，今朝蟢子飛。", "鉛華不可棄，莫是藁砧歸。"]
        //   }
        // ]
      }
    };
  },
  components: {
    Swiper
  },
  onLoad(options) {
    this.id = options.id;
    this.contentId = options.contentId;
  },
  onUnload() {
    this.id = "";
    this.contentId = "";
    this.list = {};
  },
  mounted() {
    this.getBackgroundImage();
    this.getList();
  },
  methods: {
    getList() {
      getPoemSubDetails(this.id, this.contentId)
        .then(data => {
          let _poemlist, title;
          if (data.list) {
            let _list = data.list[0].content[0];
            _poemlist = _list.content;
            title = _poemlist.type || _poemlist.title;
          } else {
            let _list = data.data[0];
            _poemlist = _list.section;
            title = _list.title;
          }
          wx.setNavigationBarTitle({
            title
          });
          _poemlist && (this.list = { ..._poemlist });
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
.subdetails {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding-left: 15px;
  padding-right: 15px;
  .bg-color {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
  .head {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
  }
  .desc {
    color: #999;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
