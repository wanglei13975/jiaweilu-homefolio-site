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
