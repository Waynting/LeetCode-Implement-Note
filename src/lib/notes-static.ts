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
  },
  {
    "id": "prefix-suffix-precompute",
    "title": "Prefix / Suffix 預處理技巧",
    "category": "technique",
    "topics": [],
    "difficulty": "intermediate",
    "description": "暫無描述",
    "contentPath": "/content/notes/techniques/prefix-suffix-precompute.md",
    "createdAt": "2024-01-01",
    "updatedAt": "2025-10-05",
    "markdownContent": "# Prefix / Suffix 預處理技巧\n\n## 核心概念\n\n**用 O(n) 時間預處理一次，之後可以用 O(1) 時間回答很多查詢。**\n\n簡單來說：\n- **Prefix（前綴）**: 儲存從開頭到某個位置的累積資訊（如總和、最小值、最大值）\n- **Suffix（後綴）**: 儲存從某個位置到結尾的累積資訊\n\n透過組合前綴和後綴，可以快速檢查區間、分割點、可行性等條件。\n\n## 什麼時候用？\n\n- 需要多次查詢區間和、區間最小/最大值\n- 需要檢查每個分割點的可行性（例如：左邊嚴格遞增 且 右邊嚴格遞減）\n- 想把原本每次 O(n) 的查詢，變成預處理後 O(1) 的查詢\n\n---\n\n## 常見用法\n\n### 1. Prefix Sum（前綴和）\n\n最常見的應用，用來快速算區間和。\n\n```cpp\n// 建立前綴和陣列\nvector<long long> pref(n);\npref[0] = a[0];\nfor (int i = 1; i < n; ++i) {\n    pref[i] = pref[i-1] + a[i];\n}\n\n// 計算區間 [l, r] 的總和\nlong long rangeSum(int l, int r) {\n    if (l == 0) return pref[r];\n    return pref[r] - pref[l-1];\n}\n```\n\n**範例**：\n```\n陣列: [3, 1, 4, 2, 5]\n前綴和: [3, 4, 8, 10, 15]\n\n區間 [1, 3] 的總和 = pref[3] - pref[0] = 10 - 3 = 7\n（就是 1 + 4 + 2）\n```\n\n### 2. Suffix Sum（後綴和）\n\n從後面往前累加。\n\n```cpp\nvector<long long> suff(n);\nsuff[n-1] = a[n-1];\nfor (int i = n-2; i >= 0; --i) {\n    suff[i] = suff[i+1] + a[i];\n}\n```\n\n### 3. Prefix Min/Max（前綴最小/最大值）\n\n記錄從開頭到某個位置的最小或最大值。\n\n```cpp\n// 前綴最小值\nvector<int> pmin(n);\npmin[0] = a[0];\nfor (int i = 1; i < n; ++i) {\n    pmin[i] = min(pmin[i-1], a[i]);\n}\n\n// 前綴最大值\nvector<int> pmax(n);\npmax[0] = a[0];\nfor (int i = 1; i < n; ++i) {\n    pmax[i] = max(pmax[i-1], a[i]);\n}\n```\n\n### 4. 單調性檢查（Monotonicity Flags）\n\n檢查前綴是否嚴格遞增/遞減。\n\n```cpp\n// inc[i] = 前 i+1 個元素是否嚴格遞增\nvector<bool> inc(n);\ninc[0] = true;  // 單一元素算是遞增\nfor (int i = 1; i < n; ++i) {\n    inc[i] = inc[i-1] && (a[i-1] < a[i]);\n}\n\n// dec[i] = 從 i 到結尾是否嚴格遞減\nvector<bool> dec(n);\ndec[n-1] = true;\nfor (int i = n-2; i >= 0; --i) {\n    dec[i] = dec[i+1] && (a[i] > a[i+1]);\n}\n```\n\n**應用**：找出所有合法的分割點\n```cpp\n// 檢查在位置 i 切開，左邊遞增、右邊遞減\nfor (int i = 0; i < n-1; ++i) {\n    if (inc[i] && dec[i+1]) {\n        // 這是一個合法的分割點\n    }\n}\n```\n\n### 5. Difference Array（差分陣列）\n\n用於多次區間更新，最後一次性計算結果。\n\n```cpp\nvector<long long> diff(n+1, 0);\n\n// 對區間 [l, r] 全部加上 v\nauto rangeAdd = [&](int l, int r, long long v) {\n    diff[l] += v;\n    if (r+1 <= n) diff[r+1] -= v;\n};\n\n// 執行多次更新\nrangeAdd(1, 3, 5);\nrangeAdd(2, 4, 3);\n\n// 最後還原成實際陣列\nvector<long long> result(n);\nlong long sum = 0;\nfor (int i = 0; i < n; ++i) {\n    sum += diff[i];\n    result[i] = sum;\n}\n```\n\n---\n\n## 經典題型：找最佳分割點\n\n**問題**：給定陣列，找一個分割點 i，使得：\n- 左半部分嚴格遞增\n- 右半部分嚴格遞減\n- 兩部分總和差值最小\n\n**解法模板**：\n```cpp\nint n = nums.size();\n\n// 1. 建立單調性檢查\nvector<bool> inc(n), dec(n);\ninc[0] = true;\nfor (int i = 1; i < n; ++i) {\n    inc[i] = inc[i-1] && (nums[i-1] < nums[i]);\n}\ndec[n-1] = true;\nfor (int i = n-2; i >= 0; --i) {\n    dec[i] = dec[i+1] && (nums[i] > nums[i+1]);\n}\n\n// 2. 建立前綴和\nvector<long long> pref(n);\npref[0] = nums[0];\nfor (int i = 1; i < n; ++i) {\n    pref[i] = pref[i-1] + nums[i];\n}\n\n// 3. 枚舉所有分割點\nlong long minDiff = LLONG_MAX;\nfor (int i = 0; i < n-1; ++i) {\n    if (inc[i] && dec[i+1]) {\n        long long leftSum = pref[i];\n        long long rightSum = pref[n-1] - pref[i];\n        minDiff = min(minDiff, abs(leftSum - rightSum));\n    }\n}\n```\n\n---\n\n## 常見陷阱\n\n1. **索引問題**：計算區間 `[l, r]` 時，記得處理 `l = 0` 的情況\n2. **溢位問題**：總和可能很大，記得用 `long long`\n3. **空陣列**：確保分割後兩邊都不是空的（通常 `i` 範圍是 `0` 到 `n-2`）\n4. **嚴格 vs 非嚴格**：確認題目要求的是 `<` 還是 `<=`\n\n---\n\n## 相關技巧\n\n- **Sliding Window**（滑動視窗）：當區間連續移動時使用\n- **Segment Tree / Fenwick Tree**：需要動態更新時使用\n- **Monotonic Stack/Queue**（單調堆疊/佇列）：維護區間最值\n\n---\n\n## 個人筆記\n\n- 遇到「分割陣列並滿足條件」的題目，優先想到 prefix/suffix + 單調性檢查\n- Difference Array 適合「多次區間更新，一次查詢」的情況\n- 記得先確認是否需要嚴格遞增/遞減，這會影響比較符號的選擇\n"
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
