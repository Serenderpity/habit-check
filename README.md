<p align="center">
  <a href="#chinese"><kbd>中文</kbd></a>
  &nbsp;|&nbsp;
  <a href="#english"><kbd>English</kbd></a>
</p>

---

<details open>
<summary><h2 id="chinese">中文</h2></summary>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license MIT" />
  <img src="https://img.shields.io/badge/framework-none-brightgreen" alt="zero dependencies" />
  <img src="https://img.shields.io/badge/deploy-Netlify-00C7B7" alt="deployed on Netlify" />
</p>

## 习惯打卡

一个纯前端的日常习惯追踪应用——添加习惯、每日打卡、追踪每周和每日的完成进度。无需注册、无需后端，所有数据都存储在你自己的浏览器里。

### 目录

- [功能](#功能)
- [快速开始](#快速开始)
- [使用说明](#使用说明)
- [项目结构](#项目结构)
- [技术细节](#技术细节)
- [部署](#部署)
- [浏览器兼容性](#浏览器兼容性)
- [许可](#许可)

### 功能

**习惯管理**

在输入框中输入习惯名称，点击"添加"即可创建新习惯。每个习惯右侧有删除按钮（悬停时出现），点击后需要确认才会删除，防止误操作。

**每日打卡**

点击习惯项即可切换当天完成状态。已完成的习惯会以删除线样式显示，并在视觉上降低透明度以区分。

**进度追踪**

页面顶部有一个 SVG 环形进度条，显示当天完成习惯的比例（例如 2/3）。数字使用等宽字体 (`tabular-nums`)，便于快速对比。

**周统计**

本周完成情况以进度条形式展示，同时显示具体数字（如"完成 10/15 项"），让你清楚看到一周的整体表现。

**每日语录**

每天自动换一条励志语录，共 15 条，按年内天数循环。

**本地存储**

所有数据（习惯列表 + 历史打卡记录）保存在浏览器 `localStorage` 中。换设备或清除浏览器数据后数据会丢失。

### 快速开始

```bash
git clone <repo-url>
cd 习惯打卡
# 直接用浏览器打开 index.html
```

无需安装任何依赖。双击 `index.html` 或拖入浏览器即可使用。

### 使用说明

1. 打开页面，默认已有三个示例习惯：喝水、运动、读书。
2. 点击习惯项完成打卡，再次点击取消。
3. 在底部输入框添加新习惯，支持回车提交。
4. 悬停习惯项右侧出现删除按钮，点击删除。
5. 进度环和周统计条会自动更新。

### 项目结构

```
index.html      页面结构 (58 行)
style.css       样式表 — Swiss 风格设计系统、响应式布局
script.js       核心逻辑 — 数据读写、渲染、事件绑定
```

### 技术细节

**数据模型**

```js
{
  habits: ["喝水", "运动", "读书"],
  history: {
    "2026-07-16": { "喝水": true, "运动": false, "读书": true },
    "2026-07-15": { ... }
  }
}
```

- `habits`: 习惯名称数组，保持添加顺序。
- `history`: 以日期 `YYYY-MM-DD` 为 key，每个 key 下是一个 `{习惯名: 布尔值}` 的映射。

**设计系统**

Swiss 风格：Yves Klein 蓝 `#002FA7` 为主色，`#F7F7F8` 底色，1px 发丝线分隔各个区块，system sans-serif 字型，左对齐排版，圆形进度环使用方形线帽 (`stroke-linecap: butt`)。

### 部署

在线地址：**[habit-check-liuyao.netlify.app](https://habit-check-liuyao.netlify.app)**

通过 Netlify CLI 部署：`npx netlify deploy --prod --dir=.`

### 浏览器兼容性

支持所有现代浏览器（Chrome、Firefox、Safari、Edge）。依赖 `localStorage` API 和 SVG。

### 许可

MIT

</details>

<details>
<summary><h2 id="english">English</h2></summary>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="license MIT" />
  <img src="https://img.shields.io/badge/framework-none-brightgreen" alt="zero dependencies" />
  <img src="https://img.shields.io/badge/deploy-Netlify-00C7B7" alt="deployed on Netlify" />
</p>

## Habit Check

A pure frontend daily habit tracker. Add habits, check in daily, and track your progress over the week. No sign-up, no backend — all data lives in your browser.

### Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [License](#license)

### Features

**Habit Management**

Type a habit name into the input field and click "Add" to create it. Each habit has a delete button (visible on hover) with a confirmation dialog to prevent accidental removal.

**Daily Check-in**

Click a habit item to toggle its completion status for the current day. Completed habits display with a strikethrough and reduced visual opacity.

**Progress Tracking**

An SVG ring at the top of the page shows the ratio of completed habits for the day (e.g., 2/3). Numbers use tabular formatting (`tabular-nums`) for easy comparison.

**Weekly Stats**

A progress bar shows overall completion for the current week, along with an exact count (e.g., "Done 10/15").

**Daily Quotes**

A motivational quote rotates automatically each day, with 15 quotes cycling by day-of-year.

**Local Storage**

All data (habit list + check-in history) is saved in the browser's `localStorage`. Data will be lost if you switch devices or clear browser data.

### Quick Start

```bash
git clone <repo-url>
cd habit-check
# open index.html in your browser
```

No dependencies to install. Double-click `index.html` or drag it into your browser.

### Usage

1. Open the page — three sample habits are pre-loaded: water, exercise, reading.
2. Click a habit to check in; click again to undo.
3. Use the input at the bottom to add new habits (press Enter to submit).
4. Hover a habit item to reveal its delete button.
5. The progress ring and weekly bar update automatically.

### Project Structure

```
index.html      page layout (58 lines)
style.css       styling — Swiss design system, responsive layout
script.js       core logic — data I/O, rendering, event handling
```

### Technical Details

**Data Model**

```js
{
  habits: ["water", "exercise", "reading"],
  history: {
    "2026-07-16": { "water": true, "exercise": false, "reading": true },
    "2026-07-15": { ... }
  }
}
```

- `habits`: array of habit names, preserving insertion order.
- `history`: keyed by date string `YYYY-MM-DD`, each value a `{ name: boolean }` map.

**Design System**

Swiss style: Yves Klein Blue `#002FA7` as primary accent, `#F7F7F8` background, 1px hairline rules separating sections, system sans-serif typography, left-aligned layout, progress ring with square stroke caps (`stroke-linecap: butt`).

### Deployment

Live site: **[habit-check-liuyao.netlify.app](https://habit-check-liuyao.netlify.app)**

Deploy via Netlify CLI: `npx netlify deploy --prod --dir=.`

### Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). Requires `localStorage` API and SVG support.

### License

MIT

</details>
