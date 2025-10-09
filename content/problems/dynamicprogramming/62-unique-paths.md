# 62. Unique Paths

## Problem Information
- **Problem ID**: 62  
- **Title**: Unique Paths  
- **Difficulty**: Medium  
- **Source**: LeetCode  
- **Link**: https://leetcode.com/problems/unique-paths/  
- **Topics**: Dynamic Programming, Combinatorics, Grid Traversal  

---

## Problem Description
A robot is located at the top-left corner of an `m x n` grid.  
The robot can only move **either down or right** at any point in time.  

The robot is trying to reach the **bottom-right corner** of the grid.  
How many possible unique paths are there?

---

## Solutions

### Solution 1: Dynamic Programming (Bottom-Up)
**Time Complexity**: O(m·n)  
**Space Complexity**: O(m·n)

#### Code
```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> ma(m, vector<int>(n, 1));

        for (int i = 1; i <= m - 1; ++i) {
            for (int j = 1; j <= n - 1; ++j) {
                ma[i][j] = ma[i][j - 1] + ma[i - 1][j];
            }
        }
        return ma[m - 1][n - 1];
    }
};
```

---

### Solution 2: Combinatorial Formula (Optimized Math)
**Idea**:  
The robot must move exactly `(m-1)` steps down and `(n-1)` steps right — total `m+n-2` moves.  
We can choose where the downs (or rights) go:  
C(m+n-2, m-1)

**Time Complexity**: O(min(m, n))  
**Space Complexity**: O(1)

*(In C++ implementation, careful with overflow — use `long long` or iterative combination formula.)*

---

## Personal Notes
- 一開始我是用數學公式：  
  unique paths = C(m+n-2, m-1)
  這是典型的「相同物排列」組合問題。  
- 不過若直接用 factorial 會 **stack overflow 或 overflow**，特別是 m, n 較大時。  
- 改成使用 DP 的「加法路徑」思路後，發現其實跟高中排列組合的推導一樣，  
  只是用程式把每格的路徑數逐步加總：  
  f[i][j] = f[i-1][j] + f[i][j-1]
- 這題很適合入門動態規劃的表格思維，也能幫助理解組合數的遞推關係。
