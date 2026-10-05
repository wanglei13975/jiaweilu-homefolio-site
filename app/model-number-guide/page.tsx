import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const appStoreURL = "https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?pt=128677255&ct=site_home_changji_q4_2026&mt=8";

export const metadata: Metadata = {
  title: "冰箱、空调、洗衣机型号在哪里看？· 家维录",
  description: "先查购买凭证和说明书，再按品牌与具体型号找机身铭牌。整理家电型号、序列号与保修资料，并附官方厂商查找示例。",
  alternates: { canonical: "/model-number-guide" },
  openGraph: {
    title: "家电型号在哪里看？先查凭证，再找铭牌 · 家维录",
    description: "按安全顺序查找家电型号与序列号；铭牌位置因品牌和型号而异，附厂商官方示例。",
    images: ["/og-v2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "家电型号在哪里看？· 家维录",
    description: "购买凭证、说明书和机身铭牌的查找步骤，以及厂商官方示例。",
    images: ["/og-v2.png"],
  },
};

const steps = [
  ["01", "先查不用挪机器的资料", "看保修卡、发票、订单详情和产品说明书。品牌官网的“服务与支持”通常可以用产品类别或型号检索说明书；若资料不全，先记下品牌、购买渠道和大致年份。"],
  ["02", "再找机身铭牌或条码", "检查说明书所示位置，以及门内侧、内胆侧壁、机身侧面等容易安全触及的位置。冰箱、空调、洗衣机的标签位置会因品牌、系列和具体型号不同而变化，请以对应说明书或官方客服为准。"],
  ["03", "把型号与序列号分开记", "照着铭牌原样抄下“型号 / Model”和“序列号 / Serial No.”，不要把两项混成一个。报修或查配件时先确认服务方要求哪一项；核对字符时特别留意 0 与 O、1 与 I。"],
  ["04", "够不到标签就停在这里", "不要为了找标签独自拉动或倾斜冰箱、洗衣机等大型设备，也不要拆面板或伸手进入设备内部。背面标签难以安全查看时，联系品牌官方客服或售后人员协助。"],
];

export default function ModelNumberGuidePage() {
  return <main>
    <nav className="nav"><Link className="wordmark" href="/"><Image src="/app-icon.png" width={38} height={38} alt="家维录图标"/><span>家维录</span></Link><div><Link href="/maintenance-calculator">免费工具</Link><Link href="/home-maintenance">保养指南</Link><Link href="/warranty-checklist">保修清单</Link><Link href="/privacy">隐私</Link><Link href="/support">支持</Link></div></nav>
    <article className="guide">
      <p className="eyebrow">型号查找 · 保修资料 · 安全优先</p>
      <h1>家电型号在哪里看？<br/><em>先找凭证，再找铭牌。</em></h1>
      <p className="lead">报修、查配件或整理保修资料时，先找到产品型号会更容易核对。型号标签位置没有统一标准：先查购买凭证和说明书，再按品牌、类别和具体型号找对应的官方说明。</p>
      <div className="guideCards" style={{ marginTop: 48 }}>{steps.map(([number, title, copy]) => <section className="guideCard" key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></section>)}</div>
      <section className="templatePanel" aria-labelledby="examples-title">
        <p className="eyebrow">厂商官方查找示例</p>
        <h2 id="examples-title">这些位置只是具体型号的例子</h2>
        <p>以下资料来自厂商官方支持页，适用于页面注明的产品或地区；不能据此推断其他型号的标签位置。</p>
        <div className="templateFieldGrid">
          <div><h3>海尔日本：冰箱</h3><p>该支持页建议先看保修书，并说明冰箱型号品番可在冷藏室门内侧的铭牌贴纸上确认。</p><a className="textLink" href="https://www.haier.com/jp/service-support/self-service/20200323_144354.shtml" target="_blank" rel="noopener noreferrer">查看海尔日本官方说明 ↗</a></div>
          <div><h3>小米英国：Mijia 502L 对开门冰箱</h3><p>这份针对特定型号的说明称，产品信息在冷藏室侧壁铭牌和冰箱背部标签上。</p><a className="textLink" href="https://www.mi.com/uk/support/faq/details/KA-608274/" target="_blank" rel="noopener noreferrer">查看小米英国官方说明 ↗</a></div>
          <div><h3>海尔印度：冰箱与冷柜</h3><p>该地区支持页举例说明常见铭牌位置，并特别提醒：查看背面前应谨慎，较高或较重的设备需要他人协助，避免设备倾倒或损伤电源线、供水管。</p><a className="textLink" href="https://www.haier.com/in/service-support/self-service/20151201_102258.shtml" target="_blank" rel="noopener noreferrer">查看海尔印度官方说明 ↗</a></div>
          <div><h3>空调、洗衣机及其他家电</h3><p>不同产品线的铭牌位置差异更大。先查说明书、购买凭证，或在品牌官方支持站按型号搜索；找不到时直接联系官方售后，不要拆机。</p><Link className="textLink" href="/support">查看家维录资料整理帮助 →</Link></div>
        </div>
        <p className="templateNote">厂商示例仅用于说明查找思路，不代表家维录与相关品牌存在合作关系，也不是对具体产品保修或维修资格的判断。</p>
      </section>
      <section className="guideBottom"><h2>找到型号后，把保修资料一起收好</h2><p>可按设备分别保存品牌、型号、购买日期和保修凭证。先用空白清单整理也可以；想长期查看维护记录时，再选择是否使用家维录。</p><Link className="textLink" href="/warranty-checklist">下载免费的家电档案与维修记录表 →</Link><br/><a className="storeCta" href={appStoreURL} target="_blank" rel="noreferrer">在 App Store 查看家维录 <span>↗</span></a><p className="availability">基础资产记录可免费开始；价格与可用性以 App Store 实际展示为准。</p></section>
    </article>
    <footer><div className="wordmark"><Image src="/app-icon.png" width={34} height={34} alt=""/><span>家维录</span></div><p>家庭资产护照与维保账本</p><div><Link href="/">首页</Link><Link href="/warranty-checklist">保修清单</Link><Link href="/privacy">隐私政策</Link><Link href="/support">帮助与支持</Link></div></footer>
  </main>;
}
