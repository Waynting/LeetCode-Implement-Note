---
title: Dynamic Programming Introduction
category: algorithm
difficulty: intermediate
topics: DynamicProgramming, Optimization
description: Comprehensive introduction to dynamic programming concepts and patterns
---

# Dynamic Programming Introduction

## Core Concept (What & Why)

**Intuitive Explanation**: Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems and storing their results to avoid redundant calculations.

**Problem Types Solved**:
- Optimization problems (minimum/maximum)
- Counting problems
- Decision problems
- Sequence problems
- Game theory problems

**Applicable Conditions**:
1. **Overlapping Subproblems**: Same subproblems are solved multiple times
2. **Optimal Substructure**: Optimal solution contains optimal solutions of subproblems

**Time / Space Complexity Target**: Often O(n²) or O(n×m) / O(n) or O(n×m)

## Common Solution Patterns

### Pattern A: Top-Down (Memoization)
**When to use**: When recursive solution is intuitive but inefficient

**Thought Process**:
1. Write recursive solution
2. Identify overlapping subproblems
3. Add memoization to cache results
4. Return cached result if available

**Complexity**: Depends on number of unique subproblems

### Pattern B: Bottom-Up (Tabulation)
**When to use**: When you can identify the optimal order to solve subproblems

**Thought Process**:
1. Define DP table/array
2. Initialize base cases
3. Fill table in optimal order
4. Use recurrence relation
5. Return final result

**Complexity**: Usually more space-efficient than memoization

## The 5-Step DP Process

### 1. Define State
What does `dp[i]` or `dp[i][j]` represent?

### 2. State Transition Equation
How to compute current state from previous states?

### 3. Base Cases
What are the initial values?

### 4. Computation Order
In what order should we fill the DP table?

### 5. Return Result
What is the final answer?

## Syntax Cheat-Sheet by Language

### JavaScript
```javascript
// Top-Down (Memoization)
function dpMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n; // base case
    
    memo[n] = dpMemo(n-1, memo) + dpMemo(n-2, memo);
    return memo[n];
}

// Bottom-Up (Tabulation)
function dpBottomUp(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

// Space Optimized
function dpOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}
```

### C++
```cpp
#include <vector>
#include <unordered_map>

// Top-Down
int dpMemo(int n, unordered_map<int, int>& memo) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = dpMemo(n-1, memo) + dpMemo(n-2, memo);
    return memo[n];
}

// Bottom-Up
int dpBottomUp(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}
```

## Minimal Working Example: Fibonacci

**Problem**: Find the nth Fibonacci number

**Steps**:
1. **State**: `dp[i]` = ith Fibonacci number
2. **Transition**: `dp[i] = dp[i-1] + dp[i-2]`
3. **Base cases**: `dp[0] = 0, dp[1] = 1`
4. **Order**: i from 2 to n
5. **Result**: `dp[n]`

**Trace for n=5**:
```
dp[0] = 0
dp[1] = 1
dp[2] = dp[1] + dp[0] = 1 + 0 = 1
dp[3] = dp[2] + dp[1] = 1 + 1 = 2
dp[4] = dp[3] + dp[2] = 2 + 1 = 3
dp[5] = dp[4] + dp[3] = 3 + 2 = 5
```

## Common DP Patterns

### 1. Linear DP
- **Examples**: House Robber, Climbing Stairs
- **State**: `dp[i]` represents optimal solution for first i elements
- **Transition**: `dp[i]` depends on `dp[i-1]`, `dp[i-2]`, etc.

### 2. 2D DP
- **Examples**: Unique Paths, Edit Distance
- **State**: `dp[i][j]` represents solution for subproblem (i,j)
- **Transition**: `dp[i][j]` depends on `dp[i-1][j]`, `dp[i][j-1]`, etc.

### 3. Interval DP
- **Examples**: Matrix Chain Multiplication
- **State**: `dp[i][j]` represents optimal solution for interval [i,j]
- **Transition**: Try all possible split points k

## Edge Cases & Tests
```
Case1: n = 0 => handle base case
Case2: n = 1 => handle base case
Case3: Small values => verify by hand
Case4: Large values => check for overflow
Case5: Negative inputs => define behavior
```

## Common Problems by Category

### Beginner
- [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
- [198. House Robber](https://leetcode.com/problems/house-robber/)
- [746. Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/)

### Intermediate
- [322. Coin Change](https://leetcode.com/problems/coin-change/)
- [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
- [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)

### Advanced
- [72. Edit Distance](https://leetcode.com/problems/edit-distance/)
- [312. Burst Balloons](https://leetcode.com/problems/burst-balloons/)
- [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)

## Personal Notes
- **Start with recursive solution**: Often easier to understand the problem structure
- **Identify subproblems**: Look for repeated calculations
- **Choose approach**: Top-down if recursion is natural, bottom-up for better space efficiency
- **Optimize space**: Often can reduce from O(n²) to O(n) or O(1)