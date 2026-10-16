# Levich Toys — 玩具工厂独立站（Next.js）

澄海玩具工厂自营 B2B 独立站，展示泡泡玩具、沙滩玩具、遥控玩具、积木四大品类。支持 OEM/ODM、在线询盘、产品选型。

**线上地址**：https://levichtoys.com
**后台管理**：https://levichtoys.com/admin/

本项目采用 Next.js App Router，SSG + ISR 渲染，SEO 友好。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16（App Router）+ React 19 |
| 语言 | TypeScript（strict mode） |
| 样式 | Tailwind CSS 4 + CSS Variables + @tailwindcss/typography |
| UI 组件 | shadcn/ui + Radix UI |
| 动画 | Framer Motion |
| 表单 | React Hook Form + Zod |
| 图标 | Lucide React |
| Markdown 渲染 | react-markdown + remark-gfm |
| 数据获取 | Server Components + fetch（ISR revalidate: 300） |
| 状态管理 | React Context + localStorage |
| CDN | Cloudflare（Auto Minify / Brotli / Cache Everything） |
| 后台 API | NestJS（独立项目，端口 3000） |

---

## 快速开始

### 环境要求

- Node.js >= 20
- npm >= 10

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

`.env.local` 配置说明：

```env
# 后台 API 地址（服务端使用，不暴露给客户端）
API_BASE_URL=http://localhost:3000

# 客户端表单提交用的 API 地址（可选）
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

> **重要**：前台 Next.js 运行在 **3001 端口**，后台 NestJS 运行在 **3000 端口**，两者不能冲突。

### 3. 启动后台 API（必须先启动）

后台项目路径：`../app_17cdbmwsc0s`

```bash
cd ../app_17cdbmwsc0s
npm run dev
```

后台启动后，API 地址为 `http://localhost:3000`。

### 4. 启动前台

```bash
npm run dev
```

访问 http://localhost:3001

> 如果后台未启动，前台会自动 fallback 到本地静态 mock 数据，页面仍可正常浏览，但产品/博客数据不是后台真实数据。

---

## 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（端口 3001） |
| `npm run build` | 生产构建（生成静态页面 + ISR 页面） |
| `npm run start` | 启动生产服务器（端口 3001） |
| `npm run lint` | ESLint 代码检查 |

---

## 项目结构

```
toy-website-next/
├── src/
│   ├── app/                          # App Router 页面
│   │   ├── layout.tsx                # 根布局（Header/Footer/全局SEO）
│   │   ├── page.tsx                  # 首页
│   │   ├── providers.tsx             # 客户端 Provider（AppContext/Toast）
│   │   ├── globals.css               # 全局样式 + Tailwind 主题
│   │   ├── robots.ts                 # 动态 robots.txt
│   │   ├── sitemap.ts                # 动态 sitemap.xml
│   │   ├── not-found.tsx             # 404 页面
│   │   ├── products/
│   │   │   ├── page.tsx              # 全部产品列表
│   │   │   └── [category]/page.tsx   # 分类产品页（SSG）
│   │   ├── product/[slug]/page.tsx   # 产品详情（SSG + Product Schema）
│   │   ├── blog/
│   │   │   ├── page.tsx              # 博客列表
│   │   │   └── [slug]/page.tsx       # 博客详情（SSG + BlogPosting Schema）
│   │   ├── oem/page.tsx              # OEM/ODM 定制
│   │   ├── factory/page.tsx          # 工厂与供应链
│   │   ├── quality/page.tsx          # 质量与认证
│   │   ├── about/page.tsx            # 关于我们
│   │   ├── contact/page.tsx          # 联系我们
│   │   ├── catalog/page.tsx          # 目录下载（线索捕获）
│   │   ├── faq/page.tsx              # FAQ（FAQPage Schema）
│   │   ├── privacy-policy/page.tsx   # 隐私政策
│   │   ├── my-selection/page.tsx     # 我的选型（CSR + localStorage）
│   ├── components/
│   │   ├── ui/                       # shadcn/ui 组件（勿修改）
│   │   ├── Header.tsx                # 顶部导航（sticky + 手机端汉堡菜单）
│   │   ├── Footer.tsx                # 页脚（含 Facebook 按钮）
│   │   ├── WhatsAppFloat.tsx         # WhatsApp 浮动按钮
│   │   ├── sections/                 # 各页面内容区块
│   │   │   └── home/                 # 首页 sections
│   │   ├── products/                 # ProductCard, ProductFilter, ProductGallery, ProductInquiryCard
│   │   ├── forms/                    # RfqDialog, CatalogDialog
│   │   ├── selection/                # MySelectionContent
│   │   └── blog/                     # BlogFilter, BlogDetailActions
│   ├── context/
│   │   └── AppContext.tsx            # 全局状态（选型/RFQ/配置）
│   ├── data/                         # 静态数据 + 类型定义
│   │   ├── products.ts / .json       # 产品数据
│   │   ├── categories.ts / .json     # 分类数据
│   │   ├── blog.ts / .json           # 博客数据
│   │   └── site.ts                   # 站点配置（品牌/联系方式/SEO）
│   ├── hooks/
│   │   ├── useApiData.ts             # 客户端数据获取（带 API fallback）
│   │   └── use-mobile.ts             # 移动端检测
│   └── lib/
│       ├── api.ts                    # API 客户端（fetch + 类型）
│       ├── server-data.ts            # 服务端数据获取（ISR + fallback）
│       ├── selection.ts              # 选型 localStorage 工具
│       ├── analytics.ts              # 分析事件抽象层
│       ├── structuredData.ts         # JSON-LD Schema 生成器
│       └── site-config.ts            # 站点配置
├── public/
│   ├── images/                       # 静态图片
│   │   ├── categories/               # 分类封面图
│   │   ├── blog/                     # 博客封面图
│   │   └── uploads/                  # 后台上传的图片
│   └── favicon.svg
├── .env.example                      # 环境变量模板
├── next.config.ts                    # Next.js 配置
├── postcss.config.mjs                # PostCSS 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json
```

---

## 渲染策略

| 页面类型 | 渲染方式 | 说明 |
|---------|---------|------|
| 首页 | SSG + ISR | `revalidate: 300`，5分钟自动刷新 |
| 产品列表/分类 | SSG + ISR | 服务端获取产品数据，分页参数同步 URL |
| 产品详情 | SSG（generateStaticParams）+ ISR | 预渲染所有产品 |
| 博客列表/详情 | SSG（generateStaticParams）+ ISR | 预渲染所有文章，Markdown 渲染 |
| OEM/Factory/Quality/About/FAQ | SSG | 纯静态 |
| Contact/Catalog | SSG + CSR | 页面静态，表单客户端交互 |
| My Selection | CSR | `'use client'`，localStorage 持久化 |

---

## SEO 特性

- **Metadata API**：每个页面通过 `generateMetadata` 动态设置 title/description/OG/Twitter/canonical
- **结构化数据（JSON-LD）**：
  - Organization + WebSite（全局，layout.tsx）
  - Product（产品详情页）
  - BlogPosting（博客详情页）
  - FAQPage（首页、FAQ页、产品列表页）
  - BreadcrumbList（所有层级页面）
  - Service（OEM/Factory/Quality页）
  - CollectionPage（产品列表页）
  - HowTo（首页采购流程）
- **动态 sitemap.ts**：自动包含所有产品、博客、分类 URL
- **动态 robots.ts**：允许主流搜索引擎和 AI 爬虫（GPTBot、ClaudeBot、PerplexityBot）
- **语义化 HTML**：proper heading hierarchy，main/nav/section/article
- **next/image**：自动图片优化、格式转换、懒加载

### 验证 SEO

启动后右键 → **查看网页源代码**，确认：
1. 页面内容完整存在于 HTML 中（不是空 `<div id="root">`）
2. `<title>` 和 `<meta name="description">` 正确
3. `<script type="application/ld+json">` 结构化数据存在
4. 可用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证 Schema

---

## 数据层架构

### 双数据源设计

```
Server Components → server-data.ts → api.ts → 后台 NestJS API
                                          ↓ 失败时
                                     data/*.json (mock fallback)

Client Components → useApiData.ts → api.ts → 后台 API
                                    ↓ 失败时
                               data/*.json (mock fallback)
```

### 后台 API 接口

| 接口 | 说明 |
|------|------|
| `GET /api/products?pageSize=200` | 获取产品列表 |
| `GET /api/products/:slug` | 获取单个产品 |
| `GET /api/categories` | 获取分类列表 |
| `GET /api/blog-posts?pageSize=100` | 获取博客列表 |
| `GET /api/blog-posts/:slug` | 获取单篇博客 |
| `POST /api/inquiries` | 提交询盘 |
| `POST /api/catalog-leads` | 提交目录下载线索 |

> 后台 API 不可用时，自动使用 `src/data/` 下的静态 JSON 数据，不影响页面浏览。

### 站点配置

所有品牌信息、联系方式、社交链接、默认 SEO 信息集中在 `src/data/site.ts`，修改一处全局生效。

---

## B2B 核心功能

### 1. 询盘系统（RFQ）
- 产品页、分类页、首页均有快速询盘入口
- 自动捕获产品名称、货号、分类、当前页面 URL
- React Hook Form + Zod 验证
- 加载/成功/错误状态
- 后端集成抽象层，可对接 Email/CRM/HubSpot/Zoho/Brevo/Resend

### 2. 目录下载（线索捕获）
- 全站 "Download Catalog" CTA
- 表单：姓名、公司、国家、邮箱、WhatsApp、产品兴趣
- 提交后提供下载，可跳转感谢页
- 追踪来源页面和所选分类

### 3. 我的选型（My Selection）
- 产品卡片和详情页可 "Add to My Selection"
- `/my-selection` 页面管理已选产品
- 支持数量备注、移除、清空
- 一键 "Request Quote for Selected Products"，询盘自动包含产品列表
- localStorage 持久化

### 4. 智能 WhatsApp 询盘
- 全局浮动 WhatsApp 按钮
- 产品页上下文 WhatsApp 按钮，自动生成专业询盘消息
- 消息包含产品名称、货号，请求价格/MOQ/目录/包装/交期
- My Selection 页面生成汇总消息
- URL 编码正确处理

---

## 图片管理

### 本地静态图片
放在 `public/images/` 目录下，通过 `/images/xxx.jpg` 引用。

### 后台上传图片
后台上传的图片存储在 `public/images/uploads/`，URL 格式为 `/images/uploads/xxx.jpg`。

`server-data.ts` 中的 `resolveUrl()` 函数会自动处理：
- 绝对 URL（http/https）→ 直接使用
- `/images/` 或 `/uploads/` 开头 → 保持相对路径
- 其他相对路径 → 拼接后台 API 地址

### next/image 配置
`next.config.ts` 中已配置远程图片域名：
- `localhost:3000`（本地后台）
- `192.168.10.7:3000`（局域网后台）
- 所有 https 域名

---

## 部署（Hostinger VPS）

生产环境部署在 Hostinger KVM VPS（Ubuntu 22.04）：

```bash
cd /var/www/toy-website
git pull
rm -rf .next
npm run build
pm2 restart toy-website
```

Nginx 将 80/443 端口的 `/` 请求代理到 `localhost:3001`，`/api/` 和 `/uploads/` 代理到后台 `localhost:3000`。

后台管理面板通过 Nginx 静态文件服务在 `/admin/` 路径下访问。

---

## 与后台项目的关系

| 项目 | 路径 | 端口 | 说明 |
|------|------|------|------|
| 前台（本项目） | `toy-website-next/` | 3001 | Next.js 独立站 |
| 后台管理 | `app_17cdbmwsc0s/` | 3000（API）/ 8080（管理界面） | NestJS + React 管理系统 |

两个项目共享 SQLite 数据库。后台修改产品/博客/分类后，前台通过 ISR 5分钟内自动刷新。

---

## 移动端优化

- Hero 装饰动画元素在手机端隐藏（`hidden md:block`），减少渲染负担
- Hero 内边距手机端减小（`py-16` vs 桌面端 `py-40`）
- 产品详情页画廊：手机端缩略图横向滚动，主图在上
- 图片放大模态框：箭头叠在图片两侧，手机端可切换
- 底部 Scroll 指示器手机端隐藏
- 产品列表页每页 9 个产品，分页参数同步 URL，浏览器返回保持原页码

---

## 常见问题

### Q: 启动后产品数据不显示？
A: 检查后台 NestJS 是否在 3000 端口运行。后台未启动时会使用本地 mock 数据。

### Q: 端口被占用？
A: 前台默认 3001，后台默认 3000。如需修改前台端口，编辑 `package.json` 中的脚本。

### Q: 图片不显示？
A: 检查 `next.config.ts` 的 `remotePatterns` 是否包含图片域名。本地图片放在 `public/images/` 下。

### Q: 如何修改品牌名称和联系方式？
A: 编辑 `src/lib/site-config.ts` 中的配置。

### Q: 如何添加新产品？
A: 在后台管理系统中添加，前台通过 ISR 自动同步。或直接编辑 `src/data/products.json`。

---

## 浏览器支持

- Chrome（最新版）
- Edge（最新版）
- Firefox（最新版）
- Safari（最新版）
- 移动端 Safari / Chrome

---

## License

Private
