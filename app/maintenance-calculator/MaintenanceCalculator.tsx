"use client";

import { FormEvent, useState } from "react";

const equipment = [
  ["空调", "滤网、室外机和制冷效果"],
  ["净水器", "滤芯寿命和出水情况"],
  ["热水器", "安全检查和镁棒维护"],
  ["洗衣机", "桶清洁、进排水和密封圈"],
  ["冰箱", "密封条、温度和除霜"],
  ["其他家庭设备", "按设备说明书设置周期"],
] as const;

const periods = [
  ["3", "每 3 个月"],
  ["6", "每 6 个月"],
  ["12", "每 12 个月"],
] as const;

function addMonths(value: string, months: number) {
  const [year, month, day] = value.split("-").map(Number);
  const target = new Date(Date.UTC(year, month - 1, 1));
  target.setUTCMonth(target.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  return target.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00Z`));
}

export default function MaintenanceCalculator() {
  const [lastDate, setLastDate] = useState("");
  const [kind, setKind] = useState("空调");
  const [period, setPeriod] = useState("6");
  const [result, setResult] = useState<{ date: string; copy: string } | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!lastDate) {
      setError("请选择上次保养日期。");
      setResult(null);
      return;
    }
    const description = equipment.find(([name]) => name === kind)?.[1] ?? "按设备说明书设置周期";
    setError("");
    setResult({ date: addMonths(lastDate, Number(period)), copy: description });
  }

  return <div className="calculator" id="maintenance-calculator">
    <form className="calcCard" onSubmit={calculate}>
      <div className="calcFields">
        <label className="calcField" htmlFor="equipment"><span>设备</span><select id="equipment" value={kind} onChange={event => setKind(event.target.value)}>{equipment.map(([name]) => <option key={name}>{name}</option>)}</select></label>
        <label className="calcField" htmlFor="last-maintenance"><span>上次保养日期</span><input id="last-maintenance" type="date" value={lastDate} onChange={event => setLastDate(event.target.value)} required /></label>
        <label className="calcField" htmlFor="period"><span>提醒周期</span><select id="period" value={period} onChange={event => setPeriod(event.target.value)}>{periods.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <button className="calcButton" type="submit">计算下次保养日期 <span>→</span></button>
      <p className="calcNote">这是一个按你设定的月份计算日期的免费工具，不替代设备说明书、专业检修或安全判断。</p>
      {error && <p className="calcError" role="alert">{error}</p>}
      {result && <div className="calcResult" aria-live="polite"><p className="eyebrow">计算结果 · {kind}</p><h2>{formatDate(result.date)}</h2><p>建议检查：{result.copy}。把结果记进家维录，之后还能保存票据、服务费用和维护历史。</p><a className="storeCta" href="https://apps.apple.com/cn/app/%E5%AE%B6%E7%BB%B4%E5%BD%95/id6799400433?ct=github_maintenance_calculator&mt=8" target="_blank" rel="noreferrer">在 App Store 保存这次维护记录 <span>↗</span></a></div>}
    </form>
  </div>;
}
