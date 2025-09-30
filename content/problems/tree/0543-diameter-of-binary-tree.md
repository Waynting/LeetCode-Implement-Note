# 543. Diameter of Binary Tree

## Problem Information
- **Problem ID**: 543
- **Title**: Diameter of Binary Tree
- **Difficulty**: Easy
- **Link**: https://leetcode.com/problems/diameter-of-binary-tree/description/
- **Topics**: Tree, DFS

## Problem Description

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

## What is DFS
**Depth First Search**, abbreviated as **DFS**.
* DFS is an algorithm for traversing trees or graphs.
* Starting from a node, it continuously goes deep into "child nodes" or "adjacent nodes".
* When there's no path to continue, it "backtracks" to the previous node and tries other paths.
* It's usually implemented using recursion or stack.

## Solutions

### Solution 1: DFS Recursion
**Time Complexity**: O(n)
**Space Complexity**: O(h), where h is the height of the tree

#### Approach
For each node, calculate the longest path passing through that node (left subtree depth + right subtree depth), while updating the global maximum.

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

#### Key Points
- The DFS function returns the depth of the subtree rooted at that node
- The longest path through a node = left subtree depth + right subtree depth
- Global variable records the maximum diameter among all nodes

## Related Problems
- 104. Maximum Depth of Binary Tree
- 124. Binary Tree Maximum Path Sum

## Notes
This is a great introductory problem for understanding DFS and tree traversal. The key insight is that the diameter doesn't necessarily pass through the root, so we need to check every node as a potential "center" of the longest path.