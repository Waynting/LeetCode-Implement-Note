---
title: STL std::map 速查
description: 有序、唯一鍵的關聯式容器，平衡 BST 實作，依鍵排序。
topics: C++, STL, Map, Data Structures
difficulty: intermediate
createdAt: 2025-10-05
updatedAt: 2025-10-05
---

# STL `std::map` 中文速查（以實務使用為主）

> 以 C++17/20/23 為基準。`std::map<Key, T, Compare>` 是 **有序、唯一鍵** 的關聯式容器（平衡 BST，常見為紅黑樹）。元素型別為 `pair<const Key, T>`，**依鍵排序**。

---

## 1. 什麼時候用 `std::map`？
- 需要 **自動排序** 與 **有序查找（lower/upper_bound）**。
- 需要 **唯一鍵**，且常做範圍/邊界查詢。
- 若只在意存在性/平均 O(1) 查找，不需順序 → `std::unordered_map`。
- 若需要重複鍵 → `std::multimap`。

---

## 2. 關鍵特性與複雜度
- 排序準則：`Compare`（預設 `std::less<Key>`，遞增）。
- 迭代器：`bidirectional`（可 ++、--）。
- **元素鍵為 const**（`pair<const Key, T>`），不可直接修改鍵值。
- 典型操作複雜度（N = size）：
  - `insert / emplace / find / lower_bound / upper_bound`：`O(log N)`
  - `erase(key)`：`O(log N)`；`erase(it)`：定位後攤銷 `O(1)`
  - `operator[]`：`O(log N)`，必要時 **插入預設值**（有副作用！）
- 迭代器失效：
  - **插入**不會使其他 iterator 失效。
  - **刪除**會使被刪元素的 iterator 失效，其餘不影響。

---

## 3. 常見操作範例（最小可用片段）

### 3.1 建立 / 自訂比較器
```cpp
#include <map>
#include <string>
using namespace std;

struct ByLenThenLex {
    bool operator()(const string& a, const string& b) const {
        if (a.size() != b.size()) return a.size() < b.size();
        return a < b;
    }
};

map<int, string> m1 = {{2,"two"}, {1,"one"}};  // 依 key 排序 → (1,"one"), (2,"two")
map<string, int, ByLenThenLex> m2;             // 自訂排序
```

### 3.2 插入 / 查找 / 修改值
```cpp
map<string, int> cnt;

cnt["apple"]++;                 // 若不存在會插入 ("apple", 0) 再 ++
auto [it, inserted] = cnt.insert({"banana", 3});   // C++17 結構化綁定
cnt.emplace("cherry", 5);                           // 就地建構

auto it2 = cnt.find("banana");    // O(logN)；找不到回 end()
bool has = cnt.count("apple") > 0; // 或 C++20: cnt.contains("apple")

if (it2 != cnt.end()) it2->second += 10;  // 修改 value
```

### 3.3 不想插入就查值：`at` 與 `find`（避免 `operator[]` 副作用）
```cpp
// operator[] 會在不存在時插入 default(T)！查值時容易誤插入
int x = cnt["not_exist"];     // ⚠️ 插入 ("not_exist", 0)（若 T=int）

auto it3 = cnt.find("not_exist");     // 建議查找用 find/contains
if (it3 != cnt.end()) {
    int v = it3->second;
}

int v2 = cnt.at("apple");             // 存在才回傳；否則丟出 out_of_range
```

### 3.4 C++17 便利 API：`try_emplace` / `insert_or_assign`
```cpp
map<string, string> mp;

// 只有在 key 不存在時才建構 value（避免無謂拷貝）
mp.try_emplace("k", 10, 'x'); // value 以 string(10,'x') 原地建構

// 若存在則覆蓋，否則插入
mp.insert_or_assign("k", "new_value");
```

### 3.5 有序查找（lower/upper/equal_range）
```cpp
map<int,string> m = {{2,"b"},{4,"d"},{6,"f"}};

auto it = m.lower_bound(5);    // 第一個 key >= 5 → 指向 (6,"f")
auto jt = m.upper_bound(4);    // 第一個 key > 4  → 指向 (6,"f")
auto [l, r] = m.equal_range(4);// 介於 [4,4] 的範圍 → 單點或空
```

### 3.6 異質查找（Heterogeneous lookup, C++14/17 透明比較器）
```cpp
#include <string_view>
map<string, int, std::less<>> mp = {{"alpha",1},{"beta",2}};
bool has = mp.contains(std::string_view("beta")); // C++20 contains
auto it  = mp.find("alpha");                      // 直接用 const char* 查找
```

### 3.7 節點操作 `extract` / 容器合併 `merge`（C++17）
```cpp
map<int,string> a = {{1,"one"},{3,"three"}};
map<int,string> b = {{2,"two"},{3,"tres"}};

auto nh = a.extract(1);   // 取出 node_handle（鍵可讀，值可改）
nh.key() == 1;            // 鍵是 const? 對 map：鍵讀不可改，但可搬移節點
nh.mapped() = "uno";      // 可改 value
b.insert(move(nh));       // 插入到 b

a.merge(b); // 將 b 中可插入的節點移入 a；衝突鍵留在 b
```

### 3.8 刪除與「邊迭代邊刪」
```cpp
for (auto it = cnt.begin(); it != cnt.end(); ) {
    if (it->second == 0) it = cnt.erase(it);  // C++11: erase(it) 回傳下一個
    else ++it;
}
// 依 key 刪除：cnt.erase("apple");   // 回傳刪除數量 0/1
```

---

## 4. API 小抄（常用）
- 構造：`map()` / `map(comp)` / `map(first,last,comp)` / `map(init_list,comp)`
- 查找：`find(key)` / `count(key)` / **C++20** `contains(key)` / `lower_bound(key)` / `upper_bound(key)` / `equal_range(key)`
- 存取：`operator[](key)` / `at(key)` / `at(key) const`
- 插入：`insert(value)` / `insert(hint, value)` / `emplace(args...)` / `emplace_hint(hint,args...)` / **C++17** `try_emplace(key,args...)` / **C++17** `insert_or_assign(key,obj)`
- 刪除：`erase(it)` / `erase(first,last)` / `erase(key)` / **C++20** `erase_if(map, pred)`（非成員）
- 節點：**C++17** `extract(key/it)` / `merge(other)`（`node_type`）
- 迭代：`begin()` / `end()` / `rbegin()` / `rend()` / `cbegin()` / `cend()`
- 比較器與配接：`key_comp()` / `value_comp()` / `get_allocator()`

---

## 5. 常見坑與最佳實踐
1. **`operator[]` 會插入**：查值時慎用，避免誤插入預設值；純查用 `find/contains/at`。
2. **不能直接改鍵**：鍵是 const。若要變更鍵，考慮 `extract` 後改 `node` 再插回（或刪了重插）。
3. **自訂比較器要嚴格弱序**：確保 `!(a<b) && !(b<a)` 表示等價，否則行為未定。
4. **效能選擇**：需要 O(1) 平均查找就用 `unordered_map`；需要順序/邊界查找用 `map`。
5. **異質查找**：用 `std::less<>` 作為透明比較器，避免臨時物件（如 `string_view`）。
6. **大量插入**：可先收集後一次 `insert` 範圍或 `merge`；鍵接近有序時效率更好。
7. **迭代器穩定**：插入不失效、刪除僅影響被刪元素，但**不要**在循環中無條件 `++it` 後又 `erase`。

---

## 6. 典型練習題型
- 頻率統計（字數、元素出現次數）。
- 區間/事件按鍵排序後的掃描、上/下界查找。
- LRU/Cache 混合（`map` + `list`，或考慮 `ordered_map` 替代）。
- 自訂排序的字串/結構體映射。

---

## 7. 迷你測試
```cpp
map<int,string> m;
m[10] = "ten";                   // 插入
m.insert({5,"five"});
m.try_emplace(7, 3, 'x');        // "xxx"
m.insert_or_assign(10, "TEN");

auto it = m.lower_bound(6);      // → key=7
m.erase(5);                      // 刪 key=5

for (auto& [k,v] : m) { /* 有序輸出 */ }
```

---

## 8. 備註
- 多數實作為紅黑樹，保證 `O(logN)` 操作與有序迭代。
- 舊編譯器可能不支援 C++20/23 API（如 `contains`、`erase_if`、`insert_range`）。
