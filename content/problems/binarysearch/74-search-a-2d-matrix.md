# 74. Search a 2D Matrix

## Problem Information
- **Problem ID**: 74  
- **Title**: Search a 2D Matrix  
- **Difficulty**: Medium  
- **Source**: LeetCode  
- **Link**: [https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=plakya4j](https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=plakya4j)
- **Topics**: Binary Search, Matrix

## Problem Description
You are given an `m x n` integer matrix with the following properties:
1. Each row is sorted in non-decreasing order.  
2. The first integer of each row is greater than the last integer of the previous row.  

Given an integer `target`, return `true` if `target` is in matrix or `false` otherwise.

You must write a solution in **O(log(m * n))** time complexity.

---

## Solutions

### Solution 1: Binary Search on Flattened Matrix
**Idea**:  
Because the matrix is globally sorted (each row continues from the previous one),  
we can treat the entire matrix as a **flattened sorted array** of size `m * n`.  
Perform a single binary search, and map the 1D index back to 2D coordinates.

- **Index → Coordinates Mapping**:  
  ```
  row = mid / n
  col = mid % n
  ```
  This works because row changes every n elements, while col cycles from 0 to n−1.

**Time Complexity**: O(log(m * n))  
**Space Complexity**: O(1)

#### Code
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int left = 0, right = m * n - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            int val = matrix[mid / n][mid % n]; // Map 1D index → 2D position

            if (val == target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};
```

---

## Personal Notes
- 關鍵觀念：  
  這個矩陣等價於一個**完全展開的嚴格遞增一維陣列**，  
  因此可以直接在整體上進行二分搜尋，不需要先找哪一行。  
- 核心轉換：  
  - 行（row）＝ `mid / n`  
  - 列（col）＝ `mid % n`  
- 若改用「逐行判斷再二分」，會變成 O(m + log n)，**不符合 O(log(m*n)) 要求**。  
- 小技巧：對矩陣進行「概念性展開」思考時，能快速判斷哪些題目能用 binary search。
