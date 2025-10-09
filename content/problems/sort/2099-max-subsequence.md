# 2099. Find Subsequence of Length K With the Largest Sum

## Problem Information
- **Problem ID**: 2099
- **Title**: Find Subsequence of Length K With the Largest Sum
- **Difficulty**: Easy
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/
- **Topics**: Sorting, Heap (Priority Queue)

---

## Problem Description
You are given an integer array `nums` and an integer `k`.  
You want to find a **subsequence** of `nums` of length `k` that has the **largest sum**.

Return any such subsequence as an integer array of length `k`.

A subsequence is an array that can be derived from another array by deleting some or no elements **without changing the order** of the remaining elements.

---

## Example

### Input
```
nums = [2,1,3,3], k = 2
```

### Output
```
[3,3]
```

### Explanation
The subsequence has the largest sum of 3 + 3 = 6.

---

## Incorrect Approach (Buggy)
```cpp
priority_queue<int,int> l;
for(int i = 0;i < nums.size();i++){
    l.push(nums[i],i);
}

vector<int> ans;
for(int i = 0;i<k;i++){
    int t = l.top(); l.pop();
    ans.push_back(t);
}
return ans;
```
### ❌ Problems
1. `priority_queue<int,int>` is not valid C++ syntax — it only accepts one template type.  
   → You must use `priority_queue<pair<int,int>>` to store both value and index.
2. You lose the **original order** — output is not necessarily a subsequence.
3. Popping directly from the heap yields elements sorted by value, not by original index.

---

## Correct Approach (Sorting)

### Idea
1. Pair each number with its index: `(value, index)`.
2. Sort by value descending, take top `k` elements.
3. Sort those `k` elements again by index ascending to restore subsequence order.
4. Extract the values.

### Complexity
- **Time**: O(n log n)
- **Space**: O(n)

### Implementation
```cpp
class Solution {
public:
    vector<int> maxSubsequence(vector<int>& nums, int k) {
        vector<pair<int,int>> a; // {value, idx}
        a.reserve(nums.size());
        for (int i = 0; i < (int)nums.size(); ++i) a.push_back({nums[i], i});

        // 依 value 由大到小
        sort(a.begin(), a.end(), [](const auto& p1, const auto& p2){
            if (p1.first != p2.first) return p1.first > p2.first;
            return p1.second < p2.second; // tie-break：較小 index 優先
        });

        a.resize(k); // 取前 k 個

        // 還原子序列順序：依 index 由小到大
        sort(a.begin(), a.end(), [](const auto& p1, const auto& p2){
            return p1.second < p2.second;
        });

        vector<int> ans;
        ans.reserve(k);
        for (auto &p : a) ans.push_back(p.first);
        return ans;
    }
};
```

---

## Personal Notes

- **錯誤關鍵**：
  - 以為 `priority_queue<int,int>` 可以直接存索引。
  - 忘記子序列需保留原順序，結果輸出順序錯亂。

- **正確思路**：
  - 同時存 `(value, index)`。
  - 按 value 降序取前 k，再依 index 升序還原順序。

- **學到的概念**：
  - `priority_queue` 的 template 用法：`priority_queue<T, Container, Compare>`。
  - Lambda sort 的語法：`[](const auto& a, const auto& b){ ... }`。

---

## Summary

| 步驟 | 操作 | 說明 |
|------|------|------|
| 1 | 建立 pair 陣列 | 保存 value + index |
| 2 | 依 value 由大排小 | 找出前 k 大元素 |
| 3 | 取前 k 並依 index 由小排大 | 還原子序列順序 |
| 4 | 輸出 value | 得到答案 |

---

✅ **Key takeaway**: When dealing with “largest k elements that must preserve original order,”  
you almost always need to **keep both value and index** and **sort twice**.
