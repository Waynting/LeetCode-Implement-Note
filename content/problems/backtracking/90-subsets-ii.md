# 90. Subsets II

## Problem Information
- **Problem ID**: 90
- **Title**: Subsets II
- **Difficulty**: Medium
- **Source**: Leetcode
- **Link**: https://leetcode.com/problems/subsets-ii/
- **Topics**: Backtracking, Array, Sorting

## Problem Description
Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

**Example:**
```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

## Solutions

### Solution 1: Backtracking with Duplicate Skipping
**Time Complexity**: O(n * 2^n) — generate all subsets with pruning for duplicates  
**Space Complexity**: O(n) recursion depth + output

#### Code
```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());        // 1) Sort to group duplicates
        vector<vector<int>> ans;
        vector<int> path;
        dfs(0, nums, path, ans);
        return ans;
    }

private:
    void dfs(int start, const vector<int>& nums,
             vector<int>& path, vector<vector<int>>& ans) {

        // record current path as a subset
        ans.push_back(path);

        for (int i = start; i < (int)nums.size(); ++i) {
            // skip duplicates on the same depth
            if (i > start && nums[i] == nums[i-1]) continue;

            path.push_back(nums[i]);
            dfs(i + 1, nums, path, ans);
            path.pop_back(); // backtrack
        }
    }
};
```

---

## Personal Notes
- 我的思路：先排序，確保重複元素相鄰。
- 遞迴 (DFS) 每一層代表「決定要不要選某個元素」。
- **關鍵技巧**：`if (i > start && nums[i] == nums[i-1]) continue;` 這行保證同一層不會重複選一樣的數字。
- 這題幫助我理解了 backtracking 的「決策樹」概念：每條路徑都是一個子集，回退 (pop_back) 是為了恢復狀態。

Mistakes I almost made:
- 忘記在每層一開始就 `ans.push_back(path)` → 會漏掉空集和中間子集。
- 忘記 pop_back → 路徑污染，結果錯誤。
