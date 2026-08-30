import Image from "next/image";
import Link from "next/link";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?ct=github_jiaweilu&mt=8";

const features = [
  { number: "01", title: "一件资产，一份完整档案", copy: "型号、序列号、购买价格、保修日期、铭牌和票据，都放回正确的位置。" },
  { number: "02", title: "维护不是提醒，是长期记录", copy: "从 20 个中文家庭维护模板开始，每次服务同时留下费用、服务商和凭证。" },
  { number: "03", title: "看懂家的真实投入", copy: "用自己的记录计算年度维护支出、未来成本与到期风险，不制造夸张的 AI 结论。" },
];

export default function Home() {
  return <main>
    <nav className="nav"><Link className="wordmark" href="/"><Image src="/app-icon.png" width={38} height={38} alt="家维录图标"/><span>家维录</span></Link><div><a href="#features">功能</a><Link href="/privacy">隐私</Link><Link href="/support">支持</Link></div></nav>
    <section className="hero">
      <div className="heroCopy"><p className="eyebrow">家庭资产护照 · 默认私密</p><h1>房子的记忆，<br/><em>不该散落在相册里。</em></h1><p className="lead">把资产、保修、票据、维护和每一笔服务支出，整理成一份真正有用的家庭档案。</p><div className="badges"><span>无需账户</span><span>无广告</span><span>本地保存</span></div><a className="storeCta" href={appStoreURL} target="_blank" rel="noreferrer">在 App Store 下载家维录 <span>↗</span></a><p className="availability">免费开始使用；当前中国区 Apple 显示：年度 Pro ¥68/年，终身 Pro ¥198。实际价格与可用性以 App Store 最终展示为准。</p></div>
      <div className="heroVisual"><div className="halo"/><Image className="phone" src="/dashboard.png" width={390} height={848} priority alt="家维录家庭健康度总览"/></div>
    </section>
    <section id="features" className="features"><div className="sectionIntro"><p className="eyebrow">不是另一个提醒清单</p><h2>让每一次投入，都成为家的历史。</h2></div><div className="featureGrid">{features.map(feature => <article key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div></section>
    <section className="showcase"><div className="showcaseCopy"><p className="eyebrow">信息各归其位</p><h2>维修时，不再翻聊天记录。</h2><p>打开一件资产，就能看到品牌型号、序列号、保修截止、票据、维护计划和历次服务成本。</p><ul><li>设备、铭牌与票据照片</li><li>保修到期风险提示</li><li>资产关联维护计划</li></ul></div><div className="phones"><Image src="/assets.png" width={310} height={674} alt="家庭资产列表"/><Image src="/insights.png" width={310} height={674} alt="家庭维护成本洞察"/></div></section>
    <section className="privacyBand"><div><p className="eyebrow">Privacy by default</p><h2>你的家，不是广告画像。</h2></div><div><p>家维录无需账户，不包含广告、第三方分析或跨 App 追踪。资产记录、照片与票据默认只保存在你的设备上。</p><Link className="textLink" href="/privacy">阅读完整隐私政策 →</Link></div></section>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/privacy">隐私政策</Link><Link href="/support">帮助与支持</Link></div></footer>
  </main>;
}
