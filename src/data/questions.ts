import { Question, Dimension } from "@/types";

function w(primary: Dimension, ...secondaries: [Dimension, number][]): Record<Dimension, number> {
  const weights: Record<Dimension, number> = {
    sensitivity: 0, withdrawal: 0, overthinking: 0, numbness: 0,
    performance: 0, dependency: 0, dissociation: 0, collapse: 0,
  };
  weights[primary] = 1.0;
  for (const [dim, weight] of secondaries) {
    weights[dim] = weight;
  }
  return weights;
}

export const questions: Question[] = [
  // ── overthinking (3) ──
  {
    id: 1,
    text: "你有没有在输入框里打了一大段话，\n反复改了三遍，\n然后全部删掉只回了一个'嗯'？",
    dimension: "overthinking",
    options: [
      { id: "a", text: "没有，想说什么就说什么", score: 1, weights: w("overthinking") },
      { id: "b", text: "偶尔会犹豫一下，但最后还是会发出去", score: 2, weights: w("overthinking", ["sensitivity", 0.3]) },
      { id: "c", text: "经常，打了很多字最后只发一个表情包", score: 3, weights: w("overthinking", ["sensitivity", 0.3]) },
      { id: "d", text: "我的聊天记录里，输入框的内容永远比发出去的多十倍", score: 4, weights: w("overthinking", ["sensitivity", 0.4]) },
    ],
  },
  {
    id: 2,
    text: "别人随口说的一句话，\n你会不会在脑子里反复回放，\n想'他是不是在暗示什么'？",
    dimension: "overthinking",
    options: [
      { id: "a", text: "不会，说啥就是啥", score: 1, weights: w("overthinking") },
      { id: "b", text: "有时候会想一下，但很快就放下了", score: 2, weights: w("overthinking", ["sensitivity", 0.3]) },
      { id: "c", text: "会，而且会想很久，越想越不对劲", score: 3, weights: w("overthinking", ["sensitivity", 0.3]) },
      { id: "d", text: "会，一句话能影响我一整天的心情", score: 4, weights: w("overthinking", ["sensitivity", 0.4]) },
    ],
  },
  {
    id: 3,
    text: "发完朋友圈之后，\n你会不会每隔几分钟就看一下\n有没有人点赞？",
    dimension: "overthinking",
    options: [
      { id: "a", text: "发完就忘了", score: 1, weights: w("overthinking") },
      { id: "b", text: "会看一两次，但不会特意去刷", score: 2, weights: w("overthinking", ["dependency", 0.3]) },
      { id: "c", text: "会反复看，没人赞就想删掉", score: 3, weights: w("overthinking", ["dependency", 0.3]) },
      { id: "d", text: "发之前就已经在想'没人赞怎么办'了", score: 4, weights: w("overthinking", ["dependency", 0.4]) },
    ],
  },

  // ── sensitivity (3) ──
  {
    id: 4,
    text: "你有没有因为一个很小的细节，\n突然觉得特别难过？\n比如一首歌、一句话、一个表情包？",
    dimension: "sensitivity",
    options: [
      { id: "a", text: "很少，我一般不会因为小事影响心情", score: 1, weights: w("sensitivity") },
      { id: "b", text: "偶尔会，但过一会儿就好了", score: 2, weights: w("sensitivity", ["overthinking", 0.3]) },
      { id: "c", text: "会，有时候一首歌就能让我破防", score: 3, weights: w("sensitivity", ["collapse", 0.3]) },
      { id: "d", text: "会，而且我会为这件小事难过很久", score: 4, weights: w("sensitivity", ["overthinking", 0.3]) },
    ],
  },
  {
    id: 5,
    text: "别人突然不回你消息的时候，\n你的第一反应是什么？",
    dimension: "sensitivity",
    options: [
      { id: "a", text: "可能在忙吧，无所谓", score: 1, weights: w("sensitivity") },
      { id: "b", text: "会想一下，但不会太在意", score: 2, weights: w("sensitivity", ["overthinking", 0.3]) },
      { id: "c", text: "会开始想自己是不是说错了什么", score: 3, weights: w("sensitivity", ["overthinking", 0.3]) },
      { id: "d", text: "会翻聊天记录找自己哪里不对", score: 4, weights: w("sensitivity", ["overthinking", 0.4]) },
    ],
  },
  {
    id: 6,
    text: "你有没有在便利店排队的时候，\n突然觉得特别孤独？",
    dimension: "sensitivity",
    options: [
      { id: "a", text: "没有，我在哪儿都挺自在的", score: 1, weights: w("sensitivity") },
      { id: "b", text: "偶尔会有这种感觉，但很快就过去了", score: 2, weights: w("sensitivity", ["numbness", 0.3]) },
      { id: "c", text: "会，尤其是在深夜", score: 3, weights: w("sensitivity", ["numbness", 0.3]) },
      { id: "d", text: "会，而且那种感觉会持续很久", score: 4, weights: w("sensitivity", ["numbness", 0.4]) },
    ],
  },

  // ── withdrawal (3) ──
  {
    id: 7,
    text: "周末朋友约你出门，\n你心里的第一反应是什么？",
    dimension: "withdrawal",
    options: [
      { id: "a", text: "开心，终于有事做了", score: 1, weights: w("withdrawal") },
      { id: "b", text: "看心情，有时候想去有时候不想", score: 2, weights: w("withdrawal", ["numbness", 0.3]) },
      { id: "c", text: "有点想去，但又觉得出门好累", score: 3, weights: w("withdrawal", ["numbness", 0.3]) },
      { id: "d", text: "找借口拒绝，然后一个人待着", score: 4, weights: w("withdrawal", ["numbness", 0.4]) },
    ],
  },
  {
    id: 8,
    text: "你上一次主动找朋友聊天，\n是什么时候？",
    dimension: "withdrawal",
    options: [
      { id: "a", text: "就在这两天", score: 1, weights: w("withdrawal") },
      { id: "b", text: "可能是一两周前吧", score: 2, weights: w("withdrawal", ["dependency", 0.3]) },
      { id: "c", text: "想不起来了，好像都是别人先找我", score: 3, weights: w("withdrawal", ["dissociation", 0.3]) },
      { id: "d", text: "我已经很久没有主动联系任何人了", score: 4, weights: w("withdrawal", ["dissociation", 0.3]) },
    ],
  },
  {
    id: 9,
    text: "在一群人聊天的时候，\n你通常在做什么？",
    dimension: "withdrawal",
    options: [
      { id: "a", text: "积极参与，我是气氛组", score: 1, weights: w("withdrawal") },
      { id: "b", text: "偶尔插几句话", score: 2, weights: w("withdrawal", ["performance", 0.3]) },
      { id: "c", text: "大部分时间在听，不太想说话", score: 3, weights: w("withdrawal", ["performance", 0.3]) },
      { id: "d", text: "找个角落玩手机，希望没人注意到我", score: 4, weights: w("withdrawal", ["performance", 0.4]) },
    ],
  },

  // ── numbness (3) ──
  {
    id: 10,
    text: "你上一次真心笑出来，\n是什么时候？",
    dimension: "numbness",
    options: [
      { id: "a", text: "今天就有啊", score: 1, weights: w("numbness") },
      { id: "b", text: "应该是最近几天吧", score: 2, weights: w("numbness", ["sensitivity", 0.3]) },
      { id: "c", text: "想不起来了，好像很久了", score: 3, weights: w("numbness", ["sensitivity", 0.3]) },
      { id: "d", text: "我不记得'真心'笑是什么感觉了", score: 4, weights: w("numbness", ["sensitivity", 0.4]) },
    ],
  },
  {
    id: 11,
    text: "当别人问你'最近怎么样'的时候，\n你真实的感受是什么？",
    dimension: "numbness",
    options: [
      { id: "a", text: "挺好的，真的挺好的", score: 1, weights: w("numbness") },
      { id: "b", text: "还行吧，没什么特别的", score: 2, weights: w("numbness", ["performance", 0.3]) },
      { id: "c", text: "不知道，我已经不太确定自己的感受了", score: 3, weights: w("numbness", ["dissociation", 0.3]) },
      { id: "d", text: "我感受不到任何东西，一切都淡淡的", score: 4, weights: w("numbness", ["dissociation", 0.4]) },
    ],
  },
  {
    id: 12,
    text: "你有没有过这种时刻：\n明明应该开心的事，\n但你就是开心不起来？",
    dimension: "numbness",
    reverse: true,
    options: [
      { id: "a", text: "没有，开心的事我会开心", score: 1, weights: w("numbness") },
      { id: "b", text: "偶尔会有这种感觉", score: 2, weights: w("numbness", ["collapse", 0.3]) },
      { id: "c", text: "经常，我好像已经失去了开心的能力", score: 3, weights: w("numbness", ["collapse", 0.3]) },
      { id: "d", text: "我已经习惯了，什么情绪都淡淡的", score: 4, weights: w("numbness", ["collapse", 0.4]) },
    ],
  },

  // ── performance (3) ──
  {
    id: 13,
    text: "你在群聊里发的那些'哈哈哈'，\n有多少是真的在笑？",
    dimension: "performance",
    options: [
      { id: "a", text: "大部分都是真的觉得好笑", score: 1, weights: w("performance") },
      { id: "b", text: "一半一半吧", score: 2, weights: w("performance", ["numbness", 0.3]) },
      { id: "c", text: "大部分只是在配合气氛", score: 3, weights: w("performance", ["numbness", 0.3]) },
      { id: "d", text: "我已经分不清了，笑只是我的默认反应", score: 4, weights: w("performance", ["numbness", 0.4]) },
    ],
  },
  {
    id: 14,
    text: "你有没有在朋友圈发过一条伤感文案，\n配了一张风景照，\n然后设置'仅自己可见'？",
    dimension: "performance",
    options: [
      { id: "a", text: "没有，我想发就发", score: 1, weights: w("performance") },
      { id: "b", text: "偶尔会犹豫一下，但最后还是发了", score: 2, weights: w("performance", ["withdrawal", 0.3]) },
      { id: "c", text: "有，发了又删了", score: 3, weights: w("performance", ["withdrawal", 0.3]) },
      { id: "d", text: "有，而且不止一次", score: 4, weights: w("performance", ["withdrawal", 0.4]) },
    ],
  },
  {
    id: 15,
    text: "当所有人都觉得你很开朗的时候，\n你真实的感受是什么？",
    dimension: "performance",
    options: [
      { id: "a", text: "我就是开朗啊，没什么好装的", score: 1, weights: w("performance") },
      { id: "b", text: "大部分时候是真的，偶尔会累", score: 2, weights: w("performance", ["numbness", 0.3]) },
      { id: "c", text: "那是演的，其实我已经很累了", score: 3, weights: w("performance", ["numbness", 0.3]) },
      { id: "d", text: "我已经分不清哪个是真的我了", score: 4, weights: w("performance", ["dissociation", 0.4]) },
    ],
  },

  // ── dependency (3) ──
  {
    id: 16,
    text: "你有没有那种'如果ta不回我消息\n我就很焦虑'的人？",
    dimension: "dependency",
    options: [
      { id: "a", text: "没有，谁不回我都无所谓", score: 1, weights: w("dependency") },
      { id: "b", text: "有一两个人，但不会太焦虑", score: 2, weights: w("dependency", ["sensitivity", 0.3]) },
      { id: "c", text: "有，而且我会反复看手机等回复", score: 3, weights: w("dependency", ["overthinking", 0.3]) },
      { id: "d", text: "有，ta不回消息我会觉得天塌了", score: 4, weights: w("dependency", ["overthinking", 0.4]) },
    ],
  },
  {
    id: 17,
    text: "一个人待着的时候，\n你通常是什么状态？",
    dimension: "dependency",
    options: [
      { id: "a", text: "很享受，终于有自己的时间了", score: 1, weights: w("dependency") },
      { id: "b", text: "还好，能接受", score: 2, weights: w("dependency", ["withdrawal", 0.3]) },
      { id: "c", text: "有点无聊，想找人说话", score: 3, weights: w("dependency", ["withdrawal", 0.3]) },
      { id: "d", text: "会很不安，需要有人在身边", score: 4, weights: w("dependency", ["collapse", 0.4]) },
    ],
  },
  {
    id: 18,
    text: "你做决定的时候，\n会不会先想'别人会怎么看'？",
    dimension: "dependency",
    options: [
      { id: "a", text: "不会，我只考虑自己", score: 1, weights: w("dependency") },
      { id: "b", text: "偶尔会想一下", score: 2, weights: w("dependency", ["performance", 0.3]) },
      { id: "c", text: "会，而且会影响我的决定", score: 3, weights: w("dependency", ["performance", 0.3]) },
      { id: "d", text: "会，我几乎不为自己做决定", score: 4, weights: w("dependency", ["performance", 0.4]) },
    ],
  },

  // ── dissociation (3) ──
  {
    id: 19,
    text: "你有没有过这种感觉：\n看着镜子里的自己，\n觉得有点陌生？",
    dimension: "dissociation",
    options: [
      { id: "a", text: "没有，那就是我啊", score: 1, weights: w("dissociation") },
      { id: "b", text: "偶尔会有这种感觉", score: 2, weights: w("dissociation", ["numbness", 0.3]) },
      { id: "c", text: "经常，有时候觉得自己像在看别人", score: 3, weights: w("dissociation", ["numbness", 0.3]) },
      { id: "d", text: "我已经不记得'真实感'是什么了", score: 4, weights: w("dissociation", ["numbness", 0.4]) },
    ],
  },
  {
    id: 20,
    text: "在人群中你会不会有种感觉：\n自己好像不属于这里？",
    dimension: "dissociation",
    options: [
      { id: "a", text: "不会，我在哪儿都挺自在的", score: 1, weights: w("dissociation") },
      { id: "b", text: "偶尔会有这种感觉", score: 2, weights: w("dissociation", ["withdrawal", 0.3]) },
      { id: "c", text: "经常，感觉自己像一个旁观者", score: 3, weights: w("dissociation", ["withdrawal", 0.3]) },
      { id: "d", text: "我好像一直活在自己的世界里，和现实隔着一层", score: 4, weights: w("dissociation", ["withdrawal", 0.4]) },
    ],
  },
  {
    id: 21,
    text: "你有没有突然'走神'的时候，\n感觉灵魂飘到了身体外面？",
    dimension: "dissociation",
    options: [
      { id: "a", text: "没有，我注意力挺集中的", score: 1, weights: w("dissociation") },
      { id: "b", text: "偶尔走神，但很快就回来了", score: 2, weights: w("dissociation", ["overthinking", 0.3]) },
      { id: "c", text: "会，有时候会突然觉得自己不在这里", score: 3, weights: w("dissociation", ["numbness", 0.3]) },
      { id: "d", text: "经常，我已经习惯了这种'飘着'的感觉", score: 4, weights: w("dissociation", ["numbness", 0.4]) },
    ],
  },

  // ── collapse (3) ──
  {
    id: 22,
    text: "你最容易在哪种时刻突然崩溃？",
    dimension: "collapse",
    options: [
      { id: "a", text: "我一般不会崩溃", score: 1, weights: w("collapse") },
      { id: "b", text: "压力特别大的时候", score: 2, weights: w("collapse", ["overthinking", 0.3]) },
      { id: "c", text: "深夜独处的时候", score: 3, weights: w("collapse", ["withdrawal", 0.3]) },
      { id: "d", text: "在最放松、最没有防备的时候", score: 4, weights: w("collapse", ["sensitivity", 0.4]) },
    ],
  },
  {
    id: 23,
    text: "你有没有过哭到停不下来，\n但事后完全不记得为什么哭？",
    dimension: "collapse",
    options: [
      { id: "a", text: "没有，我哭的原因都很明确", score: 1, weights: w("collapse") },
      { id: "b", text: "偶尔，但很快就停了", score: 2, weights: w("collapse", ["numbness", 0.3]) },
      { id: "c", text: "有，有时候不知道为什么就是想哭", score: 3, weights: w("collapse", ["numbness", 0.3]) },
      { id: "d", text: "有，哭完之后反而觉得更空了", score: 4, weights: w("collapse", ["numbness", 0.4]) },
    ],
  },
  {
    id: 24,
    text: "你最害怕的不是崩溃，\n而是崩溃的时候被人看到——对吗？",
    dimension: "collapse",
    reverse: true,
    options: [
      { id: "a", text: "不对，我不怕被人看到", score: 1, weights: w("collapse") },
      { id: "b", text: "有一点，但不是特别怕", score: 2, weights: w("collapse", ["performance", 0.3]) },
      { id: "c", text: "对，我崩溃的时候只想一个人待着", score: 3, weights: w("collapse", ["withdrawal", 0.3]) },
      { id: "d", text: "对，我宁愿憋着也不让任何人看到我哭", score: 4, weights: w("collapse", ["performance", 0.4]) },
    ],
  },
];

// Micro-feedback shown after certain question thresholds
export const FEEDBACK_MESSAGES: { after: number; message: string }[] = [
  { after: 3, message: "你删掉的话，比你说出口的多。" },
  { after: 6, message: "你总是在等别人先开口。但你有没有想过，对方也在等你？" },
  { after: 9, message: "你在人前笑得很大声。但你已经很久没有真心笑过了。" },
  { after: 12, message: "你已经习惯了不感受。不是不想，是太累了。" },
  { after: 15, message: "你在别人面前演了太久。你还记得不演的自己长什么样吗？" },
  { after: 18, message: "你总是在等别人先主动。但对方也在等你。最后谁都没有开口。" },
  { after: 21, message: "你把自己藏得很深。但你一直在暗处看着某个人。" },
];
