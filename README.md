# TMDB Home Assessment

## 專案簡介

本專案為電影資訊瀏覽與收藏平台，串接 TMDB API，提供「最新電影清單」、「電影詳情（含演員、預告片、導演、評論）」與「待看清單」等功能，支援無限滾動、搜尋、收藏、評論瀏覽。

---

## 主要功能

- **最新電影清單**：支援無限滾動載入，並使用 lazy load 顯示電影卡片、評分、上映日、簡介。
- **電影搜尋**：可依關鍵字搜尋電影。
- **電影詳情頁**：
  - 基本資訊、劇情簡介、評分、類型、製作公司、外部連結
  - **演員陣容**（含頭像、角色名）
  - **預告片**（YouTube 影片嵌入）
  - **導演與主要工作人員**（頭像、職稱）
  - **評論**（作者、內容、評分、連結）
- **待看清單**：可將電影加入/移除收藏，並於專屬頁面瀏覽。
- **全站統一 Loading/Error 處理**：React Query + 共用元件。
- **RWD 響應式設計**：支援桌機與手機瀏覽。

---

## 技術棧

- **前端框架**：React 19 + Vite + TypeScript
- **狀態管理**：Zustand
- **資料請求/快取**：@tanstack/react-query
- **UI 樣式**：Tailwind CSS
- **圖示**：Heroicons
- **API**：TMDB (The Movie Database)
- **Lint/格式化**：ESLint、Prettier

---

## 專案結構

```
tmdb-home-accessment/
├── public/                # 靜態資源
├── src/
│   ├── assets/            # 靜態圖片、SVG
│   ├── components/
│   │   ├── common/        # 共用元件
│   │   │   ├── MovieCard.tsx
│   │   │   ├── PersonCard.tsx
│   │   │   ├── BackButton.tsx
│   │   │   ├── ReactQueryHandler.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ReactQueryProvider.tsx
│   │   └── Layout/        # 版型元件
│   │       ├── Header.tsx
│   │       └── Layout.tsx
│   ├── hooks/             # 自訂 React hooks
│   │   ├── useReactQueryFetch.ts
│   │   ├── useInfiniteScroll.ts
│   │   └── useAppear.ts
│   ├── lib/
│   │   └── api/           # API 設定與服務
│   │       ├── apiConfig.ts
│   │       └── apiService.ts
│   ├── pages/             # 主要頁面
│   │   ├── MovieListPage.tsx
│   │   ├── MovieDetailPage.tsx
│   │   └── WatchlistPage.tsx
│   ├── stores/            # 狀態管理（Zustand）
│   │   └── watchlistStore.ts
│   ├── types/             # TypeScript 型別定義
│   │   └── tmdb.ts
│   ├── test/              # 測試設定
│   ├── App.tsx            # 入口元件
│   ├── main.tsx           # 入口檔案
│   ├── index.css          # 全域樣式
│   └── router/            # 路由設定
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── ...（其他設定檔）
```

---

## 安裝與啟動

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **本地開發**
   ```bash
   npm run dev
   ```

---

## 其他說明

- **API 來源**：[TMDB 官方文件](https://developers.themoviedb.org/3)