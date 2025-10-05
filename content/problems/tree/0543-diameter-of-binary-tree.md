# 543. Diameter of Binary Tree

## Problem Information
- **Problem ID**: 543
- **Title**: Diameter of Binary Tree
- **Difficulty**: Easy
- **Source**: LeetCode
- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/
- **Topics**: Tree, DFS

## Problem Description

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

## Solutions

### Solution 1: DFS Recursion
**Time Complexity**: O(n)
**Space Complexity**: O(h), where h is the height of the tree

#### Code
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

## Personal Notes
First tree DFS problem I solved. The tricky part was realizing that I need to track the maximum diameter separately while calculating depths. The global variable approach worked well here.