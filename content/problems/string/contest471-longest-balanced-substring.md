---
title: Longest Balanced Substring I（周賽 471）
slug: longest-balanced-substring-i
contest: Weekly Contest 471
level: Medium
tags: [prefix-count, frequency, brute-force, hashmap]
languages: [C++17, Pseudocode]
---

# 題目重述（中文）
給一個由小寫英文字母組成的字串 `s`。若一段子字串中**所有出現的不同字元，其出現次數都相同**，則稱該子字串為 **balanced**。請回傳最長 balanced 子字串的長度。

- 範例 1：`s = "abbac"` → 最長為 `"abba"`，長度 4（'a' 與 'b' 各 2 次）。  
- 範例 2：`s = "zzabccy"` → 最長為 `"zabc"`，長度 4（z,a,b,c 各 1 次）。  
- 範例 3：`s = "aba"` → 最長為 2（如 `"ab"` 或 `"ba"`）。  
- 限制：`1 <= |s| <= 1000`。

---

# 解題直覺與套路
- **判準**：一段區間 `[i..j]` 若為 balanced，則該區間**所有非零頻率**必須相等。  
- **固定左端、擴展右端**：對每個起點 `i`，維護一個大小 26 的頻率陣列，`j` 由 `i` 向右擴展。每一步僅需 O(26) 檢查是否所有非零頻率相等。  
- 由於字母表固定為 26，時間複雜度 **O(n^2 * 26)** 在 `n <= 1000` 下可接受。

> 訊號：這題的「相等頻率」對小字母表可用直接掃描判斷；若字母種類減少（例如僅 `'a'/'b'/'c'`），可以用**前綴差分鍵**進一步做到 O(n)。

---

# 分層提示（Progressive Hinting）
**Tier 1（定向）**  
- 目標：找出最長子字串，使其中所有出現的字母出現次數相同。  
- 路線：雙層區間枚舉 + 26 字母頻率統計。

**Tier 2（邊界與限制）**  
- 空字串不計；單一字母連續段本身也 balanced。  
- 資料範圍允許 O(n^2 * 26)。注意整數型別與索引界線。

**Tier 3（解法綱要）**  
1. 外層固定左端 `i`，內層擴右端 `j`。  
2. 每次加入 `s[j]` 後，掃描 26 個頻率，取**非零頻率**的 `minF` 與 `maxF`。  
3. 若 `minF == maxF`，則 `[i..j]` balanced，更新答案長度 `j - i + 1`。

**Tier 4（偽碼骨架）**  
```text
best = 0
for i in [0..n-1]:
    freq[26] = 0
    for j in [i..n-1]:
        freq[s[j]-'a']++
        minF = +INF, maxF = 0
        for c in 0..25:
            if freq[c] > 0:
                minF = min(minF, freq[c])
                maxF = max(maxF, freq[c])
        if minF != +INF and minF == maxF:
            best = max(best, j - i + 1)
return best
```

**Tier 5（優化／變體）**  
- 若字母集為固定三種（如 `'a','b','c'`），可使用**前綴計數差**：以 `(A-B, A-C)` 當鍵找最長區間（所有三者相等），再對每一對字母（如 `a/b`）在**過濾掉第三字母**的序列上，用前綴和相等技巧找最長二者相等區間，整體 **O(n)**。

---

# 常見錯誤（對照）
> 你原本的程式在驗證時把「頻率」去跟「字母索引 `k`（0..25）」比較：  
> `if (hash[k] != 0 && hash[k] != k) ...` ← **錯誤**。  
> 正確應該是：**所有非零頻率彼此相等**（或等於某個共同頻率 `t`）。

- **錯誤比較**：`hash[k] != k`（把次數拿去比索引）  
- **正確比較**：`minF == maxF`（僅在非零頻率上比），或 `hash[k] == t`。

另外，平衡判斷通過後，**子字串長度**要用 `j - i + 1`；不需要自行重算為 `t * distinctCount`。

---

# C++ 提示骨架（不含可提交完整碼）
> 僅供結構參考，避免直接可交。

```cpp
int longestBalanced(string s) {
    int n = (int)s.size();
    int best = 0;
    for (int i = 0; i < n; ++i) {
        int freq[26] = {0};
        for (int j = i; j < n; ++j) {
            // 1) add s[j] into freq
            // 2) scan 26 letters:
            //    compute minF among freq>0, and maxF among freq>0
            // 3) if (minF != INF && minF == maxF) best = max(best, j-i+1);
        }
    }
    return best;
}
```

---

# 複雜度分析
- 時間：外層 O(n)、內層 O(n)、驗證 O(26) ⇒ **O(n^2)**（常數 26）。  
- 空間：**O(1)**（固定 26 的頻率陣列）。

---

# 測試資料（含邊界）
- `abbac` → 4  
- `zzabccy` → 4  
- `aba` → 2  
- `aaaa` → 4（單一字母整段）  
- `abcabc` → 6（a,b,c 各 2 次）  
- `aabbbc` → 4（例如 `aabb`）  
- `z` → 1（單字元）  
- `ab` → 2  
- `abca` → 3（如 `abc`）

---

# 筆記（自評）
- 我的 **外層固定左端、內層擴右端** 的做法是對的；但**比較方式錯了**，把頻率拿去跟字母索引比，導致判斷失真。修成「非零頻率的 min/max 相等」後即可 AC。  
- 周賽若只到第二題也沒關係，重點是把**錯誤歸因**與**正解套路**內化，下次遇到「所有字母頻率相等」型題目能快速辨識並套用。
