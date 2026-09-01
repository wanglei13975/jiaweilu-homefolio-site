import assert from "node:assert/strict";
import test from "node:test";

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
  assert.match(html, /apple-itunes-app/);
  assert.match(html, /在 App Store 下载家维录/);
  assert.match(html, /id6799400433\?ct=github_jiaweilu&amp;mt=8/);
  assert.match(html, /class="mobilePurchaseBar"/);
  assert.match(html, /id6799400433\?ct=github_mobile_cta&amp;mt=8/);
  assert.match(html, /总览右上角打开“家维录 Pro”选择方案/);
  assert.doesNotMatch(html, /上架前质量验证/);
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
  assert.match(html, /id6799400433\?ct=github_home_maintenance&amp;mt=8/);
  assert.match(html, /¥68/);
  assert.match(html, /¥198/);
  assert.match(html, /class="mobilePurchaseBar"/);
});

test("renders a free maintenance calculator with a tracked store CTA", async () => {
  const html = await expectPage("/maintenance-calculator");
  assert.match(html, /<title>家庭保养日期计算器 · 家维录<\/title>/);
  assert.match(html, /id="maintenance-calculator"/);
  assert.match(html, /计算下次保养日期/);
  assert.match(html, /按你设定的月份计算日期/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /WebApplication/);
  assert.match(html, /id6799400433\?ct=github_maintenance_calculator&amp;mt=8/);
  assert.match(html, /¥68/);
  assert.match(html, /¥198/);
  assert.match(html, /class="mobilePurchaseBar"/);
});

test("renders a high-intent warranty checklist with a tracked store CTA", async () => {
  const html = await expectPage("/warranty-checklist");
  assert.match(html, /<title>家电保修到期提醒清单 · 家维录<\/title>/);
  assert.match(html, /家电保修到期提醒/);
  assert.match(html, /找到购买凭证/);
  assert.match(html, /维修经过/);
  assert.match(html, /在 App Store 下载家维录/);
  assert.match(html, /id6799400433\?ct=github_warranty_checklist&amp;mt=8/);
  assert.match(html, /¥6/);
  assert.match(html, /class="mobilePurchaseBar"/);
});
