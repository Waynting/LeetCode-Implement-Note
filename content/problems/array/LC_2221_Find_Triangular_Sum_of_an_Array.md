# 2221. Find Triangular Sum of an Array

## Problem Information
- **Problem ID**: 2221
- **Title**: Find Triangular Sum of an Array
- **Difficulty**: Medium
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/find-triangular-sum-of-an-array/
- **Topics**: Array, Simulation, Math, Combinatorics

## Problem Description

Given an integer array `nums` of length `n` containing digits `0..9`, repeatedly generate a new array by taking the sum of adjacent values modulo `10` until only one element remains. Return that last remaining value.

Formally, while the array has more than one element, replace it with an array of length `m-1` where `new[i] = (old[i] + old[i+1]) % 10`. The answer is the single value left after these reductions.

## Solutions

### Solution 1: Iterative Adjacent-Sum Simulation (User Implementation)
**Idea**: Simulate the triangular reduction level by level, always taking adjacent sums mod 10 until one element remains.

**Time Complexity**: O(n^2) in the worst case (n + (n-1) + ... + 1)
**Space Complexity**: O(n)

#### Code
```cpp
class Solution {
public:
    int triangularSum(vector<int>& nums) {
        if(nums.size() == 1){
            return nums[0];
        }

        vector<int> cal;
        for(int i=0;i<nums.size();i++){
            cal.push_back(nums[i]);
        }
        while(cal.size() != 1){
            vector<int> temp;
            for(int i=0;i < cal.size() - 1;i++){
                int ac = (cal[i]+cal[i+1] )%10;
                temp.push_back(ac);
            }

            cal.clear();
            for(int i=0;i < temp.size();i++){
                cal.push_back(temp[i]);
            }
        }
        return cal[0]%10 ;
    }
};
```

### Solution 2 (Optional): Combinatorial Shortcut (No full code)
**Key Fact**: The final answer equals
\[ \sum_{i=0}^{n-1} \binom{n-1}{i} \cdot nums[i] \pmod{10}. \]
This follows from Pascal’s rule expanding each level (like repeated convolution). One can compute this efficiently by precomputing binomial coefficients modulo 2 and 5 (Lucas theorem) and combining via the Chinese Remainder Theorem, or by building a single Pascal row mod 10 in O(n^2) time (still fine for typical constraints).

**Time Complexity**: O(n)–O(n^2) depending on method chosen
**Space Complexity**: O(n)

#### (Pseudocode Sketch)
```text
n = len(nums)
C = array of size n initialized as [1, 0, 0, ...]  # represents row of Pascal mod 10
for k in 1..n-1:                 # build row n-1 using in-place update (right-to-left)
    for i in k..1 step -1:
        C[i] = (C[i] + C[i-1]) mod 10
ans = sum( C[i] * nums[i] ) mod 10
return ans
```

## Personal Notes
- From implementation: “Nothing special; straightforward simulation works.”
- Minor micro-optimizations possible:
  - Use in-place updates on a single vector to avoid extra copies.
  - Early return when length becomes 1.
- The combinatorial identity is a neat alternative if you want a one-pass dot product with Pascal row mod 10.

