# 3. Longest Substring Without Repeating Characters

## Problem Information
- **Problem ID**: 3  
- **Title**: Longest Substring Without Repeating Characters  
- **Difficulty**: Medium  
- **Source**: LeetCode  
- **Link**: https://leetcode.com/problems/longest-substring-without-repeating-characters/  
- **Topics**: Sliding Window, Hash Set, Two Pointers  

---

## Problem Description
Given a string `s`, find the length of the **longest substring without repeating characters**.

A substring is a contiguous non-empty sequence of characters within a string.

---

### Example 1
**Input:**  
`s = "abcabcbb"`  
**Output:** `3`  
**Explanation:** The answer is `"abc"`, with the length of 3.

### Example 2
**Input:**  
`s = "bbbbb"`  
**Output:** `1`  
**Explanation:** The answer is `"b"`.

### Example 3
**Input:**  
`s = "pwwkew"`  
**Output:** `3`  
**Explanation:** The answer is `"wke"`. Notice that `"pwke"` is a subsequence, not a substring.

---

## Solution 1: Brute Force (O(n²))

### Code
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int ans = 0;
        for (int i = 0; i < s.length(); ++i) {
            set<char> t;
            int de = i;
            while (de < s.length() && t.find(s[de]) == t.end()) {
                t.insert(s[de]);
                de++;
            }
            if ((int)t.size() > ans) {
                ans = t.size();
            }
        }
        return ans;
    }
};
```

### Explanation
- 固定起點 `i`，用一個 `set<char>` 記錄目前子字串內出現過的字元。
- 內層指標 `de` 從 `i` 向右擴展，直到遇到重複字元為止。
- 每次更新最長長度 `ans = max(ans, t.size())`。

### Complexity
- **Time**: O(n²)  
- **Space**: O(n)

---

## Solution 2: Sliding Window (Optimized O(n))

### Idea
這題其實是 **Sliding Window**（滑動視窗）的基本範例：  
保持一個不含重複字元的「動態視窗」，使用雙指標 `l` 與 `r`：

1. `r` 向右擴展，加入新字元。
2. 若發現重複字元，移動左邊界 `l`，直到視窗內無重複。
3. 持續更新最大長度。

### Implementation
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_set<char> window;
        int l = 0, ans = 0;

        for (int r = 0; r < s.size(); ++r) {
            while (window.count(s[r])) {
                window.erase(s[l++]); // 移除左側重複字元
            }
            window.insert(s[r]);
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
```

### Complexity
- **Time**: O(n)  
- **Space**: O(Σ)，其中 Σ 是字元集大小（最壞情況為 O(256)）。

---

## Personal Notes

- 🧠 **這題其實就是 Sliding Window 的基本題**。  
  暴力法是兩層迴圈試所有子字串，滑動視窗法則是用「一進一出」維持無重複區間。  

- ⚙️ 思路轉換：  
  - 暴力法：每次重新檢查一段子字串。  
  - 滑動窗：持續移動視窗邊界，不重複掃過同一元素。  

- ✅ 學到的重點：  
  - `set` 用來檢查重複。  
  - `unordered_set` 搭配 while 移除左邊重複，效率更高。  
  - `r - l + 1` 是目前視窗長度。

---

## Summary Table

| 方法 | 思想 | 複雜度 | 備註 |
|------|------|---------|------|
| 暴力法 | 固定起點枚舉子字串 | O(n²) | 容易理解，效率低 |
| 滑動視窗 | 雙指標維持無重複區間 | O(n) | 最佳實作方式 |

---

### Takeaway
> 「Longest Substring Without Repeating Characters」是一題典型的滑動視窗模板，  
> 也是理解雙指標與 hash set 應用的經典入門題。
