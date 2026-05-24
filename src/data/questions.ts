import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: 1,
    text: `别人突然不回你消息时，\n你会开始反复复盘自己说错了什么吗？`,
    dimension: "overthinking",
    options: [
      {
        id: "a",
        text: "不会，可能他们只是忙（但我会每隔五分钟看一次手机）",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 3, numbness: 0, performance: 1, dependency: 1, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "会，我会从第一条消息开始逐字分析",
        scores: { sensitivity: 3, withdrawal: 0, overthinking: 4, numbness: 0, performance: 2, dependency: 2, dissociation: 0, collapse: 1 },
      },
      {
        id: "c",
        text: "我会直接不回了，你不想理我我也不想理你",
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "d",
        text: "我会发一条朋友圈，看看他们会不会点赞",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 2, numbness: 0, performance: 4, dependency: 3, dissociation: 0, collapse: 0 },
      },
    ],
  },
  {
    id: 2,
    text: `深夜躺在床上，\n你的大脑通常在想什么？`,
    dimension: "overthinking",
    options: [
      {
        id: "a",
        text: "五年前那次尴尬的对话",
        scores: { sensitivity: 3, withdrawal: 0, overthinking: 4, numbness: 0, performance: 2, dependency: 0, dissociation: 1, collapse: 1 },
      },
      {
        id: "b",
        text: "人生到底有没有意义",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 3, numbness: 1, performance: 0, dependency: 0, dissociation: 3, collapse: 2 },
      },
      {
        id: "c",
        text: "什么都不想，但就是睡不着",
        scores: { sensitivity: 1, withdrawal: 1, overthinking: 1, numbness: 4, performance: 0, dependency: 0, dissociation: 2, collapse: 1 },
      },
      {
        id: "d",
        text: "构思如果现在世界末日我要做什么",
        scores: { sensitivity: 1, withdrawal: 1, overthinking: 2, numbness: 2, performance: 0, dependency: 0, dissociation: 4, collapse: 3 },
      },
    ],
  },
  {
    id: 3,
    text: `你上一次真心笑出来是什么时候？`,
    dimension: "numbness",
    options: [
      {
        id: "a",
        text: "今天，刷到了一个很离谱的视频",
        scores: { sensitivity: 1, withdrawal: 0, overthinking: 0, numbness: 0, performance: 2, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "不记得了，但我经常在笑",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 2, performance: 4, dependency: 1, dissociation: 0, collapse: 1 },
      },
      {
        id: "c",
        text: "真心的？好像很久了",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 2, numbness: 3, performance: 1, dependency: 0, dissociation: 1, collapse: 2 },
      },
      {
        id: "d",
        text: "笑是一种社交工具，不是一种情绪",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 2, numbness: 4, performance: 3, dependency: 0, dissociation: 2, collapse: 1 },
      },
    ],
  },
  {
    id: 4,
    text: `朋友约你出去，\n你的第一反应是什么？`,
    dimension: "withdrawal",
    options: [
      {
        id: "a",
        text: "开心，终于有事做了",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 1, dependency: 2, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "开心，但开始想怎么找借口不去",
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 2, numbness: 1, performance: 2, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "c",
        text: "看状态，如果今天能量够就去",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 2, performance: 1, dependency: 0, dissociation: 1, collapse: 1 },
      },
      {
        id: "d",
        text: "已读，然后假装没看到",
        scores: { sensitivity: 1, withdrawal: 4, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 2, collapse: 1 },
      },
    ],
  },
  {
    id: 5,
    text: `你发了一条朋友圈之后，\n会反复看有没有人点赞吗？`,
    dimension: "dependency",
    options: [
      {
        id: "a",
        text: "发完就忘了",
        scores: { sensitivity: 0, withdrawal: 1, overthinking: 0, numbness: 1, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "会看，但假装不在意",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 2, numbness: 0, performance: 3, dependency: 3, dissociation: 0, collapse: 0 },
      },
      {
        id: "c",
        text: "如果半小时没人点赞，我就删了",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 3, numbness: 0, performance: 4, dependency: 4, dissociation: 0, collapse: 1 },
      },
      {
        id: "d",
        text: "我已经很久没发过朋友圈了",
        scores: { sensitivity: 2, withdrawal: 3, overthinking: 1, numbness: 2, performance: 1, dependency: 1, dissociation: 2, collapse: 1 },
      },
    ],
  },
  {
    id: 6,
    text: `当所有人都觉得你很开朗的时候，\n你真实的感受是什么？`,
    dimension: "performance",
    options: [
      {
        id: "a",
        text: "我确实挺开朗的啊",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "他们认识的那个人，好像不是真正的我",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 2, numbness: 1, performance: 4, dependency: 1, dissociation: 2, collapse: 1 },
      },
      {
        id: "c",
        text: "挺好的，至少没有人来烦我",
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 0, numbness: 3, performance: 2, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "d",
        text: "有时候我也分不清哪个是真的我",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 3, numbness: 2, performance: 3, dependency: 1, dissociation: 4, collapse: 2 },
      },
    ],
  },
  {
    id: 7,
    text: `你最害怕的场景是？`,
    dimension: "sensitivity",
    options: [
      {
        id: "a",
        text: "一群人在一起笑，但没人告诉你在笑什么",
        scores: { sensitivity: 4, withdrawal: 1, overthinking: 3, numbness: 0, performance: 2, dependency: 3, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "被喜欢的人看到最真实的样子",
        scores: { sensitivity: 3, withdrawal: 2, overthinking: 2, numbness: 0, performance: 3, dependency: 2, dissociation: 0, collapse: 2 },
      },
      {
        id: "c",
        text: "在人群中突然觉得所有人都很陌生",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 4, collapse: 2 },
      },
      {
        id: "d",
        text: "发现自己已经很久没有真正开心过了",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 2, numbness: 3, performance: 1, dependency: 0, dissociation: 1, collapse: 4 },
      },
    ],
  },
  {
    id: 8,
    text: `你通常怎么结束一段对话？`,
    dimension: "withdrawal",
    options: [
      {
        id: "a",
        text: "聊到自然结束",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: `突然消失，过几个小时再回一句"刚才有事"`,
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 1, numbness: 1, performance: 2, dependency: 0, dissociation: 2, collapse: 0 },
      },
      {
        id: "c",
        text: "回一个表情包，然后不再说话",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 0, numbness: 2, performance: 1, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "d",
        text: "我会故意说一句很奇怪的话，让对方不想回",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 2, numbness: 1, performance: 3, dependency: 0, dissociation: 2, collapse: 0 },
      },
    ],
  },
  {
    id: 9,
    text: `如果情绪有天气预报，\n你今天的"天气"是什么？`,
    dimension: "numbness",
    options: [
      {
        id: "a",
        text: "晴天，偶尔飘过一朵云",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "阴天，不下雨但看不到太阳",
        scores: { sensitivity: 1, withdrawal: 1, overthinking: 1, numbness: 3, performance: 1, dependency: 0, dissociation: 1, collapse: 1 },
      },
      {
        id: "c",
        text: "雾霾，什么都看不清",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 4, performance: 0, dependency: 0, dissociation: 3, collapse: 1 },
      },
      {
        id: "d",
        text: "天气预报说晴天，但我觉得要下暴雨",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 3, numbness: 1, performance: 2, dependency: 1, dissociation: 0, collapse: 3 },
      },
    ],
  },
  {
    id: 10,
    text: `你最容易在哪种时刻突然崩溃？`,
    dimension: "collapse",
    options: [
      {
        id: "a",
        text: "一个人在出租屋点外卖的时候",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 1, numbness: 2, performance: 0, dependency: 1, dissociation: 1, collapse: 4 },
      },
      {
        id: "b",
        text: "有人突然对你很好的时候",
        scores: { sensitivity: 4, withdrawal: 0, overthinking: 1, numbness: 0, performance: 1, dependency: 2, dissociation: 0, collapse: 3 },
      },
      {
        id: "c",
        text: "洗澡的时候",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 1, performance: 0, dependency: 0, dissociation: 1, collapse: 3 },
      },
      {
        id: "d",
        text: "我不会崩溃，我只是会突然什么都感受不到",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 0, numbness: 4, performance: 0, dependency: 0, dissociation: 3, collapse: 2 },
      },
    ],
  },
  {
    id: 11,
    text: `你怎么形容自己的"累"？`,
    dimension: "numbness",
    options: [
      {
        id: "a",
        text: "睡一觉就好了",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "不是身体累，是灵魂在打哈欠",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 1, numbness: 3, performance: 0, dependency: 0, dissociation: 2, collapse: 2 },
      },
      {
        id: "c",
        text: "像手机只剩1%的电，但充电器坏了",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 3, performance: 1, dependency: 0, dissociation: 1, collapse: 3 },
      },
      {
        id: "d",
        text: "我已经分不清是累还是不想动了",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 2, numbness: 4, performance: 0, dependency: 0, dissociation: 2, collapse: 2 },
      },
    ],
  },
  {
    id: 12,
    text: `你对待"被需要"这件事的态度是？`,
    dimension: "dependency",
    options: [
      {
        id: "a",
        text: "被需要让我觉得自己有价值",
        scores: { sensitivity: 1, withdrawal: 0, overthinking: 0, numbness: 0, performance: 2, dependency: 4, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "被需要很好，但我不想被依赖",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 1, performance: 1, dependency: 1, dissociation: 1, collapse: 0 },
      },
      {
        id: "c",
        text: "我觉得没有人真的需要我",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 2, numbness: 2, performance: 0, dependency: 2, dissociation: 0, collapse: 3 },
      },
      {
        id: "d",
        text: "我需要被需要，但我又害怕被需要",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 3, numbness: 0, performance: 2, dependency: 4, dissociation: 1, collapse: 1 },
      },
    ],
  },
  {
    id: 13,
    text: `你觉得自己最像哪种天气？`,
    dimension: "sensitivity",
    options: [
      {
        id: "a",
        text: "晴天（看起来很好但紫外线很强）",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 0, performance: 4, dependency: 1, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "多云（一直在变，连我自己都不知道下一秒是什么）",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 2, numbness: 1, performance: 2, dependency: 1, dissociation: 2, collapse: 1 },
      },
      {
        id: "c",
        text: "台风前夕（一切看起来很平静，但我知道暴风雨要来了）",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 3, numbness: 1, performance: 1, dependency: 0, dissociation: 0, collapse: 4 },
      },
      {
        id: "d",
        text: "阴天（不下雨，但也没有太阳）",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 4, performance: 0, dependency: 0, dissociation: 2, collapse: 1 },
      },
    ],
  },
  {
    id: 14,
    text: `你有没有那种"明明在笑，但突然很想哭"的瞬间？`,
    dimension: "collapse",
    options: [
      {
        id: "a",
        text: "没有，笑就是笑",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "有，尤其是在人最多的场合",
        scores: { sensitivity: 3, withdrawal: 0, overthinking: 1, numbness: 0, performance: 2, dependency: 1, dissociation: 0, collapse: 4 },
      },
      {
        id: "c",
        text: "有，但我会用更大的笑盖过去",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 1, performance: 4, dependency: 1, dissociation: 1, collapse: 3 },
      },
      {
        id: "d",
        text: "我已经分不清自己什么时候是真笑了",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 2, numbness: 3, performance: 3, dependency: 0, dissociation: 3, collapse: 2 },
      },
    ],
  },
  {
    id: 15,
    text: `你怎么形容你和"孤独"的关系？`,
    dimension: "withdrawal",
    options: [
      {
        id: "a",
        text: "我不孤独，我有朋友有家人",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 1, dependency: 1, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "我和孤独已经和解了",
        scores: { sensitivity: 1, withdrawal: 2, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "c",
        text: "孤独是我的安全区",
        scores: { sensitivity: 2, withdrawal: 4, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 2, collapse: 1 },
      },
      {
        id: "d",
        text: "我害怕孤独，但我更害怕人群",
        scores: { sensitivity: 3, withdrawal: 3, overthinking: 2, numbness: 1, performance: 1, dependency: 1, dissociation: 2, collapse: 2 },
      },
    ],
  },
  {
    id: 16,
    text: `你在什么时候觉得自己最"真实"？`,
    dimension: "dissociation",
    options: [
      {
        id: "a",
        text: "和最好的朋友在一起的时候",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 2, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "一个人在房间里的时候",
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 1, numbness: 1, performance: 0, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "c",
        text: "说实话，我不太确定哪个是真实的我",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 3, numbness: 1, performance: 3, dependency: 0, dissociation: 4, collapse: 1 },
      },
      {
        id: "d",
        text: "喝了一点酒之后",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 1, numbness: 2, performance: 2, dependency: 1, dissociation: 3, collapse: 2 },
      },
    ],
  },
  {
    id: 17,
    text: `如果能对五年前的自己说一句话，\n你会说什么？`,
    dimension: "sensitivity",
    options: [
      {
        id: "a",
        text: "加油，一切都会好的",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 1, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "别那么用力讨好别人了",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 2, numbness: 0, performance: 3, dependency: 2, dissociation: 0, collapse: 1 },
      },
      {
        id: "c",
        text: "你现在觉得天大的事，以后也不会觉得小",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 3, numbness: 2, performance: 0, dependency: 0, dissociation: 1, collapse: 3 },
      },
      {
        id: "d",
        text: "对不起",
        scores: { sensitivity: 4, withdrawal: 1, overthinking: 2, numbness: 1, performance: 0, dependency: 1, dissociation: 0, collapse: 4 },
      },
    ],
  },
  {
    id: 18,
    text: `你失眠的时候，\n会做什么？`,
    dimension: "overthinking",
    options: [
      {
        id: "a",
        text: "看手机直到眼睛自己闭上",
        scores: { sensitivity: 1, withdrawal: 1, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 1, collapse: 1 },
      },
      {
        id: "b",
        text: "开始想那些我平时不敢想的事",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 4, numbness: 0, performance: 0, dependency: 1, dissociation: 2, collapse: 2 },
      },
      {
        id: "c",
        text: "把所有社交软件翻一遍，然后觉得自己更孤独了",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 3, numbness: 1, performance: 1, dependency: 3, dissociation: 1, collapse: 2 },
      },
      {
        id: "d",
        text: "哭，或者想哭但哭不出来",
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 2, numbness: 2, performance: 0, dependency: 0, dissociation: 0, collapse: 4 },
      },
    ],
  },
  {
    id: 19,
    text: `别人夸你的时候，\n你内心真实的反应是？`,
    dimension: "performance",
    options: [
      {
        id: "a",
        text: "谢谢，我也觉得自己不错",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: `他们在夸那个"人设"，不是真正的我`,
        scores: { sensitivity: 3, withdrawal: 1, overthinking: 3, numbness: 0, performance: 4, dependency: 1, dissociation: 2, collapse: 1 },
      },
      {
        id: "c",
        text: "我会想他们是不是在客套",
        scores: { sensitivity: 4, withdrawal: 0, overthinking: 3, numbness: 0, performance: 2, dependency: 3, dissociation: 0, collapse: 0 },
      },
      {
        id: "d",
        text: "我不太习惯被夸，会有点想逃",
        scores: { sensitivity: 2, withdrawal: 3, overthinking: 1, numbness: 1, performance: 1, dependency: 0, dissociation: 1, collapse: 1 },
      },
    ],
  },
  {
    id: 20,
    text: `你觉得"我很好"这句话，\n你一天要说几次是假的？`,
    dimension: "performance",
    options: [
      {
        id: "a",
        text: "0次，我说我很好的时候都是真的",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "大概3次吧",
        scores: { sensitivity: 1, withdrawal: 0, overthinking: 1, numbness: 1, performance: 3, dependency: 1, dissociation: 0, collapse: 1 },
      },
      {
        id: "c",
        text: `我已经不记得"真好"是什么感觉了`,
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 2, numbness: 3, performance: 2, dependency: 0, dissociation: 2, collapse: 3 },
      },
      {
        id: "d",
        text: "我不说了，我直接沉默",
        scores: { sensitivity: 2, withdrawal: 4, overthinking: 1, numbness: 2, performance: 0, dependency: 0, dissociation: 1, collapse: 1 },
      },
    ],
  },
  {
    id: 21,
    text: `如果用一首歌来形容你的精神状态，\n你会选？`,
    dimension: "dissociation",
    options: [
      {
        id: "a",
        text: "一首阳光的歌，因为我要积极向上",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 3, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "一首没人听过的歌，因为没人能理解我",
        scores: { sensitivity: 3, withdrawal: 2, overthinking: 2, numbness: 1, performance: 1, dependency: 0, dissociation: 3, collapse: 1 },
      },
      {
        id: "c",
        text: "一首歌词很丧但旋律很甜的歌",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 2, performance: 4, dependency: 1, dissociation: 1, collapse: 2 },
      },
      {
        id: "d",
        text: "纯音乐，因为歌词已经无法描述了",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 1, numbness: 3, performance: 0, dependency: 0, dissociation: 4, collapse: 2 },
      },
    ],
  },
  {
    id: 22,
    text: `你最常说的谎话是？`,
    dimension: "performance",
    options: [
      {
        id: "a",
        text: `"我没事"`,
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 1, numbness: 1, performance: 4, dependency: 0, dissociation: 0, collapse: 2 },
      },
      {
        id: "b",
        text: `"下次一定"`,
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 0, numbness: 1, performance: 2, dependency: 0, dissociation: 1, collapse: 0 },
      },
      {
        id: "c",
        text: `"我随便"`,
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 2, numbness: 2, performance: 2, dependency: 1, dissociation: 1, collapse: 0 },
      },
      {
        id: "d",
        text: `"我很好，你呢"`,
        scores: { sensitivity: 3, withdrawal: 0, overthinking: 1, numbness: 1, performance: 4, dependency: 2, dissociation: 0, collapse: 1 },
      },
    ],
  },
  {
    id: 23,
    text: `你觉得自己"正常"吗？`,
    dimension: "dissociation",
    options: [
      {
        id: "a",
        text: "挺正常的",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 1, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "正常是一种表演，我演技不错",
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 2, numbness: 1, performance: 4, dependency: 0, dissociation: 2, collapse: 1 },
      },
      {
        id: "c",
        text: `我已经不知道"正常"的定义是什么了`,
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 3, numbness: 2, performance: 1, dependency: 0, dissociation: 4, collapse: 2 },
      },
      {
        id: "d",
        text: "我比正常更正常，这本身就不正常",
        scores: { sensitivity: 2, withdrawal: 2, overthinking: 3, numbness: 1, performance: 3, dependency: 0, dissociation: 3, collapse: 1 },
      },
    ],
  },
  {
    id: 24,
    text: `最后一题：\n如果你的精神状态是一个APP，\n它现在的状态是？`,
    dimension: "collapse",
    options: [
      {
        id: "a",
        text: "运行正常，偶尔需要更新",
        scores: { sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0, performance: 0, dependency: 0, dissociation: 0, collapse: 0 },
      },
      {
        id: "b",
        text: "后台运行中，但已经很久没打开过了",
        scores: { sensitivity: 1, withdrawal: 3, overthinking: 0, numbness: 3, performance: 1, dependency: 0, dissociation: 2, collapse: 1 },
      },
      {
        id: "c",
        text: "持续崩溃中，但自动重启了",
        scores: { sensitivity: 2, withdrawal: 0, overthinking: 1, numbness: 1, performance: 2, dependency: 0, dissociation: 0, collapse: 4 },
      },
      {
        id: "d",
        text: `显示"存储空间不足"，但我不知道要清理什么`,
        scores: { sensitivity: 2, withdrawal: 1, overthinking: 2, numbness: 3, performance: 0, dependency: 0, dissociation: 2, collapse: 3 },
      },
    ],
  },
];
