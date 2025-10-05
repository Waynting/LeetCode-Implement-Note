# STL set 

> 以 C++17/20 為基準，標註新版特性（C++17/20/23）。`std::set` 為 **有序、唯一鍵** 的關聯式容器，通常以 **紅黑樹** 實作。

---

## 1. 什麼時候用 `std::set`？
- 需要 **自動排序**、**不允許重複**、**可做有序查找（lower/upper_bound）**。
- 若只在意是否存在、且追求平均 O(1) 查找：考慮 `std::unordered_set`。
- 若需要重複鍵：用 `std::multiset`。

---

## 2. 關鍵特性與複雜度
- 元素型別：`Key`（同時也是 value）。
- 排序準則：`Compare`（預設 `std::less<Key>`，遞增）。
- **唯一**：插入相同鍵會被忽略（或回報已存在）。
- 迭代器：`bidirectional`（可 ++、--）。**元素為 const**（不能透過 iterator 改值）。
- 主要操作複雜度（以 N = size）：
  - `insert/emplace`：O(log N)
  - `find/lower_bound/upper_bound`：O(log N)
  - `erase(it)`：攤銷 O(1)（定位後刪除），`erase(key)`：O(log N)
  - `merge`/`extract`：O(log N) 量級
- 迭代器失效規則：
  - **插入**不會使其他 iterator 失效。
  - **刪除**會使被刪元素的 iterator 失效，其餘不受影響。

---

## 3. 常見操作範例（最小可用片段）

### 3.1 建立 / 自訂比較器
```cpp
#include <set>
#include <string>
#include <iostream>
using namespace std;

struct ByLenThenLex {
    bool operator()(const string& a, const string& b) const {
        if (a.size() != b.size()) return a.size() < b.size();
        return a < b;
    }
};

int main() {
    set<int> s1 = {3,1,2,2};      // 自動去重 → {1,2,3}

    set<string, ByLenThenLex> s2 = {"bb", "a", "aaa", "ab"};
    // 排序規則：長度優先，再字典序 → {"a","bb","ab","aaa"}

    for (auto& x : s1) cout << x << ' ';   // 1 2 3
}
```

### 3.2 插入 / 查找 / 刪除
```cpp
set<int> s;

auto [it, inserted] = s.insert(10); // C++17 結構化綁定；insert 回傳 pair<iterator,bool>
s.emplace(7);                       // 原地構造（對複雜型別更省）
s.insert({5, 8, 12});               // initializer_list

bool has7 = s.count(7) > 0;         // 或 C++20: s.contains(7)
auto it5 = s.find(5);               // O(logN)，找不到回 end()

s.erase(8);                         // 依 key 刪除（回傳刪除數量 0/1）
if (it5 != s.end()) s.erase(it5);   // 依 iterator 刪除，回傳下一個 iterator（C++11 起）
```

### 3.3 有序查找（lower/upper/equal_range）
```cpp
set<int> s = {2,4,6,8};

auto it = s.lower_bound(5);   // 第一個 >= 5 → 指向 6
auto jt = s.upper_bound(6);   // 第一個 > 6  → 指向 8
auto [l, r] = s.equal_range(6); // [l,r) 為等於 6 的範圍（在 set 中要嘛 0 要嘛 1 個）
```

### 3.4 異質查找（Heterogeneous lookup, C++14/17 透明比較器）
不必先建立臨時 `std::string`，可用 `string_view` 或 `char*` 查找：
```cpp
#include <string_view>
set<string, std::less<>> s = {"alpha","beta","gamma"}; // 注意 std::less<> 透明比較器
bool has = s.contains(std::string_view("beta"));       // C++20 contains
auto it  = s.find("gamma");                            // 直接用 char const*
```

### 3.5 變更元素鍵值？用 `extract`（C++17）
`set` 元素是 const，**不能**直接 `*it = newKey`。需 `extract` 節點、改值、再插回：
```cpp
set<int> s = {1,3,5};
auto nh = s.extract(3);        // node_handle
nh.value() = 4;                // 改鍵值
s.insert(move(nh));            // 插回（會依排序就位）
```

### 3.6 容器合併 `merge`（C++17）
將另一個 set 中“可插入”的節點移入本 set（不複製，節點搬移）：
```cpp
set<int> a = {1,3,5};
set<int> b = {2,3,4};
a.merge(b); // a: {1,2,3,4,5}, b: {3}（因 3 已存在，b 中保留衝突者）
```

### 3.7 範圍插入（C++23 `insert_range`）
```cpp
// C++23
vector<int> v = {7,1,9,4};
s.insert_range(v);        // 等同於依序 insert v 中元素
```

---

## 4. 小抄 API（常用）
- 構造：`set<Key,Compare,Allocator>`、`set(first,last)`、`set(init_list)`
- 基本：`size()` / `empty()` / `clear()` / `swap()`
- 插入：`insert(value)` / `insert(hint, value)` / `insert({..})` / `emplace(args...)` / `emplace_hint(hint, args...)` / **C++23** `insert_range(range)`
- 查找：`find(key)` / `count(key)` / **C++20** `contains(key)` / `lower_bound(key)` / `upper_bound(key)` / `equal_range(key)`
- 刪除：`erase(it)` / `erase(first,last)` / `erase(key)`
- 節點操作（C++17）：`extract(key/it)` / `merge(other)`（搭配 `node_type`）
- 迭代：`begin()` / `end()` / `rbegin()` / `rend()` / `cbegin()` / `cend()`
- 比較器：`key_comp()` / `value_comp()`
- 配置器：`get_allocator()`

---

## 5. 常見坑與最佳實踐
1. **不要改元素值**：iterator 取到的是 `const Key&`。要改鍵用 `extract`。
2. **邊迭代邊刪除**：使用回傳 iterator 的 `erase(it)` 模式：
   ```cpp
   for (auto it = s.begin(); it != s.end(); ) {
       if (條件) it = s.erase(it);   // 回傳下一個
       else      ++it;
   }
   ```
3. **效能選擇**：純查存在性且不需排序→ `unordered_set`；需要順序/界限查找→ `set`。
4. **自訂比較器需「嚴格弱序」**：確保 `!(a<b) && !(b<a)` 才視為相等，避免未定義行為。
5. **大量插入**：若來源已近似排序，插入成本更低；批量插入可先放容器再 `merge`/`insert_range`（C++23）。
6. **異質查找**：用透明比較器 `std::less<>`，避免不必要的臨時物件。

---

## 6. 典型練習題型
- 維護一組**已訪集合**、**唯一值集合**。
- 動態集合中的**第 k 小**（`set` + 迭代器移動 / 或 `order_of_key` in PBDS）。
- 線段切割、區間端點去重與排序（配合 `lower_bound`/`upper_bound`）。
- 去重並按自訂規則排序字串 / 結構體（自訂比較器）。

---

## 7. 迷你測試
```cpp
set<int> s = {5,1,5,3};
assert(s.size() == 3);                 // {1,3,5}
assert(*s.begin() == 1);
assert(*prev(s.end()) == 5);

auto it = s.lower_bound(4);            // → 5
assert(it != s.end() && *it == 5);

s.erase(3);                             // {1,5}
auto nh = s.extract(5); nh.value() = 4; s.insert(move(nh)); // {1,4}
assert(s.count(4) == 1);
```

---

## 8. 備註
- 內部多以平衡 BST（紅黑樹）實作；不同標準庫可能細節不同，但複雜度保證一致。
- 舊編譯器對某些 C++20/23 API（如 `contains`、`insert_range`）可能不支援。

