import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function expectPage(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the 家维录 product page with real product value", async () => {
  const html = await expectPage("/");
  assert.match(html, /<html lang="zh-Hans">/);
  assert.match(html, /<title>家维录 · 家庭资产护照与维保账本<\/title>/);
  assert.match(html, /房子的记忆/);
  assert.match(html, /20 个中文家庭维护模板/);
  assert.match(html, /无需账户/);
  assert.match(html, /无广告/);
  assert.match(html, /本地保存/);
  assert.match(html, /apple-itunes-app" content="app-id=6799400433, ct=site_home_changji_q4_2026, pt=128677255, mt=8/);
  assert.match(html, /在 App Store 下载家维录/);
  assert.match(html, /id6799400433\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
  assert.match(html, /class="mobilePurchaseBar"/);
  assert.match(html, /终身 Pro ¥198（一次性）/);
  assert.match(html, /年度 Pro ¥68\/年/);
  assert.match(html, /id6799400433\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
  assert.match(html, /总览右上角打开“家维录 Pro”选择方案/);
  assert.doesNotMatch(html, /上架前质量验证/);
  assert.doesNotMatch(html, /9 月 1 日至 25 日|9\/1–9\/25|¥6(?!8)/);
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /href="\/support"/);
  assert.doesNotMatch(html, /starter|loading skeleton|appforge\.example/i);
});

test("renders a privacy policy consistent with the App privacy label", async () => {
  const html = await expectPage("/privacy");
  assert.match(html, /<title>隐私政策 · 家维录<\/title>/);
  assert.match(html, /不会收集、上传、出售或共享/);
  assert.match(html, /不包含第三方广告、跨 App 追踪或第三方分析 SDK/);
  assert.match(html, /应用内购买由 Apple 处理/);
  assert.match(html, /href="\/support"/);
});

test("renders support guidance for core and paid flows", async () => {
  const html = await expectPage("/support");
  assert.match(html, /<title>帮助与支持 · 家维录<\/title>/);
  assert.match(html, /如何建立维护计划/);
  assert.match(html, /如何恢复 Pro/);
  assert.match(html, /恢复购买/);
  assert.match(html, /如何导出报告/);
  assert.match(html, /href="\/privacy"/);
});

test("renders a high-intent family maintenance guide with a tracked store CTA", async () => {
  const html = await expectPage("/home-maintenance");
  assert.match(html, /<title>家电保修与维修记录 · 家维录<\/title>/);
  assert.match(html, /家电保修、维修和保养/);
  assert.match(html, /记录品牌、型号、序列号/);
  assert.match(html, /在 App Store 下载家维录/);
  assert.match(html, /id6799400433\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
  assert.match(html, /¥68/);
  assert.match(html, /¥198/);
  assert.match(html, /class="mobilePurchaseBar"/);
  assert.doesNotMatch(html, /9 月 1 日至 25 日|9\/1–9\/25|¥6(?!8)/);
});

test("renders a free maintenance calculator with a tracked store CTA", async () => {
  const html = await expectPage("/maintenance-calculator");
  assert.match(html, /<title>家庭保养日期计算器 · 家维录<\/title>/);
  assert.match(html, /id="maintenance-calculator"/);
  assert.match(html, /计算下次保养日期/);
  assert.match(html, /按你设定的月份计算日期/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /WebApplication/);
  assert.match(html, /id6799400433\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
  assert.match(html, /¥68/);
  assert.match(html, /¥198/);
  assert.match(html, /class="mobilePurchaseBar"/);
  assert.doesNotMatch(html, /9 月 1 日至 25 日|9\/1–9\/25|¥6(?!8)/);
});

test("renders a high-intent warranty checklist with a tracked store CTA", async () => {
  const html = await expectPage("/warranty-checklist");
  assert.match(html, /<title>家电保修与维修记录表模板（免费）· 家维录<\/title>/);
  assert.match(html, /家电保修与维修记录表/);
  assert.match(html, /找到购买凭证/);
  assert.match(html, /维修经过/);
  assert.match(html, /下载家电档案表和维修记录表/);
  assert.match(html, /href="\/home-appliance-record-template\.csv" download/);
  assert.match(html, /href="\/home-maintenance-log-template\.csv" download/);
  assert.match(html, /本页不会接收或上传表格内容/);
  assert.match(html, /class="templatePrint"/);
  assert.match(html, /在 App Store 下载家维录/);
  assert.match(html, /id6799400433\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
  assert.match(html, /¥198/);
  assert.match(html, /¥68/);
  assert.doesNotMatch(html, /9 月 1 日至 25 日|9\/1–9\/25|¥6(?!8)/);
  assert.match(html, /class="mobilePurchaseBar"/);
});

test("ships blank UTF-8 CSV templates with headers and no personal sample data", async () => {
  for (const [pathname, columns] of [
    ["../public/home-appliance-record-template.csv", ["设备名称", "房间/位置", "品牌", "型号", "序列号", "购买日期"]],
    ["../public/home-maintenance-log-template.csv", ["日期", "设备名称", "事项类型（维修/保养/检查）", "服务商", "实际费用", "下次维护日期"]],
  ]) {
    const bytes = await readFile(new URL(pathname, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 3)], [0xef, 0xbb, 0xbf]);
    const csv = bytes.toString("utf8").replace(/^\uFEFF/, "");
    const headers = csv.split(/\r?\n/, 1)[0].split(",");
    for (const column of columns) assert.ok(headers.includes(column), "missing CSV column: " + column);
    assert.equal(csv.trim().split(/\r?\n/).length, 2);
  }
});

test("keeps the GitHub Pages fallback aligned with current Pro pricing", async () => {
  for (const pathname of [
    "../docs/index.html",
    "../docs/home-maintenance/index.html",
    "../docs/maintenance-calculator/index.html",
    "../docs/warranty-checklist/index.html",
    "../docs/privacy/index.html",
    "../docs/support/index.html",
    "../docs/privacy/index.html",
    "../docs/support/index.html",
  ]) {
    const html = await readFile(new URL(pathname, import.meta.url), "utf8");
    assert.match(html, /终身 Pro ¥198/);
    assert.match(html, /¥68\/年/);
    assert.match(html, /apps\.apple\.com\/[^" ]+\?pt=128677255&amp;ct=site_home_changji_q4_2026&amp;mt=8/);
    assert.doesNotMatch(html, /9 月 1 日至 25 日|9\/1–9\/25|¥6(?!8)/);
  }
});

test("serves both blank record templates from the GitHub Pages fallback", async () => {
  const html = await readFile(new URL("../docs/warranty-checklist/index.html", import.meta.url), "utf8");
  assert.match(html, /家电保修与维修记录表模板（免费）· 家维录/);
  assert.match(html, /href="\.\.\/home-appliance-record-template\.csv" download/);
  assert.match(html, /href="\.\.\/home-maintenance-log-template\.csv" download/);
  for (const [name, firstColumn] of [
    ["home-appliance-record-template.csv", "设备名称"],
    ["home-maintenance-log-template.csv", "日期"],
  ]) {
    const bytes = await readFile(new URL("../docs/" + name, import.meta.url));
    assert.deepEqual([...bytes.subarray(0, 3)], [0xef, 0xbb, 0xbf]);
    const csv = bytes.toString("utf8").replace(/^\uFEFF/, "");
    assert.ok(csv.startsWith(firstColumn + ","));
    assert.equal(csv.trim().split(/\r?\n/).length, 2);
  }
});

test("forwards only registered Changji campaign tokens to App Store links", async () => {
  const script = await readFile(new URL("../public/campaign-link.js", import.meta.url), "utf8");
  const githubPagesScript = await readFile(new URL("../docs/campaign-link.js", import.meta.url), "utf8");
  assert.equal(githubPagesScript, script);

  const storeLink = { href: "https://apps.apple.com/cn/app/id6799400433?pt=128677255&ct=site_home_changji_q4_2026&mt=8" };
  const nonStoreLink = { href: "https://example.com/help" };
  const banner = { content: "app-id=6799400433, ct=site_home_changji_q4_2026, pt=128677255, mt=8" };
  let clickHandler;
  const storedValues = new Map();
  const document = {
    querySelectorAll: () => [storeLink, nonStoreLink],
    querySelector: () => banner,
    addEventListener: (_name, handler) => { clickHandler = handler; },
  };
  const window = {
    location: { search: "?ct=apple_ads_1025_cn_home", href: "https://wanglei13975.github.io/jiaweilu-homefolio-site/" },
    sessionStorage: { setItem: (key, value) => storedValues.set(key, value), getItem: (key) => storedValues.get(key) ?? null },
  };
  vm.runInNewContext(script, { document, window, URL, URLSearchParams });
  const updated = new URL(storeLink.href);
  assert.equal(updated.searchParams.get("pt"), "128677255");
  assert.equal(updated.searchParams.get("ct"), "apple_ads_1025_cn_home");
  assert.equal(updated.searchParams.get("mt"), "8");
  assert.equal(nonStoreLink.href, "https://example.com/help");
  assert.match(banner.content, /ct=apple_ads_1025_cn_home/);

  const dynamicLink = { href: "https://apps.apple.com/cn/app/id6799400433" };
  clickHandler({ target: { closest: () => dynamicLink } });
  assert.equal(new URL(dynamicLink.href).searchParams.get("ct"), "apple_ads_1025_cn_home");

  const nextPageLink = { href: "https://apps.apple.com/cn/app/id6799400433?ct=site_home_changji_q4_2026" };
  const nextPageDocument = { querySelectorAll: () => [nextPageLink], querySelector: () => null, addEventListener() {} };
  const nextPageWindow = {
    location: { search: "", href: "https://wanglei13975.github.io/jiaweilu-homefolio-site/home-maintenance/" },
    sessionStorage: window.sessionStorage,
  };
  vm.runInNewContext(script, { document: nextPageDocument, window: nextPageWindow, URL, URLSearchParams });
  assert.equal(new URL(nextPageLink.href).searchParams.get("ct"), "apple_ads_1025_cn_home");
});

test("does not pass an unregistered Changji token into the App Store", async () => {
  const script = await readFile(new URL("../public/campaign-link.js", import.meta.url), "utf8");
  const storeLink = { href: "https://apps.apple.com/cn/app/id6799400433?ct=site_home_changji_q4_2026" };
  const document = { querySelectorAll: () => [storeLink], querySelector: () => null, addEventListener() {} };
  const window = { location: { search: "?ct=not_registered", href: "https://example.com/" } };
  vm.runInNewContext(script, { document, window, URL, URLSearchParams });
  assert.equal(new URL(storeLink.href).searchParams.get("ct"), "site_home_changji_q4_2026");
});

test("loads campaign attribution forwarding on the acquisition GitHub Pages routes", async () => {
  for (const pathname of [
    "../docs/index.html",
    "../docs/home-maintenance/index.html",
    "../docs/maintenance-calculator/index.html",
    "../docs/warranty-checklist/index.html",
  ]) {
    const html = await readFile(new URL(pathname, import.meta.url), "utf8");
    assert.match(html, /defer src="\/jiaweilu-homefolio-site\/campaign-link\.js"/);
  }
});
