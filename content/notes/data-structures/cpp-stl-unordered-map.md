---
title: STL std::unordered_map 速查
description: 雜湊表的關聯式容器，鍵唯一、平均 O(1) 查找，無序。
topics: C++, STL, HashMap, Data Structures
difficulty: intermediate
createdAt: 2025-10-05
updatedAt: 2025-10-05
---

# STL `std::unordered_map` 中文速查（以實務使用為主）

> 以 C++17/20/23 為基準。`std::unordered_map<Key,T,Hash,KeyEq>` 是 **雜湊表** 的關聯式容器：
> - **鍵唯一**、**平均 O(1)** 插入/查找/刪除；最壞 O(N)（碰撞嚴重時）。
> - **無序**（迭代次序不保證），適合「只管是否存在/取值」而不需排序的情境。

---

## 1. 什麼時候用 `unordered_map`？
- 需要 **平均 O(1) 查找**，不在意有序遍歷。
- 作為 **計數器 / 查表**（hash table）比 `std::map` 快。
- 鍵可為自訂型別（需提供 `Hash` 與 `KeyEq`）。
- 若要範圍查詢（lower/upper_bound）或固定有序輸出→改用 `std::map`。

---

## 2. 關鍵特性與複雜度
- 迭代器：`ForwardIterator`（只能 ++）。
- 插入/查找/刪除：**平均 O(1)**；最壞 O(N)。
- 重新雜湊（rehash）可能發生在：插入導致 **載入因子** 超過 `max_load_factor`。
- **迭代器失效**：
  - `rehash/ reserve`：**所有 iterators 失效**。
  - `erase`：被刪的元素迭代器失效，其餘保持有效。
  - 參考/指標：重雜湊通常 **不會** 使其失效（除非該元素被刪）。
- 桶與負載：`bucket_count()`、`load_factor()`、`max_load_factor()`、`rehash(n)`、`reserve(n)`。

---

## 3. 常見操作範例（最小可用片段）

### 3.1 基本增查改刪
```cpp
#include <unordered_map>
#include <string>
using namespace std;

unordered_map<string, int> freq;

freq["apple"]++;                            // 若無則插入 ("apple",0) 再 ++
auto [it, inserted] = freq.insert({"a", 1}); // C++17 結構化綁定
freq.emplace("b", 2);                        // 原地建構
freq.insert_or_assign("b", 5);               // 存在則賦值，不在則插入（C++17）

auto it2 = freq.find("apple");               // 平均 O(1)，找不到回 end()
bool has = freq.count("banana") > 0;         // C++20: freq.contains("banana")

if (it2 != freq.end()) it2->second += 10;    // 修改 value
freq.erase("a");                              // 依 key 刪
```

### 3.2 預先保留容量、控制 rehash
```cpp
unordered_map<int, int> mp;
mp.reserve(100000);               // 預留桶數以容納大概元素數（減少 rehash 次數）
mp.max_load_factor(1.0f);         // 每桶平均允許的元素數（預設 ~1）
```

### 3.3 自訂雜湊與相等（自訂型別）
```cpp
struct Point { int x, y; };

struct PointHash {
    size_t operator()(const Point& p) const noexcept {
        // 混合 x,y；簡化示例，實務可用更好的 hash 混合
        return (std::hash<int>{}(p.x) * 1315423911u) ^ std::hash<int>{}(p.y);
    }
};
struct PointEq {
    bool operator()(const Point& a, const Point& b) const noexcept {
        return a.x == b.x && a.y == b.y;
    }
};

unordered_map<Point, int, PointHash, PointEq> mp;
mp[{3,4}] = 7;
```

### 3.4 異質查找（Heterogeneous lookup, **需要透明 hash/equal**）
> 若提供的 `Hash` 和 `KeyEq` **支持透明比較**（C++20 常見模式：為它們提供 `is_transparent`），即可用相容鍵型別查找而不建臨時 Key。這通常需要**自訂** Hash/KeyEq；標準的 `std::hash<Key>` 本身不一定透明。
```cpp
// 伪碼/示意：Hash/KeyEq 需定義 is_transparent 並支援 string_view/const char* 等
struct TransparentHash { using is_transparent = void; /* ... */ };
struct TransparentEq   { using is_transparent = void; /* ... */ };

unordered_map<string, int, TransparentHash, TransparentEq> mp2;
bool ok = mp2.contains(std::string_view("hello"));
```

### 3.5 節點與合併（C++17）
```cpp
unordered_map<int,string> a = {{1,"one"},{3,"three"}};
unordered_map<int,string> b = {{2,"two"},{3,"tres"}};

auto nh = a.extract(1);        // 取出 node_handle（鍵可讀，值可改）
nh.mapped() = "uno";           // 改 value
b.insert(move(nh));            // 插入到 b

a.merge(b);                    // 把 b 中可插入的節點搬到 a；衝突鍵留在 b
```

### 3.6 「邊迭代邊刪除」
```cpp
for (auto it = freq.begin(); it != freq.end(); ) {
    if (it->second == 0) it = freq.erase(it); // erase 回傳下一個 iterator
    else ++it;
}
```

---

## 4. API 小抄（常用）
- 構造：`unordered_map()` / `unordered_map(bucket_count)` / `unordered_map(first,last)` / `unordered_map(init_list)`
- 查找：`find(key)` / `count(key)` / **C++20** `contains(key)`
- 存取：`operator[](key)` / `at(key)` / `at(key) const`
- 插入：`insert(value)` / `insert(hint,value)` / `insert(init_list)` / `emplace(args...)` / `try_emplace(key,args...)` / `insert_or_assign(key,obj)`
- 刪除：`erase(it)` / `erase(first,last)` / `erase(key)` / **C++20** `erase_if(map, pred)`（非成員）
- 桶與 rehash：`bucket_count()` / `bucket(key)` / `load_factor()` / `max_load_factor()` / `rehash(n)` / `reserve(n)` / `begin(n), end(n)`（桶級迭代）
- 節點：**C++17** `extract(key/it)` / `merge(other)`（`node_type`）
- 迭代：`begin()` / `end()` / `cbegin()` / `cend()`（次序不保證，且 rehash 會改變）

---

## 5. 常見坑與最佳實踐
1. **rehash 會使所有 iterators 失效**：
   - 在保留指標/iterator 之後 `insert` 可能觸發 rehash，導致失效。
   - 若需要穩定：先 `reserve()` 足夠容量，或用 `std::map`。
2. **`operator[]` 會插入預設值**：僅查值請用 `find/contains/at`，避免誤插。
3. **鍵的 hash/equal 必須相容**：兩者的「相等」要對應到同樣的 hash 值域，否則行為退化或錯誤。
4. **迭代次序不固定**：不要依賴輸出順序；若要排序輸出，拷貝鍵到 `vector` 後排序。
5. **大量插入**：先 `reserve(N)`，減少 rehash 次數。
6. **自訂型別 hash**：確保雜湊分布良好，避免碰撞造成性能下降。
7. **異質查找**：需要自訂透明 Hash/KeyEq，否則預設不一定支援。

---

## 6. 典型練習題型
- 次數統計（字頻、元素頻率）。
- LRU/Cache 的 key→node 映射（通常配合 list）。
- 兩數和/子陣列和等「查表」型解法。
- 去重與存在性檢查（搭配 `unordered_set`）。

---

## 7. 迷你測試
```cpp
unordered_map<string,int> m;
m.reserve(8);
m["a"] = 1; m["b"] = 2; m["c"] = 3;

auto it = m.find("b");
if (it != m.end()) it->second += 10;

m.erase("a");
for (auto& [k,v] : m) { /* 無序輸出 */ }

// 測 rehash 失效
auto it2 = m.begin();
m.insert({"x", 42});    // 可能 rehash
// it2 可能失效，避免繼續使用
```

---

## 8. 備註
- 大部分實作採 **分離鏈結法（chaining）**：每個桶是一條鏈或小向量。
- C++ 標準不保證 hash 分布與 rehash 策略，但提供負載因子介面讓你調整。
- 舊編譯器對 C++20/23 的 `contains`、`erase_if` 等 API 支援度不一。

