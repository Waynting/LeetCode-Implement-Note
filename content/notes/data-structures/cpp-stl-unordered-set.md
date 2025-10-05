---
title: STL std::unordered_set 速查
description: 雜湊表的集合容器，元素唯一、平均 O(1) 查找，無序。
topics: C++, STL, HashSet, Data Structures
difficulty: intermediate
createdAt: 2025-10-05
updatedAt: 2025-10-05
---

# STL `std::unordered_set` 中文速查（以實務使用為主）

> 以 C++17/20/23 為基準。`std::unordered_set<T, Hash, KeyEq>` 是 **雜湊表** 的集合容器：
> - **元素唯一**、**平均 O(1)** 插入/查找/刪除；最壞 O(N)（碰撞嚴重）。
> - **無序**（迭代次序不保證），適合做「存在性檢查／去重」與快速查找。

---

## 1. 什麼時候用 `unordered_set`？
- 只在意「是否存在」或需要 **平均 O(1) 查找**。
- 要快速去重、記錄 visited、做 membership 查詢。
- 若需要 **排序／有序遍歷／下界查找** → 用 `std::set`。
- 若需要記錄次數（鍵→值） → 用 `std::unordered_map`。

---

## 2. 關鍵特性與複雜度
- 迭代器：`ForwardIterator`（只能 ++）。
- 插入/查找/刪除：**平均 O(1)**；碰撞嚴重時最壞 O(N)。
- **rehash**（重雜湊）在桶數不足時發生，會：
  - 使 **所有 iterators 失效**。
  - 通常 **不會** 使指向元素的參考/指標失效（除非元素被刪）。
- 容量與負載：`bucket_count()`、`load_factor()`、`max_load_factor()`、`rehash(n)`、`reserve(n)`。

---

## 3. 常見操作範例（最小可用片段）

### 3.1 基本增查刪
```cpp
#include <unordered_set>
using namespace std;

unordered_set<int> s;

auto [it, inserted] = s.insert(10);    // C++17 結構化綁定
s.emplace(7);                           // 原地建構（對複雜型別更省）
s.insert({5, 8, 12});                   // initializer_list

bool has7 = s.count(7) > 0;             // C++20: s.contains(7)
auto it5 = s.find(5);                   // 平均 O(1)，找不到回 end()

s.erase(8);                             // 依 key 刪除（回傳刪除數量 0/1）
if (it5 != s.end()) s.erase(it5);       // 依 iterator 刪除，回傳下一個 iterator
```

### 3.2 預留容量／控制 rehash
```cpp
unordered_set<string> st;
st.reserve(100000);            // 減少 rehash 次數
st.max_load_factor(1.0f);      // 每桶平均允許元素數（預設約 1.0）
```

### 3.3 自訂雜湊與相等（自訂型別）
```cpp
struct Point { int x, y; };

struct PointHash {
    size_t operator()(const Point& p) const noexcept {
        return (hash<int>{}(p.x) * 1315423911u) ^ hash<int>{}(p.y);
    }
};
struct PointEq {
    bool operator()(const Point& a, const Point& b) const noexcept {
        return a.x == b.x && a.y == b.y;
    }
};

unordered_set<Point, PointHash, PointEq> ps;
ps.insert({3,4});
```

### 3.4 異質查找（Heterogeneous lookup，需透明 Hash/KeyEq）
> 若 Hash/KeyEq 提供 `is_transparent` 並支援相容鍵型別，可避免建立臨時物件。
```cpp
// 示意：為 Hash/KeyEq 定義 using is_transparent = void;
struct TransparentHash { using is_transparent = void; /* ... */ };
struct TransparentEq   { using is_transparent = void; /* ... */ };

unordered_set<string, TransparentHash, TransparentEq> st2;
bool ok = st2.contains(std::string_view("hello")); // C++20 contains
auto it = st2.find("hello");                       // 直接用 const char*
```

### 3.5 「邊迭代邊刪除」
```cpp
for (auto it = s.begin(); it != s.end(); ) {
    if (*it % 2 == 0) it = s.erase(it);  // erase 回傳下一個 iterator
    else ++it;
}
```

---

## 4. API 小抄（常用）
- 構造：`unordered_set()` / `unordered_set(bucket_count)` / `unordered_set(first,last)` / `unordered_set(init_list)`
- 查找：`find(key)` / `count(key)` / **C++20** `contains(key)`
- 插入：`insert(value)` / `insert(hint,value)` / `insert(init_list)` / `emplace(args...)`
- 刪除：`erase(it)` / `erase(first,last)` / `erase(key)` / **C++20** `erase_if(set, pred)`（非成員）
- 桶與 rehash：`bucket_count()` / `bucket(key)` / `load_factor()` / `max_load_factor()` / `rehash(n)` / `reserve(n)` / `begin(n), end(n)`（桶級迭代）
- 迭代：`begin()` / `end()` / `cbegin()` / `cend()`（次序不保證，rehash 會改變）

---

## 5. 常見坑與最佳實踐
1. **rehash 使所有 iterators 失效**：在保存 iterator 後進行插入可能觸發 rehash，請先 `reserve()`。
2. **不要依賴迭代順序**：`unordered_set` 無序；若要排序輸出，拷貝到 `vector` 後 `sort`。
3. **良好的雜湊與相等比較**：確保 `Hash` 與 `KeyEq` 一致且分布良好；碰撞多會降速。
4. **大量插入**：預先 `reserve(N)`；適度調整 `max_load_factor()`。
5. **異質查找**：需要自訂透明 Hash/KeyEq 才能用 `string_view`/`char*` 等相容鍵。
6. **元素是唯一的**：若需要重複元素 → 請用 `unordered_multiset`。

---

## 6. 典型練習題型
- 去重與存在性檢查（Two Sum 的輔助集合、子陣列和去重）。
- 記錄 visited（BFS/DFS 狀態集合）。
- 快速判斷字元/字串集合包含關係。
- 流式資料的唯一元素統計（搭配 `unordered_map` 追數量）。

---

## 7. 迷你測試
```cpp
unordered_set<int> s = {1,2,3,2};
assert(s.size() == 3);

auto it = s.find(2);
if (it != s.end()) s.erase(it);
s.insert(100);

size_t b = s.bucket(100);           // 100 所在桶索引
float lf = s.load_factor();         // 當前負載
s.rehash(128);                      // 重雜湊到至少 128 桶（迭代器失效！）
```

---

## 8. 與 `std::set` 對照（簡表）
| 面向 | `unordered_set` | `set` |
|---|---|---|
| 存取複雜度 | 平均 O(1)，最壞 O(N) | O(log N) |
| 是否有序 | 否 | 是（依 Compare 排序） |
| 邊界查找 | 不支援 lower/upper_bound | 支援 |
| 迭代器 | Forward（只能 ++） | Bidirectional（可 ++/--） |
| 迭代穩定 | rehash 使所有 iterators 失效 | 插入不失效，刪除僅影響被刪元素 |

---

## 9. 備註
- 常見實作為 **分離鏈結法（chaining）**：每桶是一條鏈或小陣列。
- C++ 標準不保證 rehash 策略；透過 `reserve / max_load_factor` 可影響行為。
- 老舊編譯器對 C++20/23 API（如 `contains`、`erase_if`）支援度不一。

