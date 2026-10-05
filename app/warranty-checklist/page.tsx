import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?pt=128677255&ct=site_home_changji_q4_2026&mt=8";

export const metadata: Metadata = {
  title: "家电保修与维修记录表模板（免费）· 家维录",
  description: "免费下载家电设备档案和维修记录 CSV 空白模板，也可打印清单。整理型号、票据、保修日期与每次维修。",
  openGraph: {
    title: "家电保修与维修记录表模板（免费）· 家维录",
    description: "两张空白表格分别记录设备档案和每次维修；可下载 CSV 或打印，不需要注册。",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "家电保修与维修记录表模板（免费）· 家维录",
    description: "免费下载设备档案和维修记录空白模板，整理保修日期、票据和维护历史。",
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
      <h1>家电保修与维修记录表，<br/><em>先把关键信息放在一起。</em></h1>
      <p className="lead">保修期真正要用时，最难找的往往不是日期，而是型号、序列号、票据和上次维修经过。按下面五步整理一件设备，就能少翻一次相册和聊天记录。</p>
      <div className="guideGrid">
        <div className="guideCards">{checklist.map(([title, copy], index) => <section className="guideCard" key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></section>)}</div>
        <Image className="guideImage" src="/assets.png" width={310} height={674} alt="家维录家庭资产档案与保修记录"/>
      </div>
      <section className="templatePanel" aria-labelledby="template-title">
        <p className="eyebrow">免费空白模板</p>
        <h2 id="template-title">下载家电档案表和维修记录表</h2>
        <p>一件设备一行，维修或保养每发生一次就新增一行。CSV 文件可用 Numbers、Excel、WPS 或其他表格工具打开；也可以直接打印本页的空白表格。文件在你的设备上填写，本页不会接收或上传表格内容。</p>
        <div className="templateDownloads">
          <a className="templateDownload" href="/home-appliance-record-template.csv" download>下载设备档案表 <span>CSV</span></a>
          <a className="templateDownload" href="/home-maintenance-log-template.csv" download>下载维修保养记录表 <span>CSV</span></a>
        </div>
        <div className="templateFieldGrid">
          <div><h3>设备档案</h3><p>位置、品牌型号、序列号、购买日期、保修起止日期、票据保存位置。</p></div>
          <div><h3>维修与保养</h3><p>发生日期、处理事项、服务商、实际费用、处理结果、下次计划与凭证位置。</p></div>
        </div>
        <p className="templateNote">模板只帮助整理资料，不判断保修资格，也不替代品牌或销售方的服务条款。填写后想长期查看，可在家维录中免费建立最多 8 件设备的本地档案。</p>
      </section>
      <section className="templatePrint" aria-label="可打印的空白家电记录表">
        <h2>家庭设备档案表</h2>
        <p>一件设备一行；日期和保修期限请以购买凭证及品牌条款为准。</p>
        <table><thead><tr><th>设备 / 位置</th><th>品牌 / 型号</th><th>序列号</th><th>购买日期 / 渠道</th><th>保修起止</th><th>票据位置</th></tr></thead><tbody>{Array.from({ length: 6 }, (_, index) => <tr key={index}>{Array.from({ length: 6 }, (_, cell) => <td key={cell}>&nbsp;</td>)}</tr>)}</tbody></table>
        <h2>维修与保养记录</h2>
        <p>每次服务新增一行；记录实际发生的费用和服务结果。</p>
        <table><thead><tr><th>日期</th><th>设备</th><th>维修 / 保养事项</th><th>服务商 / 结果</th><th>费用</th><th>下次日期 / 凭证</th></tr></thead><tbody>{Array.from({ length: 8 }, (_, index) => <tr key={index}>{Array.from({ length: 6 }, (_, cell) => <td key={cell}>&nbsp;</td>)}</tr>)}</tbody></table>
      </section>
      <section className="guideBottom"><h2>把一次性清单，变成长期档案</h2><p>家维录可以把设备、票据、保修日期、维护计划和每次服务费用放在同一件资产下面。基础记录免费开始；Pro 可保存无限资产、票据与服务凭证，并导出 PDF 报告。</p><a className="storeCta" href={appStoreURL} target="_blank" rel="noreferrer">在 App Store 下载家维录 <span>↗</span></a><p className="availability">中国区终身 Pro ¥198（一次性），年度 Pro ¥68/年。最终价格与可用性以 App Store 实际展示为准。</p></section>
    </article>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/">首页</Link><Link href="/home-maintenance">保养指南</Link><Link href="/privacy">隐私政策</Link><Link href="/support">帮助与支持</Link></div></footer>
  </main>;
}
