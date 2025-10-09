# 2138. Divide a String Into Groups of Size k

## Problem Information
- **Problem ID**: 2138
- **Title**: Divide a String Into Groups of Size k
- **Difficulty**: Easy
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/divide-a-string-into-groups-of-size-k/
- **Topics**: String, Simulation

---

## Problem Description (brief)
Given a string `s`, an integer `k`, and a character `fill`, split `s` into groups of size `k`. If the last group is shorter than `k`, pad it with `fill` characters until its length becomes `k`. Return the groups as a vector of strings (order preserved).

---

## Solutions

### Method A — Incremental Build (your original approach)
**Idea**: Traverse characters, accumulate into a temporary buffer. Every time the buffer reaches length `k`, push it and clear. After the loop, if the buffer is non-empty, pad it with `fill` up to `k` and push.

**Time Complexity**: O(n)  
**Space Complexity**: O(n) for the answer (extra O(k) temp buffer)

#### Code
```cpp
class Solution {
public:
    vector<string> divideString(string s, int k, char fill) {
        vector<string> ans;
        string tem;
        tem.reserve(k);
        for (int i = 0; i < (int)s.size(); ++i) {
            tem += s[i];
            if ((int)tem.size() == k) {
                ans.push_back(tem);
                tem.clear();
            }
        }
        if (!tem.empty()) {
            tem.append(k - tem.size(), fill);
            ans.push_back(tem);
        }
        return ans;
    }
};
```

---

### Method B — Pad First, Then Slice (refactor)
**Idea**: If `|s|` is not a multiple of `k`, append `fill` just once so that its length becomes a multiple of `k`. Then cut `s` into non-overlapping substrings of length `k`. No trailing-buffer logic needed.

**Time Complexity**: O(n)  
**Space Complexity**: O(n) for the answer (no extra temp buffer)

#### Code
```cpp
class Solution {
public:
    vector<string> divideString(string s, int k, char fill) {
        if (s.size() % k) s.append(k - s.size() % k, fill); // pad once
        vector<string> ans;
        ans.reserve(s.size() / k);
        for (size_t i = 0; i < s.size(); i += k)
            ans.emplace_back(s, i, k); // construct substring in place
        return ans;
    }
};
```

---

## Syntax Spotlight — `if (s.size() % k) s.append(k - s.size() % k, fill);`

### 1) Condition: `s.size() % k`
- `a % b` is the remainder of dividing `a` by `b`.
- In C++, any non-zero integer in an `if` condition is treated as **true**.
- So `if (s.size() % k)` means **“if the length of `s` is NOT divisible by `k`”**.

Example:  
- `s.size() = 11`, `k = 3` → `11 % 3 = 2` (non-zero) → condition is true.  
- `s.size() = 12`, `k = 3` → `12 % 3 = 0` (zero) → condition is false.

### 2) Padding amount: `k - s.size() % k`
- When the condition is true, the remainder `r = s.size() % k` tells you how many characters are **missing** to reach the next multiple of `k`.  
- Missing count = `k - r`.

Continuing the example:  
- `|s| = 11`, `k = 3` → `r = 2` → missing `3 - 2 = 1` character.

### 3) The `append` overload: `string::append(size_type count, char ch)`
- This standard overload appends `count` copies of the character `ch` to the end of the string.  
- Here: `s.append(k - s.size() % k, fill);` appends exactly the **missing** number of `fill` characters.

### 4) Why this works
- After padding, `s.size()` becomes a multiple of `k`.  
- Then we can safely take chunks `[0..k-1]`, `[k..2k-1]`, … without worrying about leftovers.

### 5) Tiny dry-run
- `s = "abcdefg"`, `k = 3`, `fill = 'x'`  
  - `|s| = 7`, `7 % 3 = 1` → need `3 - 1 = 2` fills.  
  - After append: `"abcdefgxx"` (length 9).  
  - Slices: `"abc"`, `"def"`, `"gxx"`.

---

## Personal Notes
- 方法 A（逐步裝箱）可讀性好，容易上手。  
- 方法 B（先補再切）在程式碼上更**精簡**且易於最佳化（一次 padding + 規律切片）。
- 小陷阱：注意 `size_t` 與 `int` 混用、`substr` 可能產生拷貝；可用 `emplace_back(s, i, k)` 直接在 vector 中就地建構子字串。
