---
title: STL std::vector 速查
description: 連續記憶體的序列容器，支援動態擴張、隨機存取 O(1)，是最常用的容器。
topics: C++, STL, Vector, Data Structures
difficulty: beginner
createdAt: 2025-10-05
updatedAt: 2025-10-05
---

# STL `std::vector` 中文速查（以實務使用為主）

> 以 C++17/20/23 為基準。`std::vector<T>` 是 **連續記憶體（contiguous）** 的序列容器，支援動態擴張、隨機存取（`O(1)`），是最常用的容器。

---

## 1. 什麼時候用 `std::vector`？
- 需要 **連續記憶體**（與 C 陣列/第三方 API 互通、可用 `&v[0]` / `v.data()`）。
- **隨機存取 O(1)**、尾端插入/刪除 `push_back/pop_back` 高效（均攤 amortized `O(1)`）。
- 元素數量會動態變化，但主要在**尾端**變動。若中間頻繁插入/刪除，改用 `std::list`/`deque` 或其他結構。

---

## 2. 關鍵特性與複雜度
- 迭代器：`random access`。
- 記憶體：連續配置；**成長時可能重新配置（reallocate）** → 使 **所有 iterator/指標/參考失效**。
- 主要操作（N = size）
  - `operator[] / at()`：`O(1)`（`at()`含界限檢查）。
  - `push_back / emplace_back`：均攤 `O(1)`；成長觸發 reallocate 時為 `O(N)`。
  - `insert / erase`（非尾端）：`O(N)`（因為需要搬移元素）。
  - `resize / assign`：`O(N)`（根據新元素建構/拷貝成本）。
- 容量管理
  - `size()`：目前元素個數。
  - `capacity()`：已配置容量（≥ size）。
  - `reserve(n)`：至少預留容量 n（不改 size）。
  - `shrink_to_fit()`：**非強制**請求釋放多餘容量（是否真的縮小取決於實作）。

---

## 3. 常見操作範例（最小可用片段）

### 3.1 建立 / 初始化
```cpp
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> a;                 // 空
    vector<int> b(5);              // 5 個 0
    vector<int> c(3, 7);           // 3 個 7
    vector<int> d = {1,2,3};       // init-list

    cout << d.size() << " " << d.capacity() << "\n";
}
```

### 3.2 讀寫與邊界
```cpp
vector<int> v = {10,20,30};
int x = v[1];         // 20 (無界限檢查)
int y = v.at(1);      // 20 (有界限檢查，越界拋例外)
v[2] = 99;
```

### 3.3 追加 / 擴張 / 縮小
```cpp
vector<string> names;
names.reserve(1000);              // 預留容量，避免多次重配
names.push_back("alice");
names.emplace_back(10, 'x');      // 直接建構 "xxxxxxxxxx"

names.resize(5);                  // 若擴大 → 以 T() 填充；若縮小 → 呼叫析構
names.resize(7, "pad");           // 擴大時以 "pad" 填充
names.shrink_to_fit();            // 可能縮減容量（非保證）
```

### 3.4 插入 / 刪除（中間位置）
```cpp
vector<int> v = {1,2,3,4};
v.insert(v.begin()+2, 7);         // {1,2,7,3,4}
v.erase(v.begin()+1);             // {1,7,3,4}
v.erase(v.begin()+1, v.begin()+3);// {1,4}  刪掉 [1,3) 範圍
```

### 3.5 迭代與「邊迭代邊刪除」
```cpp
for (auto it = v.begin(); it != v.end(); ) {
    if (*it % 2 == 0) it = v.erase(it);   // erase 會回傳下一個 iterator
    else ++it;
}
```

### 3.6 erase-remove 惯用法（刪除符合條件的所有元素）
```cpp
vector<int> v = {1,2,3,2,4};
v.erase(remove(v.begin(), v.end(), 2), v.end());  // 移除所有 2
// 若要自訂條件：remove_if(v.begin(), v.end(), pred)
```

### 3.7 取得底層指標
```cpp
vector<double> buf = {1.0, 2.0, 3.0};
double* p = buf.data();           // 或 &buf[0]（非空時）
```

### 3.8 二維 vector
```cpp
int n=3,m=4;
vector<vector<int>> g(n, vector<int>(m, 0));
g[1][2] = 7;
```

---

## 4. API 小抄（常用）
- 構造：`vector()` / `vector(n)` / `vector(n, val)` / `vector(first,last)` / `vector(init_list)`
- 取值：`operator[]` / `at()` / `front()` / `back()` / `data()`
- 容量：`size()` / `empty()` / `capacity()` / `reserve(n)` / `shrink_to_fit()`
- 修改：
  - 追加：`push_back()` / `emplace_back()` / `append_range(r)`（C++23）
  - 指定：`assign(n,val)` / `assign(first,last)` / `assign(init_list)`
  - 插入：`insert(pos, val/count/first,last/init_list)` / `emplace(pos, args...)`
  - 擴縮：`resize(n)` / `resize(n,val)` / `clear()` / `erase(pos)` / `erase(first,last)` / `swap()`
- 迭代：`begin()` / `end()` / `rbegin()` / `rend()` / `cbegin()` / `cend()`

> **C++23** `append_range(r)`：將 range 內容追加到尾端（部分實作尚未支援）。

---

## 5. 重要語義與陷阱
1. **重新配置（reallocation）會使** `迭代器 / 指標 / 參考` **全部失效**：  
   - 任何 `push_back / insert` 造成容量成長都可能重配。  
   - 若要維持指標有效：先 `reserve()` 足夠容量。
2. **`vector<bool>` 特例**：位壓縮的 proxy 型別，不是一般 reference；避免把它當 `bool*` 使用。
3. **插入/刪除中間元素成本高**：`O(N)` 搬移。若需求頻繁，考慮 `deque`/`list`/其他結構。
4. **`shrink_to_fit()` 非保證**：是「請求」，可能無效。
5. **越界存取**：`operator[]` 不檢查界限；需要檢查用 `at()`。
6. **自訂型別**：大量擴張/搬移會觸發拷貝/移動建構，注意成本；可提供移動建構最佳化。
7. **與 C API 互通**：用 `data()` 暴露連續記憶體；確保容量足夠避免重配時指標失效。

---

## 6. 效能建議
- **已知近似大小**：先 `reserve(N)` 減少重配次數。
- **大量追加**：優先 `emplace_back`（省一次臨時物件）。
- **批次插入**：`insert(end(), first, last)` 比逐一 `push_back` 更快（實作可能一次擴容）。
- **避免頻繁縮擴**：預估容量、合併操作，最後再 `shrink_to_fit()`。

---

## 7. 典型練習題型
- 動態收集結果（例如 backtracking 產生的解集合）。
- 前綴和、DP 表（連續記憶體有利於快取）。
- 排序 + 去重（`sort` + `erase(unique(...))`）。
- 以 `vector<pair/...>>` 儲存圖邊、事件清單等結構。

---

## 8. 迷你測試
```cpp
vector<int> v; 
v.reserve(4);
for (int i=1;i<=4;++i) v.push_back(i);     // [1,2,3,4]
auto p = v.data();
v.push_back(5);                             // 可能 reallocate → p 失效
v.erase(remove(v.begin(), v.end(), 3), v.end()); // [1,2,4,5]
```

---

## 9. 備註
- 多數實作採「倍增」策略擴容（如 x2），但標準未固定策略。  
- 連續性保證：`&v[i] + 1 == &v[i+1]`。可與 `memcpy`/C API 互通（對 trivially copyable 類型）。
