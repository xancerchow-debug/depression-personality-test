import type { Metadata } from "next";
import "./globals.css";
import CitySkyline from "@/components/CitySkyline";

export const metadata: Metadata = {
  title: "测测你的抑郁型人格 | 你不是不快乐，你只是形成了自己的精神天气",
  description:
    "一款情绪人格测试，帮你看见自己的精神状态画像。测测你属于哪种抑郁型人格——废墟观察员、深夜失联型、情绪防空洞……",
  keywords: [
    "抑郁人格测试",
    "情绪测试",
    "精神状态",
    "人格测试",
    "心理测试",
    "emo测试",
    "MBTI替代",
  ],
  openGraph: {
    title: "测测你的抑郁型人格",
    description: "你不是不快乐，你只是形成了自己的精神天气。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "测测你的抑郁型人格",
    description: "你不是不快乐，你只是形成了自己的精神天气。",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="theme-color" content="#0a0a0b" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <CitySkyline />
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
