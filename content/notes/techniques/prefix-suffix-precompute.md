---
title: 前綴 / 後綴預計算與應用
description: 預先計算累積資訊一次 → 回答多次查詢或在 O(1)/O(log n) 內驗證約束條件。
topics: Prefix, Suffix, Precompute, Array
difficulty: intermediate
createdAt: 2025-10-05
updatedAt: 2025-10-05
---

# 前綴 / 後綴預計算與應用

## 0. 概述
- **概念名稱**：前綴 / 後綴預計算（總和、最小/最大值、單調性等）
- **類別**：演算法預處理
- **標籤**：prefix sum, suffix sum, prefix min/max, inc/dec flags, feasibility checks, difference array, 2D prefix sum, XOR prefix
- **前置知識**：陣列、基礎數學、時間/空間權衡
- **熟悉度（1–5）**：3
- **最後更新**：2025-10-05 (UTC+8)

---

## 1. 核心概念（What & Why）
**預先計算累積資訊一次 → 回答多次查詢或在 O(1)/O(log n) 內驗證約束條件。**
- **前綴**在索引 `i` 處總結從開頭到 `i` 的資料（例如：總和/最小值/最大值/遞增驗證）。
- **後綴**在索引 `i` 處總結從 `i` 到結尾的資料。
- 將它們結合以快速評估分割/切割、範圍和可行性。

**何時使用**
- 多次**範圍**查詢。
- 需要在**每個切點檢查可行性**（例如：前綴嚴格遞增**且**後綴嚴格遞減）。
- 將昂貴的每次查詢成本 → 在 O(n) 預處理後變成便宜的常數時間。

---

## 2. 標準構造方式

### 2.1 前綴和（1D）
- `pref[i] = a[0] + ... + a[i]`（使用 64 位元以避免溢位）
- 範圍和 `[l..r] = pref[r] − (l>0 ? pref[l‑1] : 0)`

**C++ 程式碼片段**
```cpp
vector<long long> pref(n);
pref[0] = a[0];
for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + a[i];

auto range_sum = [&](int l, int r) -> long long {
    return pref[r] - (l ? pref[l-1] : 0LL);
};
```

### 2.2 後綴和
```cpp
vector<long long> suff(n);
suff[n-1] = a[n-1];
for (int i = n-2; i >= 0; --i) suff[i] = suff[i+1] + a[i];
```

### 2.3 前綴最小/最大 & 後綴最小/最大
- `pmin[i] = min(a[0..i])`, `pmax[i] = max(a[0..i])`
- `smin[i] = min(a[i..n-1])`, `smax[i] = max(a[i..n-1])`

### 2.4 單調性標記（遞增/遞減可行性）
- `inc[i] = inc[i-1] && (a[i-1] < a[i])`（嚴格遞增前綴）
- `dec[i] = dec[i+1] && (a[i] > a[i+1])`（嚴格遞減後綴）

### 2.5 前綴 XOR / AND / OR / GCD
- XOR: `px[i] = px[i-1] ^ a[i]` → 在 O(1) 內得到範圍 XOR。
- GCD: `pg[i] = gcd(pg[i-1], a[i])`, `sg[i] = gcd(a[i], sg[i+1])` → 透過 `gcd(pg[l-1], sg[r+1])` 得到範圍 gcd。

### 2.6 差分陣列（範圍加法 O(1)，最後用前綴處理）
- 在 `[l..r]` 加 `+v`: `diff[l] += v; diff[r+1] -= v;`
- 還原: `arr = prefix(diff)`。

### 2.7 2D 前綴和（積分影像）
- `P[i][j] = sum of A[0..i][0..j]`
- 矩形和 `(r1..r2, c1..c2)` 透過容斥原理計算。

---

## 3. 典型應用

1. **範圍和 / XOR 查詢**：當只需要總和/XOR 時，可作為 RMQ 的替代方案。
2. **平衡 / 分割問題**：在約束條件下最小化 `|sum(left) − sum(right)|`。
3. **切點可行性**：例如 `inc[i] && dec[i+1]` 確保左邊嚴格遞增且右邊嚴格遞減。
4. **排除一個元素的 GCD**：`除了 a[k] 的所有元素的 gcd = gcd(pg[k-1], sg[k+1])`。
5. **閾值 / 邊界測試**：前綴最小值 vs 當前值，或後綴最大值 vs 當前值。
6. **差分陣列**：多次範圍更新 + 一次最終處理。
7. **2D 範圍和**：在 O(1) 內進行子矩陣查詢。

---

## 4. 模式 —「枚舉切點並預計算可行性」
**目標**：快速檢查在 `i` 之後切割是否有效，然後評估指標（例如：總和差異）。

**步驟**
1. 建立 `inc[0..i]` 和 `dec[i+1..]` 標記。
2. 建立 `pref` 以在 O(1) 內得到左/右總和。
3. 迴圈所有 `i` (0..n‑2)，若可行：計算指標並取最小/最大值。

**虛擬碼**
```text
build inc[], dec[], pref[]
best = +INF
for i in 0..n-2:
    if inc[i] && dec[i+1]:
        left  = pref[i]
        right = pref[n-1] - pref[i]
        best = min(best, |left - right|)
return best or -1 if no feasible
```

---

## 5. 邊界情況與陷阱
- **嚴格 vs 非嚴格**：正確使用 `<` / `>` vs `<=` / `>=`。
- **單一元素子陣列**：通常計為嚴格單調；確認題目說明。
- **溢位**：對總和使用 `long long`；注意 2D 總和。
- **索引**：`pref[r] − pref[l-1]` 模式；保護 `l=0`。
- **空邊**：枚舉切點時，確保兩邊都非空（`i ≤ n‑2`）。
- **2D 邊界**：容斥原理的 off-by-one。
- **差分陣列最終處理**：別忘了最後的前綴處理。

---

## 6. 微練習
1. 為陣列建立 `inc[]` / `dec[]` 並計算有多少可行的切點存在。
2. 給定查詢 `[l,r]`，用 `pref[]` 和 `suff[]` 回答 `sum(l,r)`（練習兩者）。
3. 用 1D 差分陣列實作「範圍加法更新 + 點查詢」。
4. 實作 2D 前綴和並查詢矩形總和。
5. 用前綴/後綴 GCD 陣列實作排除一個元素的 GCD。

---

## 7. C++ 最小骨架

**前綴/後綴和 & 可行性**
```cpp
vector<long long> pref(n);
pref[0] = a[0];
for (int i = 1; i < n; ++i) pref[i] = pref[i-1] + a[i];

vector<char> inc(n, 0), dec(n, 0);
inc[0] = 1;
for (int i = 1; i < n; ++i) inc[i] = inc[i-1] && (a[i-1] < a[i]);
dec[n-1] = 1;
for (int i = n-2; i >= 0; --i) dec[i] = dec[i+1] && (a[i] > a[i+1]);
```

**差分陣列**
```cpp
vector<long long> diff(n+1);
auto add = [&](int l, int r, long long v){
    diff[l] += v;
    if (r+1 < (int)diff.size()) diff[r+1] -= v;
};
vector<long long> arr(n);
long long run = 0;
for (int i = 0; i < n; ++i) { run += diff[i]; arr[i] = run; }
```

**2D 前綴（簡要）**
```cpp
vector<vector<long long>> P(n+1, vector<long long>(m+1));
for (int i = 1; i <= n; ++i)
  for (int j = 1; j <= m; ++j)
    P[i][j] = A[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1];

auto rect = [&](int r1,int c1,int r2,int c2){
  return P[r2][c2]-P[r1-1][c2]-P[r2][c1-1]+P[r1-1][c1-1];
};
```

---

## 8. 相關概念
- 滑動視窗（當範圍連續且移動 1 時）。
- Fenwick Tree / Segment Tree（帶 log 因子的範圍查詢/更新）。
- 單調堆疊/佇列（不同的「單調」但常與前綴資訊配對）。
- 稀疏表（等冪範圍查詢，如 min/max）。

---

## 9. 編碼前快速檢查清單
- 決定嚴格 vs 非嚴格。
- 如果值可能很大或數量很多，選擇 64 位元總和。
- 確認切點範圍（確保兩邊非空）。
- 僅預計算所需內容（總和？最小值？標記？gcd？）。
- 為 `n=1/2`、相等元素、負數、大值加入測試。

---

## 10. 個人筆記
- 對於有約束條件的分割陣列問題，**inc/dec + 前綴和**是強大的 O(n) 模式。
- 當有**多次範圍更新**但只有一次最終讀取時，差分陣列很好用。
- 2D 前綴和通常是無更新的子矩陣查詢的最快路徑。
