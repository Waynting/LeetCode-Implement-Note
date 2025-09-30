# LeetCode 刷題記錄 - 開發文件

## 📁 資料夾結構重新設計

### 🎯 設計原則
- **統一組織**: 所有內容按主題統一管理
- **易於維護**: 清晰的層級結構
- **靜態導出**: 支援 Next.js 靜態導出
- **主題優先**: 以演算法主題為核心組織架構

### 🗂️ 建議的新資料夾結構

```
LeetCode-Implement-Note/
├── content/                          # 所有內容統一管理
│   ├── problems/                     # 題目解題記錄
│   │   ├── array/                    # 陣列相關題目
│   │   │   ├── 0001-two-sum.md
│   │   │   ├── 0004-median-of-two-sorted-arrays.md
│   │   │   └── index.json            # 該主題題目索引
│   │   ├── linkedlist/
│   │   │   ├── 0002-add-two-numbers.md
│   │   │   ├── 0141-linked-list-cycle.md
│   │   │   └── index.json
│   │   ├── tree/
│   │   ├── graph/
│   │   └── meta.json                 # 所有題目元數據
│   │
│   ├── notes/                        # 學習筆記
│   │   ├── data-structures/          # 資料結構筆記
│   │   │   ├── array-basics.md
│   │   │   ├── linked-list-intro.md
│   │   │   └── index.json
│   │   ├── algorithms/               # 演算法筆記
│   │   │   ├── binary-search-explained.md
│   │   │   ├── dfs-bfs-explained.md
│   │   │   └── index.json
│   │   ├── techniques/               # 解題技巧
│   │   │   ├── two-pointers-technique.md
│   │   │   ├── sliding-window-pattern.md
│   │   │   └── index.json
│   │   └── concepts/                 # 核心概念
│   │       ├── time-complexity-analysis.md
│   │       └── index.json
│   │
│   └── assets/                       # 圖片、圖表等資源
│       ├── images/
│       └── diagrams/
│
├── web/                              # Next.js 網站
│   ├── src/
│   │   ├── app/                      # App Router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 首頁
│   │   │   ├── problems/
│   │   │   │   ├── page.tsx          # 題目列表
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # 題目詳情
│   │   │   ├── notes/
│   │   │   │   ├── page.tsx          # 筆記列表（帶篩選）
│   │   │   │   └── [noteId]/
│   │   │   │       └── page.tsx      # 筆記詳情
│   │   │   └── topics/
│   │   │       └── page.tsx          # 主題總覽
│   │   │
│   │   ├── components/               # 共用組件
│   │   │   ├── Header.tsx
│   │   │   ├── ProblemCard.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   └── TopicFilter.tsx
│   │   │
│   │   ├── lib/                      # 工具函數和數據
│   │   │   ├── content.ts            # 內容獲取函數
│   │   │   ├── problems.ts           # 題目數據
│   │   │   ├── notes.ts              # 筆記數據
│   │   │   └── utils.ts              # 工具函數
│   │   │
│   │   └── contexts/                 # React Context
│   │       └── ThemeContext.tsx
│   │
│   ├── public/                       # 靜態資源
│   │   ├── icon.jpg                  # 網站圖標
│   │   └── images/
│   │
│   ├── tailwind.config.js
│   ├── next.config.ts
│   └── package.json
│
├── scripts/                          # 建構和維護腳本
│   ├── build-indexes.js              # 生成索引文件
│   ├── validate-content.js           # 驗證內容格式
│   └── generate-metadata.js          # 生成元數據
│
├── docs/                             # 專案文件
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── API.md
│
├── README.md
├── GUIDE.md                          # 使用指南
└── TEMPLATE.md                       # 題目模板
```

## 🔧 技術架構

### 前端框架
- **Next.js 15** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **靜態導出** for GitHub Pages

### 核心功能
1. **深淺色主題切換**
2. **響應式設計**
3. **主題篩選系統**
4. **搜尋功能**
5. **靜態生成 (SSG)**

### 主題管理
```typescript
// 支援的主題系統
const TOPICS = [
  'Array', 'LinkedList', 'Tree', 'Graph',
  'DFS', 'BFS', 'BinarySearch', 'DynamicProgramming',
  'Greedy', 'Backtracking', 'TwoPointers', 'SlidingWindow',
  'Sort', 'HashTable', 'Stack', 'Queue',
  'Math', 'String', 'BitManipulation'
];
```

## 📝 內容組織策略

### 題目記錄格式
```markdown
# 題目標題

## 題目資訊
- **題號**: 1
- **題目名稱**: Two Sum
- **難度**: Easy
- **連結**: https://leetcode.com/problems/two-sum/
- **主題**: Array, HashTable

## 題目描述
[題目描述]

## 解法

### 解法一：暴力法
**時間複雜度**: O(n²)
**空間複雜度**: O(1)

#### 思路
[解題思路]

#### 程式碼
\`\`\`cpp
// 程式碼實作
\`\`\`

## 相關題目
- [其他相關題目]

## 心得筆記
[學習心得]
```

### 學習筆記格式
```markdown
# 筆記標題

## 概述
[核心概念說明]

## 基本概念

### 定義
[定義說明]

### 特性
[特性列表]

## 實作要點

### 關鍵操作
[操作說明]

### 時間複雜度
[複雜度分析]

## 應用場景
[使用場景]

## 相關題目
[相關 LeetCode 題目列表]

## 延伸閱讀
[參考資料]
```

## 🚀 開發流程

### 新增題目
1. 在 `content/problems/{topic}/` 下創建 `.md` 文件
2. 使用 `TEMPLATE.md` 格式
3. 更新 `index.json` 文件
4. 運行 `npm run build:indexes` 重新生成索引

### 新增筆記
1. 在 `content/notes/{category}/` 下創建 `.md` 文件
2. 更新對應的 `index.json`
3. 重新建構網站

### 本地開發
```bash
cd web
npm install
npm run dev
```

### 建構部署
```bash
npm run build
npm run export
```

## 🔄 遷移計劃

### 階段一：重組內容
1. 將 `Topics/` 下的內容移動到 `content/problems/`
2. 將 `web/public/notes/` 移動到 `content/notes/`
3. 創建索引文件

### 階段二：更新程式碼
1. 修改數據獲取邏輯
2. 更新路由結構
3. 實現新的篩選系統

### 階段三：優化部署
1. 設定自動化建構
2. 優化 SEO
3. 添加分析工具

## 📋 待辦事項

- [ ] 重新組織內容結構
- [ ] 實現內容索引系統
- [ ] 創建建構腳本
- [ ] 更新數據獲取邏輯
- [ ] 優化搜尋功能
- [ ] 添加內容驗證
- [ ] 設定 CI/CD

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支
3. 提交變更
4. 發起 Pull Request

## 📄 授權
MIT License