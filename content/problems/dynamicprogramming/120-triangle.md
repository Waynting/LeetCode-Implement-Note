# 120. Triangle

## Problem Information
- **Problem ID**: 120
- **Title**: Triangle
- **Difficulty**: Medium
- **Source**: Leetcode
- **Link**: https://leetcode.com/problems/triangle/
- **Topics**: Dynamic Programming, Array

## Problem Description
Given a triangle array, return the minimum path sum from top to bottom.

At each step, you may move to an adjacent number of the row below.  
More formally, if you are on index `j` on the current row, you may move to index `j` or `j+1` on the next row.

**Example:**
```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The minimum path is 2 -> 3 -> 5 -> 1 = 11.
```

## Solutions

### Solution 1: Bottom-Up Dynamic Programming
**Time Complexity**: O(n^2) — where n is the number of rows.  
**Space Complexity**: O(1) extra space (reusing the triangle).

#### Code
```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        for (int i = triangle.size()-2; i >= 0; --i) {
            for (int j = 0; j <= i; ++j) {
                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1]);
            }
        }
        return triangle[0][0];
    }
};
```

---

## Personal Notes
- 一開始單純的想說用 greedy 從上往下找最小值就好，  
  但其實這樣會錯，因為局部最小 ≠ 全局最小。  
- 正確解法應該要 **從底部開始加總**，每一層更新為「自己 + 下一層相鄰兩個的最小值」，最後頂端就會是答案。  
- 這題讓我理解了「自底向上的 DP」比「局部貪心」更可靠。  
