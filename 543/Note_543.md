---
title: "543. Diameter of Binary Tree"
description: "Leetcode 543 Note"
pubDate: "2025-04-26"
tags: ["DFS", "Tree"]
categories: ["技術隨筆"]
draft: false
---
# 543. Diameter of Binary Tree
挺有趣的，剛好剛上完`Tree`這部分，然後`DFS`和`BFS`還停留在概念中，所以決定要來實作看看。
發想時意識到自己的`Recursion`部分超級弱，大概就有預感到我等等會寫不出來，後來還是問了工具。確實不是一題困難的題目，很適合做為`DFS`的入門題。

## 什麼是 DFS
**Depth First Search**，簡稱 **DFS**。
* DFS 是一種遍歷（Traversal）樹或圖（Tree / Graph）的演算法。
* 從一個起點出發，不停地往「孩子節點」或「相鄰節點」深入。
* 當無路可走時，再「回溯」到上個節點，嘗試別條路。
* 它通常會用 Recursion（遞迴）或 stack（堆疊） 來實作。

~~我知道我 Recursion 很爛所以寫不出來~~

## 實作紀錄與心得（大暴雷）
雖然寫一題真的是 Easy 的 Easy 感覺超廢，但是我的首次嘗試。
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int max_diameter = 0;

    int dfs(TreeNode* node) {
        if (node == nullptr) return 0;

        int left = dfs(node->left);
        int right = dfs(node->right);

        max_diameter = max(max_diameter, left + right);

        return max(left, right) + 1;
    }

    int diameterOfBinaryTree(TreeNode* root) {
        dfs(root);
        return max_diameter;
    }
};
```
其中，最令我感到疑惑的是為什麼在 *diameterOfBinaryTree* 中 call 的 *dfs* 不用變數去接，不過當我問了這個問題並得到解答後，我就清楚我還沒搞懂上方的程式碼。
呼叫 *dfs* 的用途是要更新 *max_diameter* 的長度。

### 小結
其實這題就很普，但我真的蠻新手的...。
總之是開始了就好，及早發現並發奮練習也不晚。