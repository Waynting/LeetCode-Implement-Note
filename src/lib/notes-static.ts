// 自動生成的筆記數據文件 - 請勿手動編輯
export interface Note {
  id: string;
  title: string;
  category: 'dataStructure' | 'algorithm' | 'technique' | 'concept';
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  contentPath: string;
  createdAt: string;
  updatedAt: string;
  markdownContent?: string;
}

export const NOTE_CATEGORIES = {
  dataStructure: 'Data Structures',
  algorithm: 'Algorithms',
  technique: 'Problem-Solving Techniques',
  concept: 'Core Concepts'
} as const;

export const NOTES: Note[] = [
  {
    "id": "backtracking",
    "title": "Backtracking",
    "category": "algorithm",
    "topics": [
      "Backtracking",
      "DFS",
      "Recursion"
    ],
    "difficulty": "intermediate",
    "description": "Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it backs up and tries another path.",
    "contentPath": "/content/notes/algorithms/backtracking.md",
    "createdAt": "2025-10-03",
    "updatedAt": "2025-10-03",
    "markdownContent": "# Backtracking\n\n## 概述\nBacktracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it \"backs up\" (undoes the last decision) and tries another path.\n\n## 1. Core Concept (What & Why)\n- **Intuitive Explanation**: Backtracking explores all possible choices step by step, forming a decision tree. If a choice leads to a dead end, it \"backs up\" (undoes the last decision) and tries another path.\n- **Problem Types Solved**: subsets, permutations, combinations, partition problems, N-Queens, Sudoku, word search, constraint satisfaction.\n- **Applicable Conditions / Signals**: when we need **all solutions** (not just one), especially with branching decisions (choose / not choose, place / not place).\n- **Time / Space Complexity Target**: Usually O(k * number_of_solutions) / O(n) recursion depth.\n- **Common Data Structures**: recursion stack, vector/path to store current solution.\n\n---\n\n## 2. Invariants & Properties\n- **Core Invariants**:\n  - Each recursive call represents a decision state.\n  - Path (partial solution) must always be valid.\n- **How to Maintain**:\n  - Add element → recurse → remove element (restore state).\n- **Common Pitfalls**:\n  - Forgetting to backtrack (pop/remove), leading to wrong results.\n  - Not handling duplicates → repeated solutions.\n  - Incorrect base case → missing or extra solutions.\n\n---\n\n## 3. Common Solution Patterns\n- **Pattern A: Subsets (pick or not pick each element)**\n  - Thought Process: for each element, either include or skip → recurse deeper.\n  - Complexity: O(2^n).\n- **Pattern B: Combinations / Permutations**\n  - Thought Process: build partial sequence until size reached, avoid reuse if needed.\n  - Complexity: O(n!) for permutations, O(C(n, k)) for combinations.\n\n---\n\n## 4. Pseudocode (Language-Agnostic Skeleton)\n```text\nfunction dfs(index, path):\n    record(path)  # if problem requires\n    for i in range(index, n):\n        if i > index and nums[i] == nums[i-1]: continue  # skip duplicates\n        path.push(nums[i])\n        dfs(i+1, path)\n        path.pop()  # backtrack\n```\n\n---\n\n## 5. Syntax Cheat‑Sheet by Language\n\n### C++\n```cpp\nvector<vector<int>> ans;\nvector<int> path;\n\nvoid dfs(int start, vector<int>& nums) {\n    ans.push_back(path); // record current subset\n\n    for (int i = start; i < nums.size(); i++) {\n        if (i > start && nums[i] == nums[i-1]) continue; // skip duplicates\n        path.push_back(nums[i]);\n        dfs(i + 1, nums);\n        path.pop_back(); // backtrack\n    }\n}\n```\n\n---\n\n## 6. Minimal Working Example (MWE)\n- **Input**: nums = [1,2,2]\n- **Manual Steps**:\n  - [] → [1] → [1,2] → [1,2,2]\n  - Backtrack → [1,2] → backtrack → [1]\n  - Skip duplicate → [2], [2,2], []\n- **Output**: [[], [1], [1,2], [1,2,2], [2], [2,2]]\n- **Correctness**: every path corresponds to one subset, duplicates avoided.\n\n---\n\n## 7. Edge Cases & Tests\n```\nCase1: nums = [] → [[]]\nCase2: nums = [1] → [[], [1]]\nCase3: nums = [1,1] → [[], [1], [1,1]]\nCase4: nums = [1,2,2] → [[], [1], [1,2], [1,2,2], [2], [2,2]]\n```\n\n---\n\n## 8. Relation to Neighboring Concepts\n- Similar to DFS but applied on *choice trees* instead of graph traversal.\n- Can be combined with pruning (剪枝) to reduce search space.\n- Related to recursion, divide & conquer, and brute force.\n\n---\n\n## 9. Implementation Skeleton (Practice)\n```cpp\nclass Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> ans;\n        vector<int> path;\n        dfs(0, nums, path, ans);\n        return ans;\n    }\n\nprivate:\n    void dfs(int start, vector<int>& nums, vector<int>& path, vector<vector<int>>& ans) {\n        // TODO: record current path\n        for (int i = start; i < nums.size(); i++) {\n            // TODO: skip duplicates at same depth\n            path.push_back(nums[i]);\n            dfs(i+1, nums, path, ans);\n            path.pop_back();\n        }\n    }\n};\n```\n\n---\n\n## 10. Common Problems\n- LeetCode:\n  - [ ] 78. Subsets\n  - [ ] 90. Subsets II\n  - [ ] 46. Permutations\n  - [ ] 77. Combinations\n  - [ ] 51. N-Queens\n- Other: classic Sudoku solver\n\n---\n\n## 11. Practice Plan\n- Day 0: implement subsets / subsets II\n- Day 2: do permutations, combinations\n- Day 7: N-Queens, Sudoku\n- Day 21: review + apply in constraint satisfaction problems\n\n---\n\n## 12. Personal Notes\n- Remember: \"add → recurse → remove\" is the mantra.\n- Always sort first when duplicates may appear.\n- Draw decision tree to visualize recursion flow.\n\n---\n\n## 13. References\n- CLRS, Backtracking chapter\n- LeetCode discussions (Subsets / Permutations / N-Queens)\n- CP-Algorithms: Backtracking basics\n"
  }
];

export function getNotesByCategory(category: keyof typeof NOTE_CATEGORIES): Note[] {
  return NOTES.filter(note => note.category === category);
}

export function getNotesByTopic(topic: string): Note[] {
  return NOTES.filter(note => 
    note.topics.some(t => t.toLowerCase() === topic.toLowerCase())
  );
}

export function getNoteById(id: string): Note | undefined {
  return NOTES.find(note => note.id === id);
}
