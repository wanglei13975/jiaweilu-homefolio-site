import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?ct=github_warranty_checklist&mt=8";

export const metadata: Metadata = {
  title: "家电保修到期提醒清单 · 家维录",
  description: "用一份简单清单整理家电保修、票据、序列号和维修记录，提前发现即将到期的保修事项。",
  openGraph: {
    title: "家电保修到期提醒清单 · 家维录",
    description: "家电保修、票据、序列号和维修记录，一份清单先整理清楚。",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "家电保修到期提醒清单 · 家维录",
    description: "提前整理家电保修和维修记录，避免错过重要日期。",
    images: ["/og-v2.png"],
  },
};

const checklist = [
  ["记下设备身份", "设备名称、房间、品牌、型号和序列号。报修、退换或搬家时，这些信息比一张模糊照片更容易核对。"],
  ["找到购买凭证", "保存发票、收据、订单号和购买渠道，并记下购买日期。电子凭证可以先保留原文件，再在设备档案中添加位置说明。"],
  ["算出保修截止日", "区分整机保修、主要部件保修和延保服务，分别记录起止日期；不要只记“买了几年”，因为不同设备的规则可能不同。"],
  ["留下维修经过", "每次服务记录日期、故障、服务商、费用、耗材和处理结果。维修凭证与现场照片放在同一件设备下面，之后更容易追溯。"],
  ["设置下一次提醒", "滤芯、空调清洁、燃气设备检查和报警器测试等事项，写下周期和下次日期；涉及燃气、电气或结构安全时，联系专业人员。"],
];

export default function WarrantyChecklistPage() {
  return <main>
    <nav className="nav"><Link className="wordmark" href="/"><Image src="/app-icon.png" width={38} height={38} alt="家维录图标"/><span>家维录</span></Link><div><Link href="/maintenance-calculator">免费工具</Link><Link href="/home-maintenance">保养指南</Link><Link href="/warranty-checklist">保修清单</Link><Link href="/privacy">隐私</Link><Link href="/support">支持</Link></div></nav>
    <article className="guide">
      <p className="eyebrow">家电保修 · 票据 · 维修记录</p>
      <h1>家电保修到期提醒，<br/><em>先从一份清单开始。</em></h1>
      <p className="lead">保修期真正要用时，最难找的往往不是日期，而是型号、序列号、票据和上次维修经过。按下面五步整理一件设备，就能少翻一次相册和聊天记录。</p>
      <div className="guideGrid">
        <div className="guideCards">{checklist.map(([title, copy], index) => <section className="guideCard" key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></section>)}</div>
        <Image className="guideImage" src="/assets.png" width={310} height={674} alt="家维录家庭资产档案与保修记录"/>
      </div>
      <section className="guideBottom"><h2>把一次性清单，变成长期档案</h2><p>家维录可以把设备、票据、保修日期、维护计划和每次服务费用放在同一件资产下面。基础记录免费开始；Pro 可保存无限资产、票据与服务凭证，并导出 PDF 报告。</p><a className="storeCta" href={appStoreURL} target="_blank" rel="noreferrer">在 App Store 下载家维录 <span>↗</span></a><p className="availability">中国区 9 月 1 日至 25 日终身 Pro ¥6，9 月 26 日恢复 ¥198；年度 Pro ¥68/年。实际价格与可用性以 App Store 最终展示为准。</p></section>
    </article>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/">首页</Link><Link href="/home-maintenance">保养指南</Link><Link href="/privacy">隐私政策</Link><Link href="/support">帮助与支持</Link></div></footer>
  </main>;
}
