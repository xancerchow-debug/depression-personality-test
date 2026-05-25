import { Question, Dimension } from "@/types";

function w(primary: Dimension, ...secondaries: [Dimension, number][]): Record<Dimension, number> {
  const weights: Record<Dimension, number> = {
    rumination: 0, surveillance: 0, provocation: 0, masking: 0,
    testing: 0, avoidance: 0, isolation: 0, eruption: 0,
  };
  weights[primary] = 1.0;
  for (const [dim, weight] of secondaries) {
    weights[dim] = weight;
  }
  return weights;
}

export const questions: Question[] = [
  // ── rumination (3) 反复回想 ──
  {
    id: 1,
    text: "别人突然不回你消息的时候，\n你接下来会怎么做？",
    dimension: "rumination",
    options: [
      { id: "a", text: "放下手机去做别的事", score: 1, weights: w("rumination") },
      { id: "b", text: "过一会儿再看一次", score: 2, weights: w("rumination", ["surveillance", 0.3]) },
      { id: "c", text: "反复翻聊天记录，想自己是不是说错了什么", score: 3, weights: w("rumination", ["surveillance", 0.3]) },
      { id: "d", text: "把聊天记录翻到最早的一条，逐字逐句重新看", score: 4, weights: w("rumination", ["surveillance", 0.4]) },
    ],
  },
  {
    id: 2,
    text: "跟别人聊完天之后，\n你会不会反复回想自己说过的话？",
    dimension: "rumination",
    options: [
      { id: "a", text: "不会，聊完就忘了", score: 1, weights: w("rumination") },
      { id: "b", text: "偶尔会想一下有没有说错话", score: 2, weights: w("rumination", ["masking", 0.3]) },
      { id: "c", text: "会，而且会把聊天记录翻出来重新看", score: 3, weights: w("rumination", ["surveillance", 0.3]) },
      { id: "d", text: "会，一句话能反复想三天", score: 4, weights: w("rumination", ["masking", 0.4]) },
    ],
  },
  {
    id: 3,
    text: "你有没有在输入框里打了一大段话，\n反复改了好几遍，\n最后全部删掉只回了一个'嗯'？",
    dimension: "rumination",
    options: [
      { id: "a", text: "没有，想说什么就说什么", score: 1, weights: w("rumination") },
      { id: "b", text: "偶尔会犹豫一下，但最后还是会发出去", score: 2, weights: w("rumination", ["masking", 0.3]) },
      { id: "c", text: "经常，打了很多字最后只发一个表情包", score: 3, weights: w("rumination", ["masking", 0.3]) },
      { id: "d", text: "我的聊天记录里，输入框的内容永远比发出去的多十倍", score: 4, weights: w("rumination", ["masking", 0.4]) },
    ],
  },

  // ── surveillance (3) 主动监控 ──
  {
    id: 4,
    text: "你会不会偷偷看某个人的在线状态？",
    dimension: "surveillance",
    options: [
      { id: "a", text: "不会，我没注意过这些", score: 1, weights: w("surveillance") },
      { id: "b", text: "偶尔会注意一下", score: 2, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "c", text: "会，而且会记住对方一般什么时候在线", score: 3, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "d", text: "会，我能精确说出对方每天几点上线几点下线", score: 4, weights: w("surveillance", ["rumination", 0.4]) },
    ],
  },
  {
    id: 5,
    text: "你有没有在半夜打开某个人的朋友圈，\n从第一条翻到最后一条？",
    dimension: "surveillance",
    options: [
      { id: "a", text: "没有，我刷朋友圈很随意", score: 1, weights: w("surveillance") },
      { id: "b", text: "偶尔会多看几条", score: 2, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "c", text: "有，而且翻完之后还会反复看", score: 3, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "d", text: "有，我能翻到对方三年前的朋友圈", score: 4, weights: w("surveillance", ["rumination", 0.4]) },
    ],
  },
  {
    id: 6,
    text: "发完朋友圈之后，\n你会不会反复看谁点了赞？",
    dimension: "surveillance",
    options: [
      { id: "a", text: "发完就忘了", score: 1, weights: w("surveillance") },
      { id: "b", text: "会看一两次", score: 2, weights: w("surveillance", ["provocation", 0.3]) },
      { id: "c", text: "会反复看，特别关注某个人有没有点赞", score: 3, weights: w("surveillance", ["provocation", 0.3]) },
      { id: "d", text: "会，而且如果那个人没点赞我会想删掉那条朋友圈", score: 4, weights: w("surveillance", ["provocation", 0.4]) },
    ],
  },

  // ── provocation (3) 暗示试探 ──
  {
    id: 7,
    text: "你有没有发过一条朋友圈，\n其实是发给某一个人看的？",
    dimension: "provocation",
    options: [
      { id: "a", text: "没有，我发朋友圈就是想发", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会想一下某个人看到会怎么想", score: 2, weights: w("provocation", ["masking", 0.3]) },
      { id: "c", text: "会，而且会设置'仅某人可见'", score: 3, weights: w("provocation", ["masking", 0.3]) },
      { id: "d", text: "会，发完之后会反复看对方有没有反应", score: 4, weights: w("provocation", ["surveillance", 0.4]) },
    ],
  },
  {
    id: 8,
    text: "你有没有故意在对方面前提到别人，\n然后观察对方的反应？",
    dimension: "provocation",
    options: [
      { id: "a", text: "不会，我想到什么就说什么", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会，但不是故意的", score: 2, weights: w("provocation", ["testing", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有吃醋", score: 3, weights: w("provocation", ["testing", 0.3]) },
      { id: "d", text: "会，这是我试探对方的一种方式", score: 4, weights: w("provocation", ["testing", 0.4]) },
    ],
  },
  {
    id: 9,
    text: "你有没有转发过一首歌或者一段文字，\n希望某个人能看懂？",
    dimension: "provocation",
    options: [
      { id: "a", text: "没有，我转发就是觉得好", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会想一下对方看到会怎么想", score: 2, weights: w("provocation", ["masking", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有点赞或者评论", score: 3, weights: w("provocation", ["surveillance", 0.3]) },
      { id: "d", text: "会，发完之后会反复想对方看没看到", score: 4, weights: w("provocation", ["surveillance", 0.4]) },
    ],
  },

  // ── masking (3) 情绪伪装 ──
  {
    id: 10,
    text: "别人问你'最近怎么样'的时候，\n你一般怎么回？",
    dimension: "masking",
    options: [
      { id: "a", text: "如实说，好就说好，不好就说不好", score: 1, weights: w("masking") },
      { id: "b", text: "一般都说'还行'", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "会说'挺好的'，但其实不太好", score: 3, weights: w("masking", ["avoidance", 0.3]) },
      { id: "d", text: "说'没事'的速度比脑子转得还快", score: 4, weights: w("masking", ["avoidance", 0.4]) },
    ],
  },
  {
    id: 11,
    text: "你在群聊里发的那些'哈哈哈'，\n有多少是真的在笑？",
    dimension: "masking",
    options: [
      { id: "a", text: "大部分都是真的觉得好笑", score: 1, weights: w("masking") },
      { id: "b", text: "一半一半吧", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "大部分只是在配合气氛", score: 3, weights: w("masking", ["avoidance", 0.3]) },
      { id: "d", text: "我已经分不清了，笑只是我的默认反应", score: 4, weights: w("masking", ["isolation", 0.4]) },
    ],
  },
  {
    id: 12,
    text: "收到很暖的消息时，\n你一般怎么回？",
    dimension: "masking",
    options: [
      { id: "a", text: "会认真回复，表达感谢", score: 1, weights: w("masking") },
      { id: "b", text: "会回一个表情包", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "会故意回得很冷，因为怕自己太热情", score: 3, weights: w("masking", ["testing", 0.3]) },
      { id: "d", text: "会想很久，最后只回一个'嗯'", score: 4, weights: w("masking", ["rumination", 0.4]) },
    ],
  },

  // ── testing (3) 关系测试 ──
  {
    id: 13,
    text: "你有没有故意晚回消息，\n看对方会不会发第二条？",
    dimension: "testing",
    options: [
      { id: "a", text: "不会，看到就回", score: 1, weights: w("testing") },
      { id: "b", text: "偶尔会等一会儿再回", score: 2, weights: w("testing", ["masking", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有追着发", score: 3, weights: w("testing", ["surveillance", 0.3]) },
      { id: "d", text: "会，这是我确认对方在乎我的方式", score: 4, weights: w("testing", ["surveillance", 0.4]) },
    ],
  },
  {
    id: 14,
    text: "你有没有突然对一个人变冷淡，\n观察对方的反应？",
    dimension: "testing",
    options: [
      { id: "a", text: "不会，我对人一直挺稳定的", score: 1, weights: w("testing") },
      { id: "b", text: "偶尔会减少热情，但不是故意的", score: 2, weights: w("testing", ["masking", 0.3]) },
      { id: "c", text: "会，想看对方会不会主动来找我", score: 3, weights: w("testing", ["surveillance", 0.3]) },
      { id: "d", text: "会，而且我会一直等对方的反应", score: 4, weights: w("testing", ["surveillance", 0.4]) },
    ],
  },
  {
    id: 15,
    text: "你有没有故意说反话，\n看对方能不能听出来？",
    dimension: "testing",
    options: [
      { id: "a", text: "不会，我说话很直接", score: 1, weights: w("testing") },
      { id: "b", text: "偶尔会，但不是故意的", score: 2, weights: w("testing", ["provocation", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有听出来", score: 3, weights: w("testing", ["provocation", 0.3]) },
      { id: "d", text: "会，这是我试探对方的一种方式", score: 4, weights: w("testing", ["provocation", 0.4]) },
    ],
  },

  // ── avoidance (3) 冲突回避 ──
  {
    id: 16,
    text: "当你对一个人有意见的时候，\n你会怎么做？",
    dimension: "avoidance",
    options: [
      { id: "a", text: "会直接说出来", score: 1, weights: w("avoidance") },
      { id: "b", text: "会犹豫一下，但最后还是会说", score: 2, weights: w("avoidance", ["masking", 0.3]) },
      { id: "c", text: "会忍着不说，等对方自己发现", score: 3, weights: w("avoidance", ["masking", 0.3]) },
      { id: "d", text: "会假装没事，然后慢慢疏远", score: 4, weights: w("avoidance", ["isolation", 0.4]) },
    ],
  },
  {
    id: 17,
    text: "朋友约你出门，\n你心里不太想去的时候，\n你会怎么说？",
    dimension: "avoidance",
    options: [
      { id: "a", text: "会直接说不想去", score: 1, weights: w("avoidance") },
      { id: "b", text: "会说'看心情'", score: 2, weights: w("avoidance", ["masking", 0.3]) },
      { id: "c", text: "会找借口说有事", score: 3, weights: w("avoidance", ["masking", 0.3]) },
      { id: "d", text: "会答应去，但到了之后一直想走", score: 4, weights: w("avoidance", ["masking", 0.4]) },
    ],
  },
  {
    id: 18,
    text: "做决定的时候，\n你会不会先想'别人会怎么看'？",
    dimension: "avoidance",
    options: [
      { id: "a", text: "不会，我只考虑自己", score: 1, weights: w("avoidance") },
      { id: "b", text: "偶尔会想一下", score: 2, weights: w("avoidance", ["masking", 0.3]) },
      { id: "c", text: "会，而且会影响我的决定", score: 3, weights: w("avoidance", ["masking", 0.3]) },
      { id: "d", text: "会，我几乎不为自己做决定", score: 4, weights: w("avoidance", ["masking", 0.4]) },
    ],
  },

  // ── isolation (3) 情感隔离 ──
  {
    id: 19,
    text: "你上一次主动找朋友聊天，\n是什么时候？",
    dimension: "isolation",
    options: [
      { id: "a", text: "就在这两天", score: 1, weights: w("isolation") },
      { id: "b", text: "可能是一两周前吧", score: 2, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "c", text: "想不起来了，好像都是别人先找我", score: 3, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "d", text: "我已经很久没有主动联系任何人了", score: 4, weights: w("isolation", ["avoidance", 0.4]) },
    ],
  },
  {
    id: 20,
    text: "你有没有突然'消失'过，\n不回任何人消息？",
    dimension: "isolation",
    options: [
      { id: "a", text: "没有，我一直保持联系", score: 1, weights: w("isolation") },
      { id: "b", text: "偶尔会晚回，但不会完全消失", score: 2, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "c", text: "有，有时候会好几天不看消息", score: 3, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "d", text: "有，而且我消失的时候连解释的力气都没有", score: 4, weights: w("isolation", ["masking", 0.4]) },
    ],
  },
  {
    id: 21,
    text: "在一群人聊天的时候，\n你通常在做什么？",
    dimension: "isolation",
    options: [
      { id: "a", text: "积极参与，我是气氛组", score: 1, weights: w("isolation") },
      { id: "b", text: "偶尔插几句话", score: 2, weights: w("isolation", ["masking", 0.3]) },
      { id: "c", text: "大部分时间在听，不太想说话", score: 3, weights: w("isolation", ["masking", 0.3]) },
      { id: "d", text: "找个角落玩手机，希望没人注意到我", score: 4, weights: w("isolation", ["avoidance", 0.4]) },
    ],
  },

  // ── eruption (3) 情绪爆发 ──
  {
    id: 22,
    text: "你最容易在哪种时刻突然崩溃？",
    dimension: "eruption",
    options: [
      { id: "a", text: "我一般不会崩溃", score: 1, weights: w("eruption") },
      { id: "b", text: "压力特别大的时候", score: 2, weights: w("eruption", ["rumination", 0.3]) },
      { id: "c", text: "深夜独处的时候", score: 3, weights: w("eruption", ["isolation", 0.3]) },
      { id: "d", text: "在最放松、最没有防备的时候", score: 4, weights: w("eruption", ["masking", 0.4]) },
    ],
  },
  {
    id: 23,
    text: "你有没有过哭到停不下来，\n但事后完全不记得为什么哭？",
    dimension: "eruption",
    options: [
      { id: "a", text: "没有，我哭的原因都很明确", score: 1, weights: w("eruption") },
      { id: "b", text: "偶尔，但很快就停了", score: 2, weights: w("eruption", ["isolation", 0.3]) },
      { id: "c", text: "有，有时候不知道为什么就是想哭", score: 3, weights: w("eruption", ["isolation", 0.3]) },
      { id: "d", text: "有，哭完之后反而觉得更空了", score: 4, weights: w("eruption", ["isolation", 0.4]) },
    ],
  },
  {
    id: 24,
    text: "你最害怕的不是崩溃，\n而是崩溃的时候被人看到——对吗？",
    dimension: "eruption",
    reverse: true,
    options: [
      { id: "a", text: "不对，我不怕被人看到", score: 1, weights: w("eruption") },
      { id: "b", text: "有一点，但不是特别怕", score: 2, weights: w("eruption", ["masking", 0.3]) },
      { id: "c", text: "对，我崩溃的时候只想一个人待着", score: 3, weights: w("eruption", ["isolation", 0.3]) },
      { id: "d", text: "对，我宁愿憋着也不让任何人看到我哭", score: 4, weights: w("eruption", ["masking", 0.4]) },
    ],
  },
];

// Micro-feedback shown after certain question thresholds
export const FEEDBACK_MESSAGES: { after: number; message: string }[] = [
  { after: 3, message: "你删掉的话，比你说出口的多。" },
  { after: 6, message: "你翻了那么多人的朋友圈，但你自己的朋友圈空空的。" },
  { after: 9, message: "你发的每条朋友圈都是暗号，但你不确定有没有人收到。" },
  { after: 12, message: "你说'没事'说得太快了，连你自己都没来得及想。" },
  { after: 15, message: "你故意冷淡别人，但你比谁都怕对方真的走。" },
  { after: 18, message: "你一直在忍，但你已经忘了自己在忍什么了。" },
  { after: 21, message: "你把自己藏得很深。但你一直在暗处看着某个人。" },
];
