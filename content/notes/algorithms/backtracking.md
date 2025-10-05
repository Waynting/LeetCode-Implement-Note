---
title: Backtracking（回溯法）
description: 回溯法逐步探索所有可能的選擇，形成決策樹。若某選擇導致死路，則回退並嘗試另一條路徑。
topics: Backtracking, DFS, Recursion
difficulty: intermediate
createdAt: 2025-10-03
updatedAt: 2025-10-03
---

# Backtracking（回溯法）

## 概述
回溯法逐步探索所有可能的選擇，形成決策樹。若某選擇導致死路，則「回退」（撤銷上一步決策）並嘗試另一條路徑。

## 1. 核心概念（What & Why）
- **直觀解釋**：回溯法逐步探索所有可能的選擇，形成決策樹。若某選擇導致死路，則「回退」（撤銷上一步決策）並嘗試另一條路徑。
- **解決的問題類型**：子集、排列、組合、分割問題、N 皇后、數獨、單詞搜尋、約束滿足問題。
- **適用條件 / 訊號**：當我們需要**所有解**（不只是一個解），特別是有分支決策時（選或不選、放或不放）。
- **時間 / 空間複雜度目標**：通常 O(k * 解的數量) / O(n) 遞迴深度。
- **常用資料結構**：遞迴堆疊、vector/path 來儲存當前解。

---

## 2. 不變性與性質
- **核心不變性**：
  - 每次遞迴呼叫代表一個決策狀態。
  - 路徑（部分解）必須始終有效。
- **如何維護**：
  - 加入元素 → 遞迴 → 移除元素（恢復狀態）。
- **常見陷阱**：
  - 忘記回溯（pop/remove），導致錯誤結果。
  - 未處理重複元素 → 產生重複解。
  - 錯誤的基礎情況 → 遺漏或額外的解。

---

## 3. 常見解題模式
- **模式 A：子集（對每個元素選或不選）**
  - 思考過程：對每個元素，選擇包含或跳過 → 向下遞迴。
  - 複雜度：O(2^n)。
- **模式 B：組合 / 排列**
  - 思考過程：建構部分序列直到達到目標大小，必要時避免重複使用。
  - 複雜度：排列 O(n!)，組合 O(C(n, k))。

---

## 4. 虛擬碼（語言無關架構）
```text
function dfs(index, path):
    record(path)  # 若問題需要
    for i in range(index, n):
        if i > index and nums[i] == nums[i-1]: continue  # 跳過重複
        path.push(nums[i])
        dfs(i+1, path)
        path.pop()  # 回溯
```

---

## 5. 各語言語法速查表

### C++
```cpp
vector<vector<int>> ans;
vector<int> path;

void dfs(int start, vector<int>& nums) {
    ans.push_back(path); // 記錄當前子集

    for (int i = start; i < nums.size(); i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // 跳過重複
        path.push_back(nums[i]);
        dfs(i + 1, nums);
        path.pop_back(); // 回溯
    }
}
```

---

## 6. 最小可行範例（MWE）
- **輸入**：nums = [1,2,2]
- **手動步驟**：
  - [] → [1] → [1,2] → [1,2,2]
  - 回溯 → [1,2] → 回溯 → [1]
  - 跳過重複 → [2], [2,2], []
- **輸出**：[[], [1], [1,2], [1,2,2], [2], [2,2]]
- **正確性**：每條路徑對應一個子集，避免了重複。

---

## 7. 邊界情況與測試
```
Case1: nums = [] → [[]]
Case2: nums = [1] → [[], [1]]
Case3: nums = [1,1] → [[], [1], [1,1]]
Case4: nums = [1,2,2] → [[], [1], [1,2], [1,2,2], [2], [2,2]]
```

---

## 8. 與相鄰概念的關係
- 類似於 DFS，但應用於*選擇樹*而非圖遍歷。
- 可與剪枝結合以減少搜尋空間。
- 與遞迴、分治法、暴力搜尋相關。

---

## 9. 實作骨架（練習用）
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
        // TODO: 記錄當前路徑
        for (int i = start; i < nums.size(); i++) {
            // TODO: 在同一深度跳過重複
            path.push_back(nums[i]);
            dfs(i+1, nums, path, ans);
            path.pop_back();
        }
    }
};
```

---

## 10. 常見題目
- LeetCode:
  - [ ] 78. Subsets
  - [ ] 90. Subsets II
  - [ ] 46. Permutations
  - [ ] 77. Combinations
  - [ ] 51. N-Queens
- 其他：經典數獨解題器

---

## 11. 練習計畫
- Day 0: 實作 subsets / subsets II
- Day 2: 做 permutations、combinations
- Day 7: N-Queens、Sudoku
- Day 21: 複習 + 應用在約束滿足問題

---

## 12. 個人筆記
- 記住：「加入 → 遞迴 → 移除」是口訣。
- 當可能出現重複時，總是先排序。
- 畫出決策樹以視覺化遞迴流程。

---

## 13. 參考資料
- CLRS, Backtracking 章節
- LeetCode 討論區（Subsets / Permutations / N-Queens）
- CP-Algorithms: Backtracking 基礎
