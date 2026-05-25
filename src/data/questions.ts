import { Question, Dimension } from "@/types";

const ALL_DIMS: Dimension[] = [
  "sensitivity", "withdrawal", "overthinking", "numbness",
  "performance", "dependency", "dissociation", "collapse",
];

function w(primary: Dimension, ...secondary: [Dimension, number][]): Record<Dimension, number> {
  const result = Object.fromEntries(ALL_DIMS.map(d => [d, 0])) as Record<Dimension, number>;
  result[primary] = 1.0;
  for (const [dim, weight] of secondary) result[dim] = weight;
  return result;
}

export const questions: Question[] = [
  {
    id: 1,
    text: `别人突然不回你消息时，\n你会开始反复复盘自己说错了什么吗？`,
    dimension: "overthinking",
    options: [
      { id: "a", text: "不会，可能他们只是忙（但我会每隔五分钟看一次手机）", score: 2, weights: w("overthinking", ["dependency", 0.3], ["sensitivity", 0.3]) },
      { id: "b", text: "会，我会从第一条消息开始逐字分析", score: 4, weights: w("overthinking", ["dependency", 0.3], ["sensitivity", 0.3]) },
      { id: "c", text: "我会直接不回了，你不想理我我也不想理你", score: 1, weights: w("overthinking", ["dependency", 0.3], ["sensitivity", 0.3]) },
      { id: "d", text: "我会发一条朋友圈，看看他们会不会点赞", score: 3, weights: w("overthinking", ["dependency", 0.3], ["sensitivity", 0.3]) },
    ],
  },
  {
    id: 2,
    text: `深夜躺在床上，\n你的大脑通常在想什么？`,
    dimension: "overthinking",
    options: [
      { id: "a", text: "五年前那次尴尬的对话", score: 4, weights: w("overthinking", ["sensitivity", 0.3], ["dissociation", 0.3]) },
      { id: "b", text: "人生到底有没有意义", score: 3, weights: w("overthinking", ["sensitivity", 0.3], ["dissociation", 0.3]) },
      { id: "c", text: "什么都不想，但就是睡不着", score: 1, weights: w("overthinking", ["sensitivity", 0.3], ["dissociation", 0.3]) },
      { id: "d", text: "构思如果现在世界末日我要做什么", score: 2, weights: w("overthinking", ["sensitivity", 0.3], ["dissociation", 0.3]) },
    ],
  },
  {
    id: 3,
    text: `你上一次真心笑出来是什么时候？`,
    dimension: "numbness",
    options: [
      { id: "a", text: "今天，刷到了一个很离谱的视频", score: 1, weights: w("numbness", ["performance", 0.4]) },
      { id: "b", text: "不记得了，但我经常在笑", score: 2, weights: w("numbness", ["performance", 0.4]) },
      { id: "c", text: "真心的？好像很久了", score: 3, weights: w("numbness", ["performance", 0.4]) },
      { id: "d", text: "笑是一种社交工具，不是一种情绪", score: 4, weights: w("numbness", ["performance", 0.4]) },
    ],
  },
  {
    id: 4,
    text: `朋友约你出去，\n你的第一反应是什么？`,
    dimension: "withdrawal",
    options: [
      { id: "a", text: "开心，终于有事做了", score: 1, weights: w("withdrawal", ["overthinking", 0.3], ["numbness", 0.3]) },
      { id: "b", text: "开心，但开始想怎么找借口不去", score: 3, weights: w("withdrawal", ["overthinking", 0.3], ["numbness", 0.3]) },
      { id: "c", text: "看状态，如果今天能量够就去", score: 2, weights: w("withdrawal", ["overthinking", 0.3], ["numbness", 0.3]) },
      { id: "d", text: "已读，然后假装没看到", score: 4, weights: w("withdrawal", ["overthinking", 0.3], ["numbness", 0.3]) },
    ],
  },
  {
    id: 5,
    text: `你发了一条朋友圈之后，\n会反复看有没有人点赞吗？`,
    dimension: "dependency",
    options: [
      { id: "a", text: "发完就忘了", score: 1, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "b", text: "会看，但假装不在意", score: 2, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "c", text: "如果半小时没人点赞，我就删了", score: 4, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "d", text: "我已经很久没发过朋友圈了", score: 3, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
    ],
  },
  {
    id: 6,
    text: `当所有人都觉得你很开朗的时候，\n你真实的感受是什么？`,
    dimension: "performance",
    reverse: true,
    options: [
      { id: "a", text: "我确实挺开朗的啊", score: 1, weights: w("performance", ["dissociation", 0.4], ["withdrawal", 0.3]) },
      { id: "b", text: "他们认识的那个人，好像不是真正的我", score: 4, weights: w("performance", ["dissociation", 0.4], ["withdrawal", 0.3]) },
      { id: "c", text: "挺好的，至少没有人来烦我", score: 2, weights: w("performance", ["dissociation", 0.4], ["withdrawal", 0.3]) },
      { id: "d", text: "有时候我也分不清哪个是真的我", score: 3, weights: w("performance", ["dissociation", 0.4], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 7,
    text: `你最害怕的场景是？`,
    dimension: "sensitivity",
    options: [
      { id: "a", text: "一群人在一起笑，但没人告诉你在笑什么", score: 4, weights: w("sensitivity", ["performance", 0.3], ["dependency", 0.3]) },
      { id: "b", text: "被喜欢的人看到最真实的样子", score: 3, weights: w("sensitivity", ["performance", 0.3], ["dependency", 0.3]) },
      { id: "c", text: "在人群中突然觉得所有人都很陌生", score: 2, weights: w("sensitivity", ["performance", 0.3], ["dependency", 0.3]) },
      { id: "d", text: "发现自己已经很久没有真正开心过了", score: 3, weights: w("sensitivity", ["performance", 0.3], ["dependency", 0.3]) },
    ],
  },
  {
    id: 8,
    text: `你通常怎么结束一段对话？`,
    dimension: "withdrawal",
    options: [
      { id: "a", text: "聊到自然结束", score: 1, weights: w("withdrawal", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "b", text: `突然消失，过几个小时再回一句"刚才有事"`, score: 3, weights: w("withdrawal", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "c", text: "回一个表情包，然后不再说话", score: 2, weights: w("withdrawal", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "d", text: "我会故意说一句很奇怪的话，让对方不想回", score: 4, weights: w("withdrawal", ["performance", 0.3], ["overthinking", 0.3]) },
    ],
  },
  {
    id: 9,
    text: `如果情绪有天气预报，\n你今天的"天气"是什么？`,
    dimension: "numbness",
    options: [
      { id: "a", text: "晴天，偶尔飘过一朵云", score: 1, weights: w("numbness", ["dissociation", 0.3], ["sensitivity", 0.3]) },
      { id: "b", text: "阴天，不下雨但看不到太阳", score: 3, weights: w("numbness", ["dissociation", 0.3], ["sensitivity", 0.3]) },
      { id: "c", text: "雾霾，什么都看不清", score: 4, weights: w("numbness", ["dissociation", 0.3], ["sensitivity", 0.3]) },
      { id: "d", text: "天气预报说晴天，但我觉得要下暴雨", score: 2, weights: w("numbness", ["dissociation", 0.3], ["sensitivity", 0.3]) },
    ],
  },
  {
    id: 10,
    text: `你最容易在哪种时刻突然崩溃？`,
    dimension: "collapse",
    options: [
      { id: "a", text: "一个人在出租屋点外卖的时候", score: 4, weights: w("collapse", ["numbness", 0.4], ["withdrawal", 0.3]) },
      { id: "b", text: "有人突然对你很好的时候", score: 3, weights: w("collapse", ["numbness", 0.4], ["withdrawal", 0.3]) },
      { id: "c", text: "洗澡的时候", score: 2, weights: w("collapse", ["numbness", 0.4], ["withdrawal", 0.3]) },
      { id: "d", text: "我不会崩溃，我只是会突然什么都感受不到", score: 3, weights: w("collapse", ["numbness", 0.4], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 11,
    text: `你怎么形容自己的"累"？`,
    dimension: "numbness",
    options: [
      { id: "a", text: "睡一觉就好了", score: 1, weights: w("numbness", ["dissociation", 0.3], ["collapse", 0.3]) },
      { id: "b", text: "不是身体累，是灵魂在打哈欠", score: 3, weights: w("numbness", ["dissociation", 0.3], ["collapse", 0.3]) },
      { id: "c", text: "像手机只剩1%的电，但充电器坏了", score: 3, weights: w("numbness", ["dissociation", 0.3], ["collapse", 0.3]) },
      { id: "d", text: "我已经分不清是累还是不想动了", score: 4, weights: w("numbness", ["dissociation", 0.3], ["collapse", 0.3]) },
    ],
  },
  {
    id: 12,
    text: `你对待"被需要"这件事的态度是？`,
    dimension: "dependency",
    options: [
      { id: "a", text: "被需要让我觉得自己有价值", score: 4, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "b", text: "被需要很好，但我不想被依赖", score: 1, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "c", text: "我觉得没有人真的需要我", score: 2, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
      { id: "d", text: "我需要被需要，但我又害怕被需要", score: 4, weights: w("dependency", ["performance", 0.3], ["sensitivity", 0.3]) },
    ],
  },
  {
    id: 13,
    text: `你觉得自己最像哪种天气？`,
    dimension: "sensitivity",
    options: [
      { id: "a", text: "晴天（看起来很好但紫外线很强）", score: 2, weights: w("sensitivity", ["performance", 0.3], ["collapse", 0.3]) },
      { id: "b", text: "多云（一直在变，连我自己都不知道下一秒是什么）", score: 3, weights: w("sensitivity", ["performance", 0.3], ["collapse", 0.3]) },
      { id: "c", text: "台风前夕（一切看起来很平静，但我知道暴风雨要来了）", score: 4, weights: w("sensitivity", ["performance", 0.3], ["collapse", 0.3]) },
      { id: "d", text: "阴天（不下雨，但也没有太阳）", score: 1, weights: w("sensitivity", ["performance", 0.3], ["collapse", 0.3]) },
    ],
  },
  {
    id: 14,
    text: `你有没有那种"明明在笑，但突然很想哭"的瞬间？`,
    dimension: "collapse",
    reverse: true,
    options: [
      { id: "a", text: "没有，笑就是笑", score: 1, weights: w("collapse", ["performance", 0.4], ["numbness", 0.3]) },
      { id: "b", text: "有，尤其是在人最多的场合", score: 4, weights: w("collapse", ["performance", 0.4], ["numbness", 0.3]) },
      { id: "c", text: "有，但我会用更大的笑盖过去", score: 3, weights: w("collapse", ["performance", 0.4], ["numbness", 0.3]) },
      { id: "d", text: "我已经分不清自己什么时候是真笑了", score: 2, weights: w("collapse", ["performance", 0.4], ["numbness", 0.3]) },
    ],
  },
  {
    id: 15,
    text: `你怎么形容你和"孤独"的关系？`,
    dimension: "withdrawal",
    options: [
      { id: "a", text: "我不孤独，我有朋友有家人", score: 1, weights: w("withdrawal", ["numbness", 0.3], ["sensitivity", 0.3]) },
      { id: "b", text: "我和孤独已经和解了", score: 2, weights: w("withdrawal", ["numbness", 0.3], ["sensitivity", 0.3]) },
      { id: "c", text: "孤独是我的安全区", score: 4, weights: w("withdrawal", ["numbness", 0.3], ["sensitivity", 0.3]) },
      { id: "d", text: "我害怕孤独，但我更害怕人群", score: 3, weights: w("withdrawal", ["numbness", 0.3], ["sensitivity", 0.3]) },
    ],
  },
  {
    id: 16,
    text: `你在什么时候觉得自己最"真实"？`,
    dimension: "dissociation",
    options: [
      { id: "a", text: "和最好的朋友在一起的时候", score: 1, weights: w("dissociation", ["withdrawal", 0.3], ["performance", 0.3]) },
      { id: "b", text: "一个人在房间里的时候", score: 2, weights: w("dissociation", ["withdrawal", 0.3], ["performance", 0.3]) },
      { id: "c", text: "说实话，我不太确定哪个是真实的我", score: 4, weights: w("dissociation", ["withdrawal", 0.3], ["performance", 0.3]) },
      { id: "d", text: "喝了一点酒之后", score: 3, weights: w("dissociation", ["withdrawal", 0.3], ["performance", 0.3]) },
    ],
  },
  {
    id: 17,
    text: `如果能对五年前的自己说一句话，\n你会说什么？`,
    dimension: "sensitivity",
    options: [
      { id: "a", text: "加油，一切都会好的", score: 1, weights: w("sensitivity", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "b", text: "别那么用力讨好别人了", score: 3, weights: w("sensitivity", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "c", text: "你现在觉得天大的事，以后也不会觉得小", score: 4, weights: w("sensitivity", ["performance", 0.3], ["overthinking", 0.3]) },
      { id: "d", text: "对不起", score: 3, weights: w("sensitivity", ["performance", 0.3], ["overthinking", 0.3]) },
    ],
  },
  {
    id: 18,
    text: `你失眠的时候，\n会做什么？`,
    dimension: "overthinking",
    options: [
      { id: "a", text: "看手机直到眼睛自己闭上", score: 1, weights: w("overthinking", ["sensitivity", 0.3], ["numbness", 0.3]) },
      { id: "b", text: "开始想那些我平时不敢想的事", score: 4, weights: w("overthinking", ["sensitivity", 0.3], ["numbness", 0.3]) },
      { id: "c", text: "把所有社交软件翻一遍，然后觉得自己更孤独了", score: 3, weights: w("overthinking", ["sensitivity", 0.3], ["numbness", 0.3]) },
      { id: "d", text: "哭，或者想哭但哭不出来", score: 2, weights: w("overthinking", ["sensitivity", 0.3], ["numbness", 0.3]) },
    ],
  },
  {
    id: 19,
    text: `别人夸你的时候，\n你内心真实的反应是？`,
    dimension: "performance",
    reverse: true,
    options: [
      { id: "a", text: "谢谢，我也觉得自己不错", score: 1, weights: w("performance", ["dissociation", 0.3], ["dependency", 0.3]) },
      { id: "b", text: `他们在夸那个"人设"，不是真正的我`, score: 4, weights: w("performance", ["dissociation", 0.3], ["dependency", 0.3]) },
      { id: "c", text: "我会想他们是不是在客套", score: 2, weights: w("performance", ["dissociation", 0.3], ["dependency", 0.3]) },
      { id: "d", text: "我不太习惯被夸，会有点想逃", score: 3, weights: w("performance", ["dissociation", 0.3], ["dependency", 0.3]) },
    ],
  },
  {
    id: 20,
    text: `你觉得"我很好"这句话，\n你一天要说几次是假的？`,
    dimension: "performance",
    reverse: true,
    options: [
      { id: "a", text: "0次，我说我很好的时候都是真的", score: 1, weights: w("performance", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "大概3次吧", score: 3, weights: w("performance", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: `我已经不记得"真好"是什么感觉了`, score: 2, weights: w("performance", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "我不说了，我直接沉默", score: 4, weights: w("performance", ["numbness", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 21,
    text: `如果用一首歌来形容你的精神状态，\n你会选？`,
    dimension: "dissociation",
    options: [
      { id: "a", text: "一首阳光的歌，因为我要积极向上", score: 1, weights: w("dissociation", ["performance", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "一首没人听过的歌，因为没人能理解我", score: 3, weights: w("dissociation", ["performance", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "一首歌词很丧但旋律很甜的歌", score: 2, weights: w("dissociation", ["performance", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "纯音乐，因为歌词已经无法描述了", score: 4, weights: w("dissociation", ["performance", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 22,
    text: `你最常说的谎话是？`,
    dimension: "performance",
    options: [
      { id: "a", text: `"我没事"`, score: 4, weights: w("performance", ["numbness", 0.3], ["dependency", 0.3]) },
      { id: "b", text: `"下次一定"`, score: 2, weights: w("performance", ["numbness", 0.3], ["dependency", 0.3]) },
      { id: "c", text: `"我随便"`, score: 3, weights: w("performance", ["numbness", 0.3], ["dependency", 0.3]) },
      { id: "d", text: `"我很好，你呢"`, score: 4, weights: w("performance", ["numbness", 0.3], ["dependency", 0.3]) },
    ],
  },
  {
    id: 23,
    text: `你觉得自己"正常"吗？`,
    dimension: "dissociation",
    options: [
      { id: "a", text: "挺正常的", score: 1, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "b", text: "正常是一种表演，我演技不错", score: 2, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "c", text: `我已经不知道"正常"的定义是什么了`, score: 4, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "d", text: "我比正常更正常，这本身就不正常", score: 3, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
    ],
  },
  {
    id: 24,
    text: `你在便利店买东西，\n店员多找了你十块钱，你会？`,
    dimension: "sensitivity",
    reverse: true,
    options: [
      { id: "a", text: "马上还回去", score: 1, weights: w("sensitivity", ["overthinking", 0.3], ["performance", 0.3]) },
      { id: "b", text: "犹豫三秒，然后还回去", score: 2, weights: w("sensitivity", ["overthinking", 0.3], ["performance", 0.3]) },
      { id: "c", text: "拿走，然后内疚一整天", score: 4, weights: w("sensitivity", ["overthinking", 0.3], ["performance", 0.3]) },
      { id: "d", text: "拿走，然后说服自己这是宇宙欠我的", score: 3, weights: w("sensitivity", ["overthinking", 0.3], ["performance", 0.3]) },
    ],
  },
  {
    id: 25,
    text: `你手机里最不想让别人看到的是？`,
    dimension: "performance",
    options: [
      { id: "a", text: "没什么不能看的", score: 1, weights: w("performance", ["sensitivity", 0.3], ["overthinking", 0.3]) },
      { id: "b", text: "凌晨三点发的那些矫情动态", score: 3, weights: w("performance", ["sensitivity", 0.3], ["overthinking", 0.3]) },
      { id: "c", text: "和自己的聊天记录（对，我给自己发消息）", score: 2, weights: w("performance", ["sensitivity", 0.3], ["overthinking", 0.3]) },
      { id: "d", text: "相册里那些截了但没发出去的图", score: 4, weights: w("performance", ["sensitivity", 0.3], ["overthinking", 0.3]) },
    ],
  },
  {
    id: 26,
    text: `你有没有那种"突然觉得身边所有人都在演戏"的时刻？`,
    dimension: "dissociation",
    reverse: true,
    options: [
      { id: "a", text: "没有，大家都挺真实的", score: 1, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "b", text: "有，包括我自己", score: 4, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "c", text: "我经常觉得自己在看一部关于自己的纪录片", score: 4, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
      { id: "d", text: "我不确定是他们在演戏，还是我在演戏", score: 3, weights: w("dissociation", ["performance", 0.3], ["numbness", 0.3]) },
    ],
  },
  {
    id: 27,
    text: `你收到一条"在吗？"的消息，\n你的第一反应是？`,
    dimension: "overthinking",
    options: [
      { id: "a", text: `回"在"，然后等对方说事`, score: 1, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "开始想是不是我做错了什么", score: 4, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "已读不回，等我想好了再说", score: 2, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: `直接回"借钱免谈"`, score: 3, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 28,
    text: `你最容易被哪种话伤到？`,
    dimension: "sensitivity",
    options: [
      { id: "a", text: "直白的批评", score: 2, weights: w("sensitivity", ["overthinking", 0.3], ["collapse", 0.3]) },
      { id: "b", text: `"你想太多了"`, score: 4, weights: w("sensitivity", ["overthinking", 0.3], ["collapse", 0.3]) },
      { id: "c", text: `"你怎么又这样"`, score: 3, weights: w("sensitivity", ["overthinking", 0.3], ["collapse", 0.3]) },
      { id: "d", text: "沉默，什么都不说", score: 3, weights: w("sensitivity", ["overthinking", 0.3], ["collapse", 0.3]) },
    ],
  },
  {
    id: 29,
    text: `你理想中的周末是？`,
    dimension: "withdrawal",
    options: [
      { id: "a", text: "和朋友出去浪", score: 1, weights: w("withdrawal", ["numbness", 0.3], ["performance", 0.3]) },
      { id: "b", text: "一个人待着，但发朋友圈假装在外面", score: 2, weights: w("withdrawal", ["numbness", 0.3], ["performance", 0.3]) },
      { id: "c", text: "睡到下午，然后躺在床上到天黑", score: 4, weights: w("withdrawal", ["numbness", 0.3], ["performance", 0.3]) },
      { id: "d", text: "计划了很多，但最后什么都没做", score: 3, weights: w("withdrawal", ["numbness", 0.3], ["performance", 0.3]) },
    ],
  },
  {
    id: 30,
    text: `你有没有那种"明明很近的人，\n却觉得ta很远"的感觉？`,
    dimension: "dependency",
    options: [
      { id: "a", text: "没有，我觉得和身边的人很近", score: 1, weights: w("dependency", ["withdrawal", 0.3], ["numbness", 0.3]) },
      { id: "b", text: "有，尤其是和父母", score: 2, weights: w("dependency", ["withdrawal", 0.3], ["numbness", 0.3]) },
      { id: "c", text: "有，我觉得没有人真正了解我", score: 3, weights: w("dependency", ["withdrawal", 0.3], ["numbness", 0.3]) },
      { id: "d", text: "我已经习惯了这种距离感", score: 4, weights: w("dependency", ["withdrawal", 0.3], ["numbness", 0.3]) },
    ],
  },
  {
    id: 31,
    text: `你在别人眼里是什么样的人？`,
    dimension: "performance",
    reverse: true,
    options: [
      { id: "a", text: "和真实的我差不多", score: 1, weights: w("performance", ["dissociation", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "一个开朗、好说话的人", score: 3, weights: w("performance", ["dissociation", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "一个独立、不需要帮助的人", score: 3, weights: w("performance", ["dissociation", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "不知道，我给每个人看到的都不一样", score: 4, weights: w("performance", ["dissociation", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 32,
    text: `你最容易在什么时候想起前任？`,
    dimension: "sensitivity",
    options: [
      { id: "a", text: "不想了，已经过去了", score: 1, weights: w("sensitivity", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "听到某首歌的时候", score: 3, weights: w("sensitivity", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "一个人吃饭的时候", score: 2, weights: w("sensitivity", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "开心的时候，因为开心会让我想起那些不开心", score: 4, weights: w("sensitivity", ["overthinking", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 33,
    text: `你发消息之前会反复修改吗？`,
    dimension: "overthinking",
    options: [
      { id: "a", text: "不会，想到什么发什么", score: 1, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "会，特别是发给在意的人", score: 3, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: `会，然后经常全部删掉只回一个"嗯"`, score: 4, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "我已经很少主动发消息了", score: 2, weights: w("overthinking", ["dependency", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 34,
    text: `如果让你给自己写一句墓志铭，\n你会写什么？`,
    dimension: "collapse",
    options: [
      { id: "a", text: "活过，爱过，够了", score: 1, weights: w("collapse", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "终于不用回消息了", score: 2, weights: w("collapse", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "这里躺着一个看起来很正常的人", score: 2, weights: w("collapse", ["numbness", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "我想了想，好像没什么值得写的", score: 4, weights: w("collapse", ["numbness", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 35,
    text: `朋友连续几天没找你聊天，\n你会？`,
    dimension: "dependency",
    options: [
      { id: "a", text: "没注意到，我也没找他们", score: 1, weights: w("dependency", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "b", text: "主动发一条消息试探一下", score: 3, weights: w("dependency", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "c", text: "开始想是不是我做错了什么", score: 4, weights: w("dependency", ["overthinking", 0.3], ["withdrawal", 0.3]) },
      { id: "d", text: "等他们来找我，我绝不先开口", score: 2, weights: w("dependency", ["overthinking", 0.3], ["withdrawal", 0.3]) },
    ],
  },
  {
    id: 36,
    text: `你上一次感到"心动"是什么时候？`,
    dimension: "numbness",
    options: [
      { id: "a", text: "最近，看到一个很好看的人", score: 1, weights: w("numbness", ["sensitivity", 0.3], ["collapse", 0.3]) },
      { id: "b", text: "不记得了，但我记得心动的感觉", score: 2, weights: w("numbness", ["sensitivity", 0.3], ["collapse", 0.3]) },
      { id: "c", text: "心动？我连心痛都快感觉不到了", score: 4, weights: w("numbness", ["sensitivity", 0.3], ["collapse", 0.3]) },
      { id: "d", text: "我只对食物心动过", score: 3, weights: w("numbness", ["sensitivity", 0.3], ["collapse", 0.3]) },
    ],
  },
];
