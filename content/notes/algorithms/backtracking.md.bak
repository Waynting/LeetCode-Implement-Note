---
title: Backtracking
description: Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it backs up and tries another path.
topics: Backtracking, DFS, Recursion
difficulty: intermediate
createdAt: 2025-10-03
updatedAt: 2025-10-03
---

# Backtracking

## 概述
Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it "backs up" (undoes the last decision) and tries another path.

## 1. Core Concept (What & Why)
- **Intuitive Explanation**: Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it "backs up" (undoes the last decision) and tries another path.
- **Problem Types Solved**: subsets, permutations, combinations, partition problems, N-Queens, Sudoku, word search, constraint satisfaction.
- **Applicable Conditions / Signals**: when we need **all solutions** (not just one), especially with branching decisions (choose / not choose, place / not place).
- **Time / Space Complexity Target**: Usually O(k * number_of_solutions) / O(n) recursion depth.
- **Common Data Structures**: recursion stack, vector/path to store current solution.

---

## 2. Invariants & Properties
- **Core Invariants**:
  - Each recursive call represents a decision state.
  - Path (partial solution) must always be valid.
- **How to Maintain**:
  - Add element → recurse → remove element (restore state).
- **Common Pitfalls**:
  - Forgetting to backtrack (pop/remove), leading to wrong results.
  - Not handling duplicates → repeated solutions.
  - Incorrect base case → missing or extra solutions.

---

## 3. Common Solution Patterns
- **Pattern A: Subsets (pick or not pick each element)**
  - Thought Process: for each element, either include or skip → recurse deeper.
  - Complexity: O(2^n).
- **Pattern B: Combinations / Permutations**
  - Thought Process: build partial sequence until size reached, avoid reuse if needed.
  - Complexity: O(n!) for permutations, O(C(n, k)) for combinations.

---

## 4. Pseudocode (Language-Agnostic Skeleton)
```text
function dfs(index, path):
    record(path)  # if problem requires
    for i in range(index, n):
        if i > index and nums[i] == nums[i-1]: continue  # skip duplicates
        path.push(nums[i])
        dfs(i+1, path)
        path.pop()  # backtrack
```

---

## 5. Syntax Cheat‑Sheet by Language

### C++
```cpp
vector<vector<int>> ans;
vector<int> path;

void dfs(int start, vector<int>& nums) {
    ans.push_back(path); // record current subset

    for (int i = start; i < nums.size(); i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // skip duplicates
        path.push_back(nums[i]);
        dfs(i + 1, nums);
        path.pop_back(); // backtrack
    }
}
```

---

## 6. Minimal Working Example (MWE)
- **Input**: nums = [1,2,2]
- **Manual Steps**:
  - [] → [1] → [1,2] → [1,2,2]
  - Backtrack → [1,2] → backtrack → [1]
  - Skip duplicate → [2], [2,2], []
- **Output**: [[], [1], [1,2], [1,2,2], [2], [2,2]]
- **Correctness**: every path corresponds to one subset, duplicates avoided.

---

## 7. Edge Cases & Tests
```
Case1: nums = [] → [[]]
Case2: nums = [1] → [[], [1]]
Case3: nums = [1,1] → [[], [1], [1,1]]
Case4: nums = [1,2,2] → [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 8. Relation to Neighboring Concepts
- Similar to DFS but applied on *choice trees* instead of graph traversal.
- Can be combined with pruning (剪枝) to reduce search space.
- Related to recursion, divide & conquer, and brute force.

---

## 9. Implementation Skeleton (Practice)
```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> ans;
        vector<int> path;
        dfs(0, nums, path, ans);
        return ans;
    }

private:
    void dfs(int start, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {
        // TODO: record current path
        for (int i = start; i < nums.size(); i++) {
            // TODO: skip duplicates at same depth
            path.push_back(nums[i]);
            dfs(i+1, nums, path, ans);
            path.pop_back();
        }
    }
};
```

---

## 10. Common Problems
- LeetCode:
  - [ ] 78. Subsets
  - [ ] 90. Subsets II
  - [ ] 46. Permutations
  - [ ] 77. Combinations
  - [ ] 51. N-Queens
- Other: classic Sudoku solver

---

## 11. Practice Plan
- Day 0: implement subsets / subsets II
- Day 2: do permutations, combinations
- Day 7: N-Queens, Sudoku
- Day 21: review + apply in constraint satisfaction problems

---

## 12. Personal Notes
- Remember: "add → recurse → remove" is the mantra.
- Always sort first when duplicates may appear.
- Draw decision tree to visualize recursion flow.

---

## 13. References
- CLRS, Backtracking chapter
- LeetCode discussions (Subsets / Permutations / N-Queens)
- CP-Algorithms: Backtracking basics
