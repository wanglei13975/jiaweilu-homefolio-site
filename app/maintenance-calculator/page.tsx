import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MaintenanceCalculator from "./MaintenanceCalculator";

export const metadata: Metadata = {
  title: "家庭保养日期计算器 · 家维录",
  description: "免费计算空调、净水器、热水器等家庭设备的下次保养日期，并把维护记录保存到家维录。",
  openGraph: {
    title: "家庭保养日期计算器 · 家维录",
    description: "免费计算家庭设备的下次保养日期，再把记录保存到家维录。",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "家庭保养日期计算器 · 家维录",
    description: "免费计算家庭设备的下次保养日期。",
    images: ["/og-v2.png"],
  },
};

export default function MaintenanceCalculatorPage() {
  return <main>
    <nav className="nav"><Link className="wordmark" href="/"><Image src="/app-icon.png" width={38} height={38} alt="家维录图标"/><span>家维录</span></Link><div><Link href="/maintenance-calculator">免费工具</Link><Link href="/home-maintenance">保养指南</Link><Link href="/privacy">隐私</Link><Link href="/support">支持</Link></div></nav>
    <article className="guide calculatorPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "家庭保养日期计算器 · 家维录", url: "https://wanglei13975.github.io/jiaweilu-homefolio-site/maintenance-calculator/", applicationCategory: "UtilitiesApplication", operatingSystem: "Web browser", isAccessibleForFree: true, description: "免费计算家庭设备的下次保养日期。" }) }} />
      <p className="eyebrow">免费家庭维护工具</p>
      <h1>算出下一次保养日期，<br/><em>把提醒变成一份记录。</em></h1>
      <p className="lead">选择设备、上次保养日期和提醒周期，马上得到一个可保存的日期。家维录可以继续保存型号、保修、票据、服务费用和维护历史。</p>
      <MaintenanceCalculator />
      <section className="guideBottom"><h2>为什么还要保存记录？</h2><p>一个日期只能告诉你“什么时候做”，一份资产档案还能告诉你“是什么设备、上次做了什么、花了多少钱、凭证在哪里”。基础记录免费开始，Pro 可保存无限资产、票据与服务凭证，并导出 PDF 报告。</p><a className="storeCta" href="https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?ppid=4c3c6cef-a4c4-4751-856e-2fae65b8bb77&ct=github_maintenance_calculator&mt=8" target="_blank" rel="noreferrer">下载家维录保存维护历史 <span>↗</span></a><p className="availability">中国区 9 月 1 日至 25 日终身 Pro ¥6，9 月 26 日恢复 ¥198；年度 Pro ¥68/年。实际价格与可用性以 App Store 最终展示为准。</p></section>
    </article>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/">首页</Link><Link href="/home-maintenance">保养指南</Link><Link href="/privacy">隐私政策</Link></div></footer>
  </main>;
}
