# 2300. Successful Pairs of Spells and Potions

## Problem Information
- **Problem ID**: 2300
- **Title**: Successful Pairs of Spells and Potions
- **Difficulty**: Medium
- **Source**: LeetCode Daily Question (2025-10-08)
- **Link**: https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
- **Topics**: Binary Search, Sorting, Two Pointers

---

## Problem Description

You are given two positive integer arrays `spells` and `potions` of lengths `n` and `m` respectively, 
where `spells[i]` represents the strength of the `i`‑th spell and `potions[j]` represents the strength of the `j`‑th potion.

You are also given an integer `success`.

A spell and potion pair is considered **successful** if the product of their strengths is **at least success**.

Return an integer array `pairs` of length `n` where `pairs[i]` is the **number of potions that will form a successful pair** with the `i`‑th spell.

---

## Solutions

### Solution 1: Binary Search + Sorting
**Idea**:  
For each spell, we need to find the smallest potion that makes  
`spell * potion >= success`.  
Let that potion’s value be `threshold = ceil(success / spell)`.

Because potions are sorted, we can binary‑search the **first position** in `potions` that is `>= threshold`, 
and count how many potions are from that position to the end.

**Time Complexity**: O((n + m) log m)  
**Space Complexity**: O(1)

#### Correct Implementation
```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        vector<int> ans;
        sort(potions.begin(), potions.end());

        for (int i = 0; i < (int)spells.size(); ++i) {
            // 使用 long long 避免 overflow
            long long w = ((long long)success + spells[i] - 1) / spells[i];

            int a = bs(potions, w);  // ✅ 改成接收 long long threshold

            if (a == (int)potions.size()) {
                ans.push_back(0);
            } else {
                ans.push_back((int)potions.size() - a);
            }
        }

        return ans;
    }

private:
    // ✅ 將 threshold 型別改為 long long，並在比較時升型
    int bs(const vector<int>& potions, long long n) {
        int l = 0, r = (int)potions.size() - 1;

        while (l < r) {
            int mid = (l + r) / 2;

            if ((long long)potions[mid] >= n)
                r = mid;      // mid 可能是答案，收縮右界
            else
                l = mid + 1;  // mid 太小，往右找
        }

        // 跑完時 l == r，檢查是否符合條件
        if (l < (int)potions.size() && (long long)potions[l] >= n)
            return l;
        else
            return (int)potions.size(); // 找不到任何 >= threshold 的元素
    }
};
```

---

### Solution 2: Naïve Brute Force (for understanding only)
**Time Complexity**: O(n × m) — too slow for large inputs.

```cpp
/*
vector<int> ans;
sort(potions.begin(),potions.end());
for(int i = 0;i < spells.size(); ++i){
    for(int j = 0 ; j < potions.size(); ++ j){
        if((long long)potions[j] * spells[i] >= success){
            ans.push_back(potions.size()-j);
            break;
        }
        if(j == potions.size()-1){
            ans.push_back(0);
        }
    }
}
return ans;
*/
```

---

## Personal Notes

- ✅ **核心邏輯自己想出來**：先找到這個 `spell` 下的最小 `potion` 值（`threshold = ceil(success / spell)`），
  然後在排序後的陣列中找到第一個 `>= threshold` 的位置，用總長減去索引就是成功的數量。

- ⚠️ 被 `long long` 搞到錯誤：`success` 可高達 `1e10`，用 `int` 會溢位。  
  解法是把 `success`、`threshold`、以及比較都改用 `long long`。

- 🚀 與暴力解相比：原本的 O(n×m) 雙迴圈太慢，改成 **排序 + 二分搜尋**，
  每次搜尋 O(log m)，總複雜度 O((n + m) log m)。

- 🔍 關鍵思維：
  - sort potions once.
  - for each spell → compute smallest needed potion → binary search that index → count from there to end.

---

## Example

### Input
```
spells = [5,1,3]
potions = [1,2,3,4,5]
success = 7
```

### Output
```
[4,0,3]
```

### Explanation
- spell=5 → threshold=2 → valid potions = [2,3,4,5] → 4
- spell=1 → threshold=7 → none → 0
- spell=3 → threshold=3 → valid potions = [3,4,5] → 3

---

## Takeaway
- **Pattern:** Binary Search for "first element ≥ target" (Lower Bound)
- **Formula:** `ceil(success / spell)` → `(success + spell - 1) / spell`
- **Trick:** Watch for overflow → use `long long`
- **Complexity:** O((n + m) log m)
