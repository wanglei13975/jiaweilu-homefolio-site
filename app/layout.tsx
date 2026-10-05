import type { Metadata } from "next";
import "./globals.css";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?pt=128677255&ct=site_home_changji_q4_2026&mt=8";

export const metadata: Metadata = {
  title: "家维录 · 家庭资产护照与维保账本",
  description: "记录家庭资产、型号、票据、保修、维护计划和真实服务支出。无需账户，无广告，默认本地保存。",
  other: { "apple-itunes-app": "app-id=6799400433, ct=site_home_changji_q4_2026, pt=128677255, mt=8" },
  icons: { icon: "/app-icon.png", apple: "/app-icon.png" },
  openGraph: { title: "家维录 · 房子的记忆，不该散落在相册里", description: "家庭资产护照与维保账本", images: ["/og-v2.png"] },
  twitter: { card: "summary_large_image", title: "家维录 · 家庭资产护照", description: "资产、保修、票据、维护与家庭支出，各归其位。", images: ["/og-v2.png"] }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hans"><body>{children}<div className="mobilePurchaseBar" aria-label="Pro 购买方案"><span><strong>终身 Pro ¥198</strong><small>一次性 · 年度 ¥68/年</small></span><a href={appStoreURL} target="_blank" rel="noreferrer">打开 App Store <span aria-hidden="true">↗</span></a></div><script defer src="/campaign-link.js" /></body></html>;
}
