import type { Metadata } from "next";
import "./globals.css";
import CitySkyline from "@/components/CitySkyline";

export const metadata: Metadata = {
  title: "测测你的互联网精神状态 | 12种人格，你是哪种？",
  description:
    "24道题审判你的互联网人格。已读乱回型、深夜刷新者、消息撤回人格、假装没事症候群……测完你会知道你到底是什么东西。",
  keywords: [
    "互联网人格测试",
    "精神状态测试",
    "人格审判",
    "心理测试",
    "emo测试",
    "已读乱回",
    "深夜emo",
    "社交电量",
  ],
  openGraph: {
    title: "测测你的互联网精神状态",
    description: "24道题审判你的人格。测完你会知道——你到底是什么东西。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "测测你的互联网精神状态",
    description: "24道题审判你的人格。测完你会知道——你到底是什么东西。",
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
