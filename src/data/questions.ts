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

// ═══ 路径判别题（前5题固定顺序，不参与 shuffle）═══
// 每个选项的 weights 加重对应路径的维度，确保路径锁定
const pathDiscriminator: Question[] = [
  {
    id: 1,
    text: `别人突然不回你消息的时候，\n你接下来会怎么做？`,
    dimension: "rumination",
    options: [
      { id: "a", text: "反复想是不是自己说错了什么", score: 4, weights: w("rumination", ["surveillance", 0.5]) },
      { id: "b", text: "故意也变冷淡，不主动发消息", score: 4, weights: w("avoidance", ["masking", 0.5]) },
      { id: "c", text: "发一条朋友圈暗示自己的心情", score: 4, weights: w("provocation", ["testing", 0.5]) },
      { id: "d", text: "告诉自己没事，然后继续刷手机", score: 4, weights: w("masking", ["isolation", 0.5]) },
    ],
  },
  {
    id: 2,
    text: `深夜睡不着的时候，\n你通常在做什么？`,
    dimension: "surveillance",
    options: [
      { id: "a", text: "翻某个人的朋友圈，从头看到尾", score: 4, weights: w("surveillance", ["rumination", 0.5]) },
      { id: "b", text: "戴着耳机听歌，假装世界不存在", score: 4, weights: w("avoidance", ["isolation", 0.5]) },
      { id: "c", text: "发一条动态，然后反复看有没有人回应", score: 4, weights: w("provocation", ["surveillance", 0.5]) },
      { id: "d", text: "告诉自己明天会好一点", score: 4, weights: w("masking", ["eruption", 0.5]) },
    ],
  },
  {
    id: 3,
    text: `当一个人突然对你变冷淡时，\n你的第一反应是什么？`,
    dimension: "rumination",
    options: [
      { id: "a", text: "反复回想自己是不是做错了什么", score: 4, weights: w("rumination", ["surveillance", 0.5]) },
      { id: "b", text: "故意也变冷淡，看对方什么反应", score: 4, weights: w("testing", ["avoidance", 0.5]) },
      { id: "c", text: "发一条朋友圈，希望对方能看到", score: 4, weights: w("provocation", ["masking", 0.5]) },
      { id: "d", text: "假装没注意到，维持正常社交", score: 4, weights: w("masking", ["avoidance", 0.5]) },
    ],
  },
  {
    id: 4,
    text: `当你看到喜欢的人和别人聊得很开心，\n你会怎么做？`,
    dimension: "surveillance",
    options: [
      { id: "a", text: "控制不住地反复回想那个画面", score: 4, weights: w("rumination", ["surveillance", 0.5]) },
      { id: "b", text: "戴上耳机，假装没看到", score: 4, weights: w("isolation", ["avoidance", 0.5]) },
      { id: "c", text: "故意和身边的人表现得很亲密", score: 4, weights: w("provocation", ["testing", 0.5]) },
      { id: "d", text: "假装无所谓，但心里特别难受", score: 4, weights: w("masking", ["eruption", 0.5]) },
    ],
  },
  {
    id: 5,
    text: `收到一条很温暖的消息，\n你会怎么回？`,
    dimension: "masking",
    options: [
      { id: "a", text: "想很久才回，怕自己说错话", score: 4, weights: w("rumination", ["masking", 0.5]) },
      { id: "b", text: "只回一个表情包或者'嗯'", score: 4, weights: w("avoidance", ["masking", 0.5]) },
      { id: "c", text: "会认真回，然后期待对方的下一条", score: 4, weights: w("testing", ["provocation", 0.5]) },
      { id: "d", text: "回'哈哈谢谢'，然后把手机扣过去", score: 4, weights: w("masking", ["isolation", 0.5]) },
    ],
  },
];

// ═══ 路径细化题（后19题参与 shuffle）═══
const refinementQuestions: Question[] = [
  // ── rumination 反复回想 ──
  {
    id: 6,
    text: `跟别人聊完天之后，\n你会不会反复回想自己说过的话？`,
    dimension: "rumination",
    options: [
      { id: "a", text: "不会，聊完就忘了", score: 1, weights: w("rumination") },
      { id: "b", text: "偶尔会想一下有没有说错话", score: 2, weights: w("rumination", ["masking", 0.3]) },
      { id: "c", text: "会，而且会把聊天记录翻出来重新看", score: 3, weights: w("rumination", ["surveillance", 0.3]) },
      { id: "d", text: "会，一句话能反复想三天", score: 4, weights: w("rumination", ["masking", 0.4]), feedback: "你记住的不是那句话，是说那句话时的自己。" },
    ],
  },
  {
    id: 7,
    text: `你有没有在输入框里打了一大段话，\n反复改了好几遍，\n最后全部删掉只回了一个'嗯'？`,
    dimension: "rumination",
    options: [
      { id: "a", text: "没有，想说什么就说什么", score: 1, weights: w("rumination") },
      { id: "b", text: "偶尔会犹豫一下，但最后还是会发出去", score: 2, weights: w("rumination", ["masking", 0.3]) },
      { id: "c", text: "经常，打了很多字最后只发一个表情包", score: 3, weights: w("rumination", ["masking", 0.3]) },
      { id: "d", text: "我的输入框里，删掉的字比发出去的多十倍", score: 4, weights: w("rumination", ["masking", 0.4]), feedback: "你删掉的话，比你说出口的多。" },
    ],
  },
  {
    id: 20,
    text: `你发消息之前，\n会不会在脑子里先'演练'一遍对方的回复？`,
    dimension: "rumination",
    options: [
      { id: "a", text: "不会，想到什么就说到什么", score: 1, weights: w("rumination") },
      { id: "b", text: "偶尔会想一下", score: 2, weights: w("rumination", ["masking", 0.3]) },
      { id: "c", text: "会，而且经常因为想太多而迟迟不发", score: 3, weights: w("rumination", ["avoidance", 0.3]) },
      { id: "d", text: "会，有时候要花很长时间才能发出一条消息", score: 4, weights: w("rumination", ["avoidance", 0.4]) },
    ],
  },

  // ── surveillance 主动监控 ──
  {
    id: 8,
    text: `你会不会偷偷看某个人的在线状态？`,
    dimension: "surveillance",
    options: [
      { id: "a", text: "不会，我没注意过这些", score: 1, weights: w("surveillance") },
      { id: "b", text: "偶尔会注意一下", score: 2, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "c", text: "会，而且会记住对方一般什么时候在线", score: 3, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "d", text: "会，我能精确说出对方每天几点上线几点下线", score: 4, weights: w("surveillance", ["rumination", 0.4]), feedback: "你记住了一个不该记住的人的时间表。" },
    ],
  },
  {
    id: 9,
    text: `你有没有在半夜打开某个人的朋友圈，\n从第一条翻到最后一条？`,
    dimension: "surveillance",
    options: [
      { id: "a", text: "没有，我刷朋友圈很随意", score: 1, weights: w("surveillance") },
      { id: "b", text: "偶尔会多看几条", score: 2, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "c", text: "有，而且翻完之后还会反复看", score: 3, weights: w("surveillance", ["rumination", 0.3]) },
      { id: "d", text: "有，我能翻到对方三年前的朋友圈", score: 4, weights: w("surveillance", ["rumination", 0.4]), feedback: "你翻了那么多人的朋友圈，但你自己的朋友圈空空的。" },
    ],
  },
  {
    id: 10,
    text: `发完朋友圈之后，\n你会不会反复看谁点了赞？`,
    dimension: "surveillance",
    options: [
      { id: "a", text: "发完就忘了", score: 1, weights: w("surveillance") },
      { id: "b", text: "会看一两次", score: 2, weights: w("surveillance", ["provocation", 0.3]) },
      { id: "c", text: "会反复看，特别关注某个人有没有点赞", score: 3, weights: w("surveillance", ["provocation", 0.3]) },
      { id: "d", text: "会，而且如果那个人没点赞我会想删掉那条朋友圈", score: 4, weights: w("surveillance", ["provocation", 0.4]), feedback: "你在意的不是谁点赞，而是那个人有没有点赞。" },
    ],
  },

  // ── provocation 暗示试探 ──
  {
    id: 11,
    text: `你有没有发过一条朋友圈，\n其实是发给某一个人看的？`,
    dimension: "provocation",
    options: [
      { id: "a", text: "没有，我发朋友圈就是想发", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会想一下某个人看到会怎么想", score: 2, weights: w("provocation", ["masking", 0.3]) },
      { id: "c", text: "会，而且会设置'仅某人可见'", score: 3, weights: w("provocation", ["masking", 0.3]) },
      { id: "d", text: "会，发完之后会反复看对方有没有反应", score: 4, weights: w("provocation", ["surveillance", 0.4]), feedback: "你发的每条朋友圈都是暗号，但你不确定有没有人收到。" },
    ],
  },
  {
    id: 16,
    text: `你有没有转发过一首歌或者一段文字，\n希望某个人能看懂？`,
    dimension: "provocation",
    options: [
      { id: "a", text: "没有，我转发就是觉得好", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会想一下对方看到会怎么想", score: 2, weights: w("provocation", ["masking", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有点赞或者评论", score: 3, weights: w("provocation", ["surveillance", 0.3]) },
      { id: "d", text: "会，发完之后会反复想对方看没看到", score: 4, weights: w("provocation", ["surveillance", 0.4]), feedback: "你转发的每首歌都是一封寄不出去的信。" },
    ],
  },
  {
    id: 23,
    text: `你有没有故意在对方面前提到别人，\n然后观察对方的反应？`,
    dimension: "provocation",
    options: [
      { id: "a", text: "不会，我想到什么就说什么", score: 1, weights: w("provocation") },
      { id: "b", text: "偶尔会，但不是故意的", score: 2, weights: w("provocation", ["testing", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有吃醋", score: 3, weights: w("provocation", ["testing", 0.3]) },
      { id: "d", text: "会，这是我试探对方的一种方式", score: 4, weights: w("provocation", ["testing", 0.4]) },
    ],
  },

  // ── masking 情绪伪装 ──
  {
    id: 12,
    text: `别人问你'最近怎么样'的时候，\n你一般怎么回？`,
    dimension: "masking",
    options: [
      { id: "a", text: "如实说，好就说好，不好就说不好", score: 1, weights: w("masking") },
      { id: "b", text: "一般都说'还行'", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "会说'挺好的'，但其实不太好", score: 3, weights: w("masking", ["avoidance", 0.3]) },
      { id: "d", text: "说'没事'的速度比脑子转得还快", score: 4, weights: w("masking", ["avoidance", 0.4]), feedback: "你说'没事'说得太快了，连你自己都没来得及想。" },
    ],
  },
  {
    id: 17,
    text: `你在群聊里发的那些'哈哈哈'，\n有多少是真的在笑？`,
    dimension: "masking",
    options: [
      { id: "a", text: "大部分都是真的觉得好笑", score: 1, weights: w("masking") },
      { id: "b", text: "一半一半吧", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "大部分只是在配合气氛", score: 3, weights: w("masking", ["avoidance", 0.3]) },
      { id: "d", text: "我已经分不清了，笑只是我的默认反应", score: 4, weights: w("masking", ["isolation", 0.4]), feedback: "你发的哈哈哈里，有多少是假的你自己都数不清。" },
    ],
  },
  {
    id: 22,
    text: `有人关心你的时候，\n你的第一反应是什么？`,
    dimension: "masking",
    options: [
      { id: "a", text: "会觉得温暖，然后自然地回应", score: 1, weights: w("masking") },
      { id: "b", text: "会有点不自在，但会接受", score: 2, weights: w("masking", ["avoidance", 0.3]) },
      { id: "c", text: "会下意识后退，觉得不习惯", score: 3, weights: w("masking", ["avoidance", 0.3]) },
      { id: "d", text: "会说'我没事'，然后转移话题", score: 4, weights: w("masking", ["avoidance", 0.4]), feedback: "你不是不想要关心，你是不知道怎么接住它。" },
    ],
  },

  // ── testing 关系测试 ──
  {
    id: 13,
    text: `你有没有故意晚回消息，\n看对方会不会发第二条？`,
    dimension: "testing",
    options: [
      { id: "a", text: "不会，看到就回", score: 1, weights: w("testing") },
      { id: "b", text: "偶尔会等一会儿再回", score: 2, weights: w("testing", ["masking", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有追着发", score: 3, weights: w("testing", ["surveillance", 0.3]) },
      { id: "d", text: "会，这是我确认对方在乎我的方式", score: 4, weights: w("testing", ["surveillance", 0.4]), feedback: "你在等对方追上来，但你从不开口说。" },
    ],
  },
  {
    id: 18,
    text: `你有没有故意说反话，\n看对方能不能听出来？`,
    dimension: "testing",
    options: [
      { id: "a", text: "不会，我说话很直接", score: 1, weights: w("testing") },
      { id: "b", text: "偶尔会，但不是故意的", score: 2, weights: w("testing", ["provocation", 0.3]) },
      { id: "c", text: "会，而且会看对方有没有听出来", score: 3, weights: w("testing", ["provocation", 0.3]) },
      { id: "d", text: "会，这是我试探对方的一种方式", score: 4, weights: w("testing", ["provocation", 0.4]), feedback: "你说反话的时候，其实希望对方能听出来。" },
    ],
  },

  // ── avoidance 冲突回避 ──
  {
    id: 14,
    text: `当你对一个人有意见的时候，\n你会怎么做？`,
    dimension: "avoidance",
    options: [
      { id: "a", text: "会直接说出来", score: 1, weights: w("avoidance") },
      { id: "b", text: "会犹豫一下，但最后还是会说", score: 2, weights: w("avoidance", ["masking", 0.3]) },
      { id: "c", text: "会忍着不说，等对方自己发现", score: 3, weights: w("avoidance", ["masking", 0.3]) },
      { id: "d", text: "会假装没事，然后慢慢疏远", score: 4, weights: w("avoidance", ["isolation", 0.4]), feedback: "你一直在忍，但你已经忘了自己在忍什么了。" },
    ],
  },
  {
    id: 19,
    text: `做决定的时候，\n你会不会先想'别人会怎么看'？`,
    dimension: "avoidance",
    options: [
      { id: "a", text: "不会，我只考虑自己", score: 1, weights: w("avoidance") },
      { id: "b", text: "偶尔会想一下", score: 2, weights: w("avoidance", ["masking", 0.3]) },
      { id: "c", text: "会，而且会影响我的决定", score: 3, weights: w("avoidance", ["masking", 0.3]) },
      { id: "d", text: "会，我几乎不为自己做决定", score: 4, weights: w("avoidance", ["masking", 0.4]) },
    ],
  },

  // ── isolation 情感隔离 ──
  {
    id: 15,
    text: `你上一次主动找朋友聊天，\n是什么时候？`,
    dimension: "isolation",
    options: [
      { id: "a", text: "就在这两天", score: 1, weights: w("isolation") },
      { id: "b", text: "可能是一两周前吧", score: 2, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "c", text: "想不起来了，好像都是别人先找我", score: 3, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "d", text: "我已经很久没有主动联系任何人了", score: 4, weights: w("isolation", ["avoidance", 0.4]), feedback: "你不是不想联系，你是怕对方觉得你烦。" },
    ],
  },
  {
    id: 21,
    text: `在人群中戴耳机的时候，\n你一般在听什么？`,
    dimension: "isolation",
    options: [
      { id: "a", text: "在听歌，享受音乐", score: 1, weights: w("isolation") },
      { id: "b", text: "有时候什么都没在听，只是不想被打扰", score: 2, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "c", text: "耳机是我的社交屏障，摘下来会不安全", score: 3, weights: w("isolation", ["avoidance", 0.3]) },
      { id: "d", text: "我戴耳机不是为了听歌，是为了不被搭话", score: 4, weights: w("isolation", ["avoidance", 0.4]), feedback: "你的耳机不是在放歌，是在隔绝世界。" },
    ],
  },

  // ── eruption 情绪爆发 ──
  {
    id: 24,
    text: `你有没有过哭到停不下来，\n但事后完全不记得为什么哭？`,
    dimension: "eruption",
    options: [
      { id: "a", text: "没有，我哭的原因都很明确", score: 1, weights: w("eruption") },
      { id: "b", text: "偶尔，但很快就停了", score: 2, weights: w("eruption", ["isolation", 0.3]) },
      { id: "c", text: "有，有时候不知道为什么就是想哭", score: 3, weights: w("eruption", ["isolation", 0.3]) },
      { id: "d", text: "有，哭完之后反而觉得更空了", score: 4, weights: w("eruption", ["isolation", 0.4]) },
    ],
  },
];

export const questions: Question[] = [...pathDiscriminator, ...refinementQuestions];

// 固定顺序的前5题（路径判别题）
export const PATH_DISCRIMINATOR_COUNT = pathDiscriminator.length;

// 可 shuffle 的细化题
export const refinementQuestionPool: Question[] = refinementQuestions;
