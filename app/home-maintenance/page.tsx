import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?ct=github_home_maintenance&mt=8";

export const metadata: Metadata = {
  title: "家庭资产管理与保养提醒 · 家维录",
  description: "记录家电、家具和家庭设备的购买、保修、维修与保养，让每次维护都有凭证可查。",
  openGraph: {
    title: "家庭资产管理与保养提醒 · 家维录",
    description: "记录家电、家具和家庭设备的购买、保修与维护。",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "家庭资产管理与保养提醒 · 家维录",
    description: "让每次家庭维护都有凭证可查。",
    images: ["/og-v2.png"],
  },
};

const reasons = [
  ["买了什么", "记录品牌、型号、序列号、购买日期和价格，换机或报修时不用再翻聊天记录。"],
  ["什么时候到期", "把保修期和维护计划放在同一件资产下面，提前看见需要处理的事项。"],
  ["花了多少钱", "保存服务商、维修凭证和真实支出，回头能看懂一件设备的长期成本。"],
];

export default function HomeMaintenance() {
  return <main>
    <nav className="nav"><Link className="wordmark" href="/"><Image src="/app-icon.png" width={38} height={38} alt="家维录图标"/><span>家维录</span></Link><div><Link href="/home-maintenance">保养指南</Link><Link href="/privacy">隐私</Link><Link href="/support">支持</Link></div></nav>
    <article className="guide">
      <p className="eyebrow">家庭资产管理 · 保修 · 维护</p>
      <h1>家电保修、维修和保养，<br/><em>别再散落在相册和聊天里。</em></h1>
      <p className="lead">家维录把家里的设备、票据、保修和维护记录放回同一份家庭档案。需要报修、搬家或规划下一次保养时，打开就能找到。</p>
      <div className="guideGrid">
        <div className="guideCards">{reasons.map(([title, copy], index) => <section className="guideCard" key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></section>)}</div>
        <Image className="guideImage" src="/assets.png" width={310} height={674} alt="家维录家庭资产列表与保修记录"/>
      </div>
      <section className="guideBottom"><h2>从一件最常用的设备开始</h2><p>冰箱、空调、洗衣机、热水器或家具都可以先记录。基础资产记录免费使用；无限资产、票据与服务凭证、成本洞察和 PDF 报告可在 App 内选择 Pro。</p><a className="storeCta" href={appStoreURL} target="_blank" rel="noreferrer">在 App Store 下载家维录 <span>↗</span></a><p className="availability">当前中国区 Apple 显示：年度 Pro ¥68/年，终身 Pro ¥198。实际价格与可用性以 App Store 最终展示为准。</p></section>
    </article>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/">首页</Link><Link href="/privacy">隐私政策</Link><Link href="/support">帮助与支持</Link></div></footer>
  </main>;
}
