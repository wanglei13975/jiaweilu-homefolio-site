import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "家维录 · 家庭资产护照与维保账本",
  description: "记录家庭资产、型号、票据、保修、维护计划和真实服务支出。无需账户，无广告，默认本地保存。",
  icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
  openGraph: { title: "家维录 · 房子的记忆，不该散落在相册里", description: "家庭资产护照与维保账本", images: ["/og-v2.png"] },
  twitter: { card: "summary_large_image", title: "家维录 · 家庭资产护照", description: "资产、保修、票据、维护与家庭支出，各归其位。", images: ["/og-v2.png"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hans"><body>{children}</body></html>;
}
