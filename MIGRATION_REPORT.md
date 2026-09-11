# Vite React SPA → Next.js 16 App Router 迁移报告

## 构建状态
✅ `npm run build` 通过（Next.js 16.3.4 / Turbopack）
✅ TypeScript 检查通过
✅ 全部 31 个路由静态生成成功
✅ 9 个迁移页面均无编译错误

---

## 一、页面迁移清单

### 1. 首页 `/`
- **Server Page**: `src/app/page.tsx`
- **Client Sections**（12个）: `src/components/sections/home/`
  - `HeroSection.tsx` — useNavigate → useRouter, framer-motion
  - `HeroCanvas.tsx` — 3D 占位组件（返回 null）
  - `WhyChooseUsSection.tsx` — 纯 framer-motion
  - `ProductUniverseSection.tsx` — 接受 `categories` + `products` props（原 useCategories/useProducts）
  - `FeaturedProductsSection.tsx` — 接受 `products` props（原 useProducts）
  - `OemSection.tsx` — react-router Link → next/link
  - `FactorySection.tsx` — react-router Link → next/link
  - `QualitySection.tsx` — 纯 framer-motion
  - `GlobalMarketSection.tsx` — useState + react-router Link → next/link
  - `BlogPreviewSection.tsx` — 接受 `posts` props；适配目标数据类型（author: string, authorAvatar, date）
  - `FinalCtaSection.tsx` — useApp context
- **数据获取**: Server Component 中 `getProducts()`, `getCategories()`, `getBlogPosts()` 并行获取，传递给 client sections
- **JSON-LD**:
  - `FAQPage` Schema（5条问答）
  - `HowTo` Schema（"How to Source Toys from Chenghai, China"，5步）

### 2. OEM `/oem`
- **Server Page**: `src/app/oem/page.tsx`
- **Client Content**: `src/components/sections/OemPageContent.tsx`
- **JSON-LD**:
  - `Service` Schema（OEM & ODM Toy Customization）
  - `FAQPage` Schema（3条问答）
  - `BreadcrumbList` Schema

### 3. Factory `/factory`
- **Server Page**: `src/app/factory/page.tsx`
- **Client Content**: `src/components/sections/FactoryPageContent.tsx`
- **JSON-LD**:
  - `Service` Schema（Toy Factory & Supply Chain Coordination）
  - `FAQPage` Schema（2条问答）
  - `BreadcrumbList` Schema

### 4. Quality `/quality`
- **Server Page**: `src/app/quality/page.tsx`
- **Client Content**: `src/components/sections/QualityPageContent.tsx`
- **JSON-LD**:
  - `Service` Schema（Toy Quality Control & Certification Support）
  - `FAQPage` Schema（2条问答）
  - `BreadcrumbList` Schema

### 5. About `/about`
- **Server Page**: `src/app/about/page.tsx`
- **Client Content**: `src/components/sections/AboutPageContent.tsx`
- **JSON-LD**:
  - `BreadcrumbList` Schema

### 6. FAQ `/faq`
- **Server Page**: `src/app/faq/page.tsx`
- **Client Content**: `src/components/sections/FaqPageContent.tsx`
  - useState（搜索 + 分类筛选）
  - useMemo（过滤 + 分组）
  - NavLink → next/link Link
- **JSON-LD**:
  - `FAQPage` Schema（4条问答）
  - `BreadcrumbList` Schema

### 7. Contact `/contact`
- **Server Page**: `src/app/contact/page.tsx`（SSG）
- **Client Content**: `src/components/sections/ContactPageContent.tsx`
  - Hero + 联系信息卡片 + WhatsApp CTA
  - UniversalLink → 普通 `<a>` 标签
- **Client Form**: `src/components/forms/ContactForm.tsx`
  - react-hook-form + zod 验证
  - submitInquiry API 提交
  - sonner toast 通知
  - NavLink → next/link Link（隐私政策链接）
- **JSON-LD**:
  - `BreadcrumbList` Schema

### 8. Catalog `/catalog`
- **Server Page**: `src/app/catalog/page.tsx`
- **Client Content**: `src/components/sections/CatalogPageContent.tsx`
  - 内嵌 lead capture 表单（react-hook-form + zod）
  - submitLead API 提交
  - useState（提交状态）
- **JSON-LD**:
  - `BreadcrumbList` Schema

### 9. Privacy Policy `/privacy-policy`
- **Server Page**: `src/app/privacy-policy/page.tsx`
- **Client Content**: `src/components/sections/PrivacyPolicyContent.tsx`
  - useApp context（获取 config.email）
  - UniversalLink → 普通 `<a>` 标签
- **JSON-LD**:
  - `BreadcrumbList` Schema

---

## 二、关键迁移改造点

### react-router → Next.js
| 源项目 | 目标项目 |
|--------|----------|
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `to="/path"` | `href="/path"` |
| `useNavigate()` + `navigate('/path')` | `useRouter()` from `next/navigation` + `router.push('/path')` |
| `NavLink to="/path"` | `<Link href="/path">` |

### SEO 改造
| 源项目 | 目标项目 |
|--------|----------|
| `useSEO({ title, description, keywords, jsonLd })` | `export const metadata: Metadata` + `<script type="application/ld+json">` |
| 客户端动态设置 meta | 服务端静态生成 metadata |

### 数据获取改造
| 源项目 | 目标项目 |
|--------|----------|
| `useCategories()` / `useProducts()` / `useBlogPosts()`（client hooks） | Server Component 中 `getCategories()` / `getProducts()` / `getBlogPosts()`，通过 props 传递给 client sections |

### 第三方依赖移除
| 源项目 | 目标项目 |
|--------|----------|
| `@lark-apaas/client-toolkit-lite` 的 `UniversalLink` | 普通 `<a>` 标签 |
| `@lark-apaas/client-toolkit-lite` 的 `logger` | `console.error` |
| `react-router-dom` | `next/link` + `next/navigation` |

### 数据类型适配（BlogPreviewSection）
| 源项目字段 | 目标项目字段 |
|-----------|-------------|
| `post.author?.avatar` | `post.authorAvatar` |
| `post.author?.name` | `post.author`（string） |
| `post.publishedAt` | `post.date` |

---

## 三、文件结构总览

```
src/
├── app/
│   ├── page.tsx                          # 首页（Server）
│   ├── oem/page.tsx                      # OEM（Server）
│   ├── factory/page.tsx                  # Factory（Server）
│   ├── quality/page.tsx                  # Quality（Server）
│   ├── about/page.tsx                    # About（Server）
│   ├── faq/page.tsx                      # FAQ（Server）
│   ├── contact/page.tsx                  # Contact（Server, SSG）
│   ├── catalog/page.tsx                  # Catalog（Server）
│   └── privacy-policy/page.tsx           # Privacy Policy（Server）
├── components/
│   ├── sections/
│   │   ├── home/                          # 首页 sections（12个，全部 'use client'）
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HeroCanvas.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── ProductUniverseSection.tsx
│   │   │   ├── FeaturedProductsSection.tsx
│   │   │   ├── OemSection.tsx
│   │   │   ├── FactorySection.tsx
│   │   │   ├── QualitySection.tsx
│   │   │   ├── GlobalMarketSection.tsx
│   │   │   ├── BlogPreviewSection.tsx
│   │   │   └── FinalCtaSection.tsx
│   │   ├── OemPageContent.tsx            # OEM 内容（Client）
│   │   ├── FactoryPageContent.tsx         # Factory 内容（Client）
│   │   ├── QualityPageContent.tsx         # Quality 内容（Client）
│   │   ├── AboutPageContent.tsx           # About 内容（Client）
│   │   ├── FaqPageContent.tsx             # FAQ 内容（Client）
│   │   ├── ContactPageContent.tsx         # Contact 内容（Client）
│   │   ├── CatalogPageContent.tsx         # Catalog 内容（Client）
│   │   └── PrivacyPolicyContent.tsx       # Privacy 内容（Client）
│   └── forms/
│       └── ContactForm.tsx                # Contact 表单（Client，独立拆分）
```

---

## 四、JSON-LD Schema 汇总

| 页面 | FAQPage | HowTo | Service | BreadcrumbList |
|------|---------|-------|---------|----------------|
| 首页 / | ✅ 5条 | ✅ 5步 | — | — |
| OEM /oem | ✅ 3条 | — | ✅ | ✅ |
| Factory /factory | ✅ 2条 | — | ✅ | ✅ |
| Quality /quality | ✅ 2条 | — | ✅ | ✅ |
| About /about | — | — | — | ✅ |
| FAQ /faq | ✅ 4条 | — | — | ✅ |
| Contact /contact | — | — | — | ✅ |
| Catalog /catalog | — | — | — | ✅ |
| Privacy /privacy-policy | — | — | — | ✅ |

> 注：Root Layout (`app/layout.tsx`) 已全局注入 `Organization` + `WebSite` Schema，所有页面自动继承。

---

## 五、渲染策略

- **所有 9 个 page.tsx**：Server Component（无 `'use client'`），使用 `export const metadata` 设置 SEO，服务端注入 JSON-LD
- **所有页面内容组件**：`'use client'`（因使用 framer-motion、useState、useApp context 等）
- **首页数据驱动 sections**：通过 Server Component 获取数据后以 props 传递，避免客户端数据获取
- **Contact 表单**：独立拆分为 `components/forms/ContactForm.tsx`，页面本身 SSG
- **3D HeroCanvas**：保留为占位组件（返回 null），如需启用可通过 `dynamic(..., { ssr: false })` 动态导入
