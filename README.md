# 测测你的抑郁型人格

一款情绪人格测试，帮你看见自己的精神状态画像。

**"你不是不快乐，你只是形成了自己的精神天气。"**

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

复制 `.env.example` 为 `.env.local`，填入你的 Supabase 配置：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

不配置 Supabase 也可以运行，测试结果会保存在浏览器本地。

## Supabase 数据库设置

1. 在 [Supabase](https://supabase.com) 创建项目
2. 进入 SQL Editor
3. 运行 `supabase/schema.sql` 中的 SQL 语句
4. 将项目 URL 和 Anon Key 填入 `.env.local`

## 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

## 技术栈

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页
│   ├── test/page.tsx     # 测试页
│   ├── loading/page.tsx  # 加载动画页
│   ├── result/page.tsx   # 结果页
│   └── api/              # API 路由
├── components/           # 组件
├── data/
│   ├── personalities.ts  # 8种人格数据
│   └── questions.ts      # 24道测试题
├── lib/
│   ├── utils.ts          # 工具函数
│   └── supabase.ts       # Supabase 客户端
└── types/                # TypeScript 类型定义
```

## 免责声明

本测试仅供娱乐和自我探索，不构成任何医学诊断或心理评估。如果你正在经历情绪困扰，请寻求专业心理咨询师的帮助。
